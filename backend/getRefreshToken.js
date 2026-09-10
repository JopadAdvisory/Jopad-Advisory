const { google } = require("googleapis");
require("dotenv").config();

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRETE,
    process.env.GOOGLE_REDIRECT_URI,
);
/*
 const authUrl = oauth2Client.generateAuthUrl({
     access_type: "offline",
     scope: ["https://www.googleapis.com/auth/calendar"],
     prompt: "consent"
 });

 console.log("Authorize this app by visiting this URL:\n", authUrl);
*/
 const code = "4/0ATsMZqCoR8nxcsh-oG0EM0X-o_jEpGBOzHdNTraqFAQolJ0TN4_rO2Z02m4ida20e8CmIQ";

async function getRefreshToken() {
    try {
        const { tokens } = await oauth2Client.getToken(code);

        console.log("Access Token:", tokens.access_token);
        console.log("Refresh Token:", tokens.refresh_token);
    } catch (err) {
        console.error("Error getting tokens:", err.message);
    }
}

getRefreshToken();
