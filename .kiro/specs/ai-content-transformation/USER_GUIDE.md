# 🧭 How to Use MODIFAI (Prototype Guide)

MODIFAI is a secure AI-powered content transformation platform with user authentication and transformation history.

---

# 🔐 1. Sign In

1. Open the live application URL.
2. Click **Login**.
3. You will be redirected to the Amazon Cognito hosted login page.
4. Enter your registered email and password.
5. After successful authentication, you will be redirected back to the MODIFAI dashboard.

🔒 All transformations are securely tied to your authenticated user account.

---

# ✍️ 2. Enter Content to Transform

1. In the dashboard, locate the **Input Text Area**.
2. Type or paste the content you want to transform.

### Examples:

* Blog paragraph
* Email draft
* LinkedIn post
* Technical explanation

Make sure the content is complete before generating.

---

# 🎛 3. Select Transformation Mode

Choose one of the available structured AI modes:

* ✂️ **Content Summarization** – Condenses long content into a concise and summarized version.
* ✍️ **Professional Rewrite** – Rewrites content in a more professional and polished tone.
* 🌍 **Language Localization** – Translates content into selected languages.

Each mode dynamically modifies the AI prompt template before invoking Amazon Bedrock.

---

# 🚀 4. Generate AI Output

1. Click the **Generate** button.

The system will:

* Send your request to API Gateway
* Invoke AWS Lambda
* Call Amazon Bedrock

The transformed output will appear in the output panel.

You will also see:

* ⏱ Response latency (in milliseconds)

---

# 🕘 5. View Transformation History

1. Click **View History** in the sidebar.

You will see a list of:

* Selected mode
* Original prompt
* AI response
* Latency
* Timestamp

All history is securely stored per user in Amazon DynamoDB.

---

# 🔄 6. Start a New Transformation

To reset the workspace:

1. Click **New Chat**
2. Enter a new prompt
3. Select a mode
4. Generate again

---

# ⚠ Notes

* Internet connection is required.
* Very long inputs may take slightly longer to process.
* If your session expires, log in again.
* JWT authentication protects all backend endpoints.

---

# 🧪 Prototype Capabilities

This prototype currently includes:

* Secure authentication via Amazon Cognito
* JWT-based API protection
* Multi-mode AI content transformation
* Real-time latency tracking
* User-specific DynamoDB logging
* Live production deployment

---

# 🚧 Prototype Limitations

* No custom tone configuration.
* No file upload support.
* No role-based access control.
* Limited to text-based input only.

---


