PAW HAVEN VETERINARY CLINIC WEBSITE

PROJECT CONTENTS
- index.html: home page
- book.html: appointment details
- payment.html: payment preference and final submission
- success.html: informational/legacy page
- assets/style.css: responsive styling
- api/send-telegram.js: secure serverless endpoint that sends the request to Telegram

SUBMISSION FLOW
1. Visitor completes the appointment form and continues to payment options.
2. Visitor selects a payment method and contact preference, then enters the relevant contact details.
3. On final submit, the website sends the complete request to the clinic's Telegram bot using the serverless endpoint.
4. After Telegram confirms delivery, the visitor is redirected to WhatsApp (+254141892382) with the same message ready to send. The visitor must tap Send in WhatsApp.

NO DATABASE
This project does not use a database. The appointment details are sent directly to Telegram, then WhatsApp. The browser temporarily holds the appointment details in sessionStorage between the two form pages.

TELEGRAM SETUP (DO THIS IN VS CODE / HOSTING)
1. Create a Telegram bot with @BotFather and obtain the bot token.
2. Open your bot in Telegram and press Start. Obtain your private chat ID (for example, using the bot's getUpdates endpoint).
3. In your Vercel project, add these Environment Variables:
   TELEGRAM_BOT_TOKEN = your real bot token
   TELEGRAM_CHAT_ID = your chat ID
4. Redeploy the site after adding/changing environment variables.
5. Keep the real token out of HTML, JavaScript in the browser, GitHub, and this ZIP. The API function reads it securely from the server environment.

RUN LOCALLY
- Install Node.js and the Vercel CLI: npm install -g vercel
- Open this folder in VS Code's terminal.
- Run: vercel dev
- Create a local .env file from .env.example and fill in the real values. Never share or commit .env.
- Open the local URL shown by Vercel. Do not test by double-clicking index.html because the /api endpoint needs the local Vercel server.

DEPLOYMENT
Deploy this folder as a Vercel project. Add TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in Project Settings > Environment Variables, then redeploy. Static-only hosting (such as opening files directly) will not run the Telegram API endpoint.

IMPORTANT
- WhatsApp websites cannot silently send a message. WhatsApp opens with the text filled in, and the visitor taps Send.
- Telegram receives the message automatically through the secure serverless function.
- Do not put the Telegram bot token in frontend code.
- Appointment confirmation still requires the clinic to confirm availability and payment arrangements.
