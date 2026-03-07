# Backend – AWS Lambda (AI Orchestration Layer)

This directory contains the backend logic for **MODIFAI – Multi-Platform AI Content Optimization Engine**.

The backend is implemented as an **AWS Lambda function** that acts as the AI orchestration layer between the frontend application and AWS AI services.

The frontend is deployed using **AWS Amplify**, which communicates with the backend APIs through **Amazon API Gateway**.

---

## 🚀 Responsibilities of the Backend

The Lambda function performs the following tasks:

- Invokes **Amazon Bedrock foundation models (Nova Lite)** for AI-powered content transformation
- Processes user transformation requests from the frontend
- Stores transformation history in **Amazon DynamoDB**
- Handles **JWT-authenticated API requests** via **Amazon Cognito**
- Tracks request latency for performance monitoring
- Returns AI-generated responses back to the frontend

---

## 🧠 AI Processing Workflow

1. User submits content from the **Amplify-hosted frontend**.
2. User authentication is verified via **Amazon Cognito JWT tokens**.
3. The request is sent to **Amazon API Gateway**.
4. API Gateway triggers the **AWS Lambda function**.
5. Lambda invokes **Amazon Bedrock** to generate the AI response.
6. The request and response are stored in **Amazon DynamoDB**.
7. The AI-generated result is returned to the frontend application.

---

## 🏗 Architecture Role

The Lambda function acts as the **AI Orchestration Layer** connecting multiple AWS services.

```

User
↓
AWS Amplify (Frontend Hosting)
↓
Amazon Cognito (Authentication)
↓
Amazon API Gateway
↓
AWS Lambda (AI Orchestration Layer)
↓
Amazon Bedrock (Foundation Model)
↓
Amazon DynamoDB (History Storage)

```

---

## 🛠 Technologies Used

- **Node.js** runtime on AWS Lambda
- **AWS SDK v3**
- **Amazon Bedrock Runtime**
- **Amazon DynamoDB**
- **Amazon API Gateway**
- **Amazon Cognito**
- **AWS Amplify (Frontend Deployment)**

---

## 📂 Key File

```

backend/lambda/index.js

```

This file contains the Lambda handler responsible for:

- Handling API requests
- Invoking Amazon Bedrock
- Storing transformation results in DynamoDB
- Returning AI-generated responses

---

## 🔐 Security

- Authentication handled using **Amazon Cognito JWT tokens**
- User-specific data stored using **userId partition key** in DynamoDB
- Access to AWS services controlled via **IAM roles**

---

## 📌 Note

The backend is deployed as an **AWS Lambda function** triggered via **Amazon API Gateway**.  
The frontend is deployed using **AWS Amplify**, providing a fully serverless architecture.

This architecture ensures scalability, security, and minimal infrastructure management.
```

---



