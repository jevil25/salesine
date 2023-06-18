import { google } from "googleapis";
import UserModel from "../../models/User";

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
    res.send({ url:authUrl });
  } else if (req.method === "POST") {
    const { code,email } = req.body;

    // Exchange the authorization code for a token
    const oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
    const data = await oAuth2Client.getToken(code);
    const user = await UserModel.findOne({ email });
    user.google = {
      accessToken: data.tokens.access_token,
      refreshToken: data.tokens.refresh_token,
    }
    // console.log(data);
    // res.send(url.format({
    //   pathname:"/",
    //   query: {
    //      "access_token": tokens.access_token,
    //      "refresh_token": tokens.refresh_token,
    //    }
    // }))
    res.send( data.tokens );
  }
}
