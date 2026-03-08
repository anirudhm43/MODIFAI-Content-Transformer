# 🧭 How to Use MODIFAI (Prototype Guide)

MODIFAI is a secure **AI-powered multi-platform content optimization platform** with user authentication and interaction history.

It allows users to transform and optimize content for **different platforms, tones, and languages** using **Amazon Bedrock foundation models**.

---

# 🔐 1. Sign In

1. Open the MODIFAI live application.
2. Click **Sign In**.
3. You will be redirected to the **Amazon Cognito hosted login page**.
4. Enter your registered email and password.
5. If you do not have an account, create one using the **Sign Up** option.
6. After successful authentication, you will be redirected back to the MODIFAI dashboard.

🔒 All AI interactions are securely associated with your authenticated user account.

---

# ✍️ 2. Enter Content

1. Locate the **Input Text Area** in the dashboard.
2. Type or paste the content you want to optimize.

### Example Content Types

* Blog paragraphs
* LinkedIn posts
* Email drafts
* Technical explanations
* Social media captions

Make sure the content is complete before generating.

---

# 🎛 3. Select Optimization Mode

Choose one of the structured AI workflows available.

### ✂️ Content Summarization

Condenses long content into a concise and readable summary.

### ✍️ Professional Rewrite

Rewrites the content with improved clarity, grammar, and professional tone.

### 🌍 Language Localization

Translates content into another language while preserving meaning and context.

### 📱 Platform Optimization

Adapts the content for specific digital platforms.

Supported platforms include:

* LinkedIn
* Instagram
* Twitter
* Blog
* Email

Platform optimization also allows tone customization.

---

# 🎯 4. Choose Tone (Platform Mode Only)

When using **Platform Optimization**, you can choose a tone:

* Professional
* Casual
* Trendy

This helps tailor the generated content for the intended audience.

---

# 🚀 5. Generate Optimized Content

Click **Generate Optimized Content**.

The system will:

1. Send your request to **Amazon API Gateway**
2. Authenticate the request using **JWT tokens**
3. Invoke **AWS Lambda**
4. Generate optimized content using **Amazon Bedrock**
5. Return the AI response to the UI

The optimized result will appear in the **Response Panel**.

You will also see:

* ⏱ **Response Time (Latency)** in milliseconds
* ⚙ **Mode used**
* 📱 Platform (if applicable)
* 🎯 Tone (if applicable)

---

# 🕘 6. View Interaction History

Click **View History** in the sidebar.

The history page shows:

* AI mode used
* Platform selected
* Tone configuration
* Original prompt
* AI generated response
* Response latency
* Request timestamp

All history is securely stored in **Amazon DynamoDB** per user.

---

# 🔄 7. Start a New Request

To reset the workspace:

1. Click **New Chat**
2. Enter new content
3. Select an optimization mode
4. Click **Generate Optimized Content**

---

# ⚠ Important Notes

* Internet connection is required.
* Large inputs may take longer to process.
* If authentication expires, sign in again.
* All backend endpoints are protected by **JWT authorization**.

---

# 🧪 Prototype Capabilities

The current prototype includes:

* Secure authentication via **Amazon Cognito**
* **JWT-protected APIs**
* Multi-platform AI content optimization
* Tone customization
* Language localization
* Real-time latency measurement
* User-specific history logging in **DynamoDB**
* Serverless architecture powered by **AWS Lambda**
* Production deployment

---

# 🚧 Prototype Limitations

This is an early prototype. Current limitations include:

* File attachments are not yet supported
* No role-based access control
* No analytics dashboard
* Limited platform presets
* Text input only

---

# 🔮 Planned Enhancements

Future improvements may include:

* 📎 File upload support
* 🎨 Advanced tone customization
* 🌍 Dynamic language selection
* 📊 User analytics dashboard
* 📄 Export results to PDF
* ⚡ Streaming AI responses
* 🧠 Custom prompt templates

---

# 📌 Prototype Purpose

This prototype demonstrates:

* Secure AI application architecture
* Serverless cloud integration
* Structured prompt engineering
* Multi-platform AI content generation
* Production-ready AWS deployment

---

# 🏁 Conclusion

MODIFAI showcases how modern **AI + serverless architecture** can be used to build a scalable content optimization platform.

By combining **Amazon Bedrock, Lambda, DynamoDB, and Cognito**, MODIFAI enables secure, intelligent, and platform-aware content generation.

---

✅ This guide now **fully matches your updated product**.

---

