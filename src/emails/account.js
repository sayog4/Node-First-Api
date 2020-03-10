const sgMail = require('@sendgrid/mail')

sgMail.setApiKey( process.env.EMAIL_API_KEY )

const sendWelcomeEmail = ( email, name ) => {
  sgMail.send({
    to: email,
    from: 'sayogkarki@gmail.com',
    subject: 'Welcome to app',
    text: `Welceme to the app, ${name}. Let us know how you get along with the app.`
  })
}

const sendLeavingEmail = ( email, name ) => {
  sgMail.send({
    to: email,
    from: 'sayogkarki@gmail.com',
    subject: 'Sorry to see you go!!!',
    text: `Thanks for leaving our app ${name}. Hope you enjoy your time using our app. If you can give any feedback to ur app please send us.`
  })
}

module.exports = {
  sendWelcomeEmail,
  sendLeavingEmail
}









