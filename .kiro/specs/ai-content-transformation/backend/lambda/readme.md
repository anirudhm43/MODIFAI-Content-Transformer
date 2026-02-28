# Backend – AWS Lambda (AI Orchestration Layer)

This folder contains the AWS Lambda function responsible for:

- Invoking Amazon Bedrock models
- Processing transformation requests
- Storing user history in DynamoDB
- Handling JWT-authenticated API requests via API Gateway

## Architecture Role

The Lambda function acts as the AI Orchestration Layer between:

API Gateway → Bedrock → DynamoDB

Built using Node.js runtime on AWS Lambda.