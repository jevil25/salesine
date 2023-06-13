import Head from 'next/head';
import { google } from 'googleapis';

export default function Home({ authUrl }) {
  return (
    <div>
      <Head>
        <title>Google Calendar API Example</title>
      </Head>

      <h1>Google Calendar API Example</h1>

      {authUrl ? (
        <a href={authUrl}>Authorize this application</a>
      ) : (
        <p>You are authorized.</p>
      )}
    </div>
  );
}

//https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.events.readonly&response_type=code&client_id=130518145650-6bbg35e1ir806c8rmgjr1c4q7erv95ul.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcalls&service=lso&o2v=2&flowName=GeneralOAuthFlow
//https://accounts.google.com/o/oauth2/v2/authaccess_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.events.readonly&response_type=code&client_id=130518145650-6bbg35e1ir806c8rmgjr1c4q7erv95ul.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcalls

export async function getServerSideProps(context) {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/calendar.readonly',
      'https://www.googleapis.com/auth/calendar.events.readonly',
    ],
  });

  return {
    props: { authUrl },
  };
}
