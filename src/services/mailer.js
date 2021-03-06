import nodemailer from 'nodemailer';
import { google } from 'googleapis';

require('dotenv').config(); // load environment variables

const { OAuth2 } = google.auth;


// this isn't working and idk why
const oauth2Client = new OAuth2(
	process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET,
	'https://developers.google.com/oauthplayground',
);
oauth2Client.setCredentials({
	refresh_token: process.env.GOOGLE_CLIENT_REFRESH_TOKEN,
});

const resetPasswordEmail = (email, pw, username) => {
	async function main() {
		const accessToken = await oauth2Client.getAccessToken();
		const transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 465,
			secure: true,
			auth: {
				type: 'OAuth2',
				user: 'speechsurrogates@gmail.com',
				clientId: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				refreshToken: process.env.GOOGLE_CLIENT_REFRESH_TOKEN,
				accessToken,
			},
		});
		// send mail with defined transport object
		const info = await transporter.sendMail({
			from: '<speechsurrogates@gmail.com>', // sender address
			to: email, // list of receivers
			subject: 'Reset Password', // Subject line
			text: `Your speech surrogates password for the account with the username: ${username} \nwas reset to: \n${pw}\nYou can now login with this password and reset your password from the profile panel`, // plain text body
		});

		console.log('Message sent: %s', info.messageId);
		console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
		transporter.close();
	}
	main().catch(console.error);
};
export default resetPasswordEmail;
