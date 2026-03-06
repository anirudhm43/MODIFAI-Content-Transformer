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
    // GET → Fetch History
    // ===========================
    if (method === "GET") {

      const result = await dynamoClient.send(
        new QueryCommand({
          TableName: "MODIFAI-Transformations",
          KeyConditionExpression: "userId = :u",
          ExpressionAttributeValues: {
            ":u": { S: userId }
          },
          ScanIndexForward: false
        })
      );

      return {
        statusCode: 200,
        body: JSON.stringify(result.Items)
      };
    }

    // ===========================
    // POST → Generate AI
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

      const inputText = requestBody.prompt;
      const mode = requestBody.mode || "rewrite";
      const platform = requestBody.platform || "";
      const tone = requestBody.tone || "professional";

      if (!inputText) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Prompt is required" })
        };
      }

      // ===========================
      // Prompt Builder
      // ===========================

      let finalPrompt = "";

      if (mode === "summarize") {
        finalPrompt = `
Summarize the following content into a concise version while preserving the key message.

Content:
${inputText}
`;
      }

      else if (mode === "rewrite") {
        finalPrompt = `
Rewrite the following content in a professional and polished tone while preserving the meaning.

Content:
${inputText}
`;
      }

      else if (mode === "translate") {
        finalPrompt = `
Translate the following content into Spanish while preserving meaning and tone.

Content:
${inputText}
`;
      }

      else if (mode === "platform") {

        let platformInstruction = "";

        if (platform === "instagram") {
          platformInstruction = "Create a short engaging Instagram caption with emojis and relevant hashtags.";
        }

        if (platform === "linkedin") {
          platformInstruction = "Write a professional LinkedIn post with clear insights and structured language.";
        }

        if (platform === "twitter") {
          platformInstruction = "Write a concise Twitter post under 280 characters that is engaging and impactful.";
        }

        if (platform === "blog") {
          platformInstruction = "Expand this into a short informative blog-style paragraph.";
        }

        if (platform === "email") {
          platformInstruction = "Rewrite this as a professional email with greeting and closing.";
        }

        finalPrompt = `
Optimize the following content for ${platform}.

Tone: ${tone}

Platform Style:
${platformInstruction}

Content:
${inputText}
`;
      }

      else {

        // DEFAULT CHAT MODE
        finalPrompt = `
      You are a helpful and friendly AI assistant.
      
      Respond naturally like a conversation.
      
      User: ${inputText}
      Assistant:
      `;
      
      }

      // ===========================
      // Bedrock Request
      // ===========================

      const bedrockPayload = JSON.stringify({
        messages: [
          {
            role: "user",
            content: [{ text: finalPrompt }]
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

      // ===========================
      // Save to DynamoDB
      // ===========================

      await dynamoClient.send(
        new PutItemCommand({
          TableName: "MODIFAI-Transformations",
          Item: {
            userId: { S: userId },
            createdAt: { S: createdAt },
            requestId: { S: requestId },
            modelId: { S: modelId },
            mode: { S: mode },
            platform: { S: platform },
            tone: { S: tone },
            prompt: { S: inputText },
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