import { google } from "googleapis";
import User from "../../models/User";

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
    oAuth2Client.getToken(code, (err,authToken) => {
      if(err){
        console.log(err);
        res.send({message: err})
      }
      const user = await User.findOne({email: email});
      user.google.accessToken = authToken.access_token;
      user.google.refreshToken = authToken.refresh_token;
      res.send(authToken)
    })
  }
}
