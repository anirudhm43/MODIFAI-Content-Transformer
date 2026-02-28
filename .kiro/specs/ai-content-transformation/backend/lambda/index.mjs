import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { DynamoDBClient, PutItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb";

const bedrockClient = new BedrockRuntimeClient({ region: "us-east-1" });
const dynamoClient = new DynamoDBClient({ region: "us-east-1" });

export const handler = async (event) => {
  console.log("EVENT FULL:", JSON.stringify(event, null, 2));

  const method = event?.requestContext?.http?.method;
  const userId = event?.requestContext?.authorizer?.jwt?.claims?.sub;

  if (!userId) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Unauthorized - No JWT claims" })
    };
  }

  try {

    // ===========================
    // ✅ GET → Fetch History
    // ===========================
    if (method === "GET") {

      const result = await dynamoClient.send(
        new QueryCommand({
          TableName: "MODIFAI-Transformations",
          KeyConditionExpression: "userId = :u",
          ExpressionAttributeValues: {
            ":u": { S: userId }
          },
          ScanIndexForward: false // newest first
        })
      );

      return {
        statusCode: 200,
        body: JSON.stringify(result.Items)
      };
    }

    // ===========================
    // ✅ POST → Generate AI
    // ===========================
    if (method === "POST") {

      if (!event.body) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Missing request body" })
        };
      }

      const startTime = Date.now();
      const requestId = Date.now().toString();
      const createdAt = new Date().toISOString();
      const modelId = "amazon.nova-lite-v1:0";

      const requestBody = JSON.parse(event.body);
      const prompt = requestBody.prompt;

      if (!prompt) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Prompt is required" })
        };
      }

      const bedrockPayload = JSON.stringify({
        messages: [
          {
            role: "user",
            content: [{ text: prompt }]
          }
        ],
        inferenceConfig: {
          maxTokens: 2000,
          temperature: 0.7,
          topP: 0.9
        }
      });

      const command = new InvokeModelCommand({
        modelId,
        contentType: "application/json",
        accept: "application/json",
        body: bedrockPayload
      });

      const response = await bedrockClient.send(command);

      const responseBody = JSON.parse(
        new TextDecoder().decode(response.body)
      );

      const aiOutput =
        responseBody.output.message.content[0].text;

      const latencyMs = Date.now() - startTime;

      // Save SUCCESS
      await dynamoClient.send(
        new PutItemCommand({
          TableName: "MODIFAI-Transformations",
          Item: {
            userId: { S: userId },
            createdAt: { S: createdAt },
            requestId: { S: requestId },
            modelId: { S: modelId },
            prompt: { S: prompt },
            response: { S: aiOutput },
            latencyMs: { N: latencyMs.toString() },
            status: { S: "SUCCESS" }
          }
        })
      );

      return {
        statusCode: 200,
        body: JSON.stringify({
          requestId,
          output: aiOutput,
          latencyMs
        })
      };
    }

    // ===========================
    // ❌ Method Not Allowed
    // ===========================
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" })
    };

  } catch (error) {

    console.error("Lambda Error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};