import { google } from "googleapis";
import UserModel from "../../models/UserModel";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: [
        "https://www.googleapis.com/auth/calendar.readonly",
        "https://www.googleapis.com/auth/calendar.events.readonly",
      ],
    });

    res.redirect(authUrl);
  } else if (req.method === "POST") {
    const { code } = req.body;

    // Exchange the authorization code for a token
    const oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
    const { tokens } = await oAuth2Client.getToken(code);
    const email = localStorage.getItem("email");
    const user = await UserModel.findOne({ email });
    res.redirect(url.format({
      pathname:"/",
      query: {
         "access_token": tokens.access_token,
         "refresh_token": tokens.refresh_token,
       }
    }))
  }
}
