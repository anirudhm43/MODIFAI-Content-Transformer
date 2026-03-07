# MODIFAI Frontend – Multi-Platform AI Content Optimization Engine

This is the frontend application for MODIFAI, an AWS-powered AI Content Transformation Engine built for the AI for Bharat Hackathon.

The frontend provides an intuitive interface for users to:

- Authenticate securely
- Submit content for AI transformation
- Select transformation workflows
- View AI-generated responses
- Track response latency
- Access transformation history

---

## 🚀 Tech Stack

- React.js
- Tailwind CSS
- AWS Amplify Auth (Cognito integration)
- Amazon API Gateway (Backend API)
- Amazon Bedrock (via backend Lambda)

---

## 🧠 Features

### 🔐 Secure Authentication

* Cognito Hosted UI login
* Access token validation
* Secure session persistence

### 🧠 AI Optimization Workflows

MODIFAI supports multiple structured AI workflows.

### ✂️ Content Summarization

Condenses long content into concise summaries while preserving key meaning.

### ✍️ Professional Rewrite

Rewrites text with improved clarity, grammar, and professional tone.

### 🌍 Language Localization

Translates content into other languages while maintaining context and meaning.

### 📱 Platform Optimization

Adapts content specifically for digital platforms such as:

* LinkedIn
* Instagram
* Twitter
* Blog
* Email

Each platform uses custom AI prompt engineering to produce platform-optimized results.

### 🎯 Tone Control

Platform optimization supports tone customization:

* Professional
* Casual
* Trendy

This enables audience-appropriate AI generated content.

### 📊 Real-Time AI Feedback

Users receive immediate feedback including:

* Loading indicators
* AI response output
* Error handling
* Latency measurement display

### 🕘 Interaction History

Each authenticated user has a personal AI history dashboard displaying:

* Mode used
* Platform selected
* Tone configuration
* Prompt input
* AI response output
* Request timestamp
* Response latency

---

## 🏗 Architecture Flow

User  
↓  
AWS Amplify (Frontend Hosting)
↓  
API Gateway  
↓  
AWS Lambda  
↓  
Amazon Bedrock  
↓  
DynamoDB  

---

## ⚙️ Setup Instructions (Local Development)

### 1️⃣ Clone Repository

```bash
git clone https://github.com/anirudhm43/MODIFAI-Content-Transformer
cd frontend