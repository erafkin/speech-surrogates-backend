import nodemailer from 'nodemailer';

//this isn't working and idk why

// create reusable transporter object using the default SMTP transport
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
  },
});


export const resetPasswordEmail = (pw, email) => {
    async function main() {
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: '<speechsurrogates@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Reset Password', // Subject line
        text: 'Your speech surrogates password was reset to: ' + pw, // plain text body
      });
  
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
  
  
    main().catch(console.error);
  };