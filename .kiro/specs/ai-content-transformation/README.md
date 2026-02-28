
# 🚀 MODIFAI – AI Content Transformation Engine

MODIFAI is a secure, AWS-powered AI Content Transformation Engine built for the **AI for Bharat Hackathon**.

It enables authenticated users to transform content using structured AI workflows such as **summarization, rewriting, and language localization** — powered by **Amazon Bedrock**.

---

# 🌐 Live Demo

👉 [https://modifai-content-transformer.vercel.app](https://modifai-content-transformer.vercel.app)

# Github Repo
👉 [https://github.com/anirudhm43/MODIFAI-Content-Transformer.git](https://github.com/anirudhm43/MODIFAI-Content-Transformer.git)

---

# 🧠 What MODIFAI Does

MODIFAI is **not a generic chatbot**.

It is a structured transformation platform that allows users to:

* ✂️ Summarize long content
* ✍️ Rewrite text professionally
* 🌍 Translate content into another language
* 📊 Track AI response latency
* 🕘 View personal transformation history

All transformations are securely authenticated and logged per user.

---

# 🏗 Full System Architecture

```
User
   ↓
React Frontend (Vercel)
   ↓
Amazon API Gateway (JWT Authorizer)
   ↓
AWS Lambda
   ↓
Amazon Bedrock (Nova / Titan model)
   ↓
Amazon DynamoDB
```

---

# 🔐 Security Design

* Amazon Cognito User Pool authentication
* JWT-based API Gateway Authorizer
* User-specific data isolation in DynamoDB
* No public backend endpoints
* Production deployment over HTTPS

---

# 🚀 Tech Stack

## 🎨 Frontend

* React.js (Vite)
* Tailwind CSS
* AWS Amplify (Cognito Auth)
* Deployed on Vercel

## ⚙ Backend (AWS)

* Amazon API Gateway
* AWS Lambda
* Amazon Bedrock (Foundation Model)
* Amazon DynamoDB
* Amazon Cognito

---

# ✨ Core Features

## 🔐 Secure Authentication

* Cognito Hosted UI
* Access Token validation
* Session persistence

## 🧠 AI Transformation Modes

* Summarization
* Professional Rewrite
* Language Translation

Each mode dynamically modifies the AI prompt template before invoking Bedrock.

## 📊 Real-Time Feedback

* Loading spinner
* Error handling
* Latency measurement display

## 🕘 Transformation History

* User-specific query
* Mode tracking
* Prompt + Response logging
* Timestamp + latency tracking

---

# 🗃 DynamoDB Data Model

Each transformation stores:

* `userId` (Partition Key)
* `createdAt` (Sort Key)
* `requestId`
* `mode`
* `prompt`
* `response`
* `latencyMs`
* `status`

This ensures:

* User isolation
* Chronological retrieval
* Scalable architecture

---

# ⚙️ Local Development Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/anirudhm43/MODIFAI-Content-Transformer.git
cd frontend
```

## 2️⃣ Install Dependencies

```bash
npm install
```

## 3️⃣ Run Development Server

```bash
npm run dev
```

App runs at:

```
http://localhost:5173
```

---

# 🌍 Environment Configuration

Ensure your `awsconfig.js` contains:

* Cognito User Pool ID
* App Client ID
* Region
* Redirect URLs

⚠️ Update callback URLs in Cognito when deploying to production.

---

# 📈 Current Project Status

* ✅ Secure authentication
* ✅ Multi-mode AI transformation
* ✅ Production deployment
* ✅ DynamoDB logging
* ✅ History dashboard
* ✅ Live demo link

---

# 🔮 Future Enhancements

* Tone adjustment slider
* Multi-language selection dropdown
* Export to PDF
* User analytics dashboard
* Role-based access control
* Rate limiting & throttling
* Custom prompt templates

---

# 🎯 Hackathon Positioning

MODIFAI demonstrates:

* Secure AI system architecture
* Scalable serverless backend
* Real-time LLM integration
* User-specific data persistence
* Production-grade deployment

---

# 🏁 Conclusion

MODIFAI is a scalable AI transformation platform built using AWS serverless technologies and foundation models, showcasing secure, structured, and production-ready AI application design.

---

