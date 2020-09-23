const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.MAIL_API_KEY);
const myEmail = "chatFreee4u@gmail.com";
const sendWelcomeEmail = async (email, name) => {
  try {
    await sgMail.send({
      to: email,
      from: myEmail,
      subject: "Thanks for Joining in",
      text: `Welcome to the Task app ${name}, Use this app to store your tasks`,
    });
  } catch (e) {
    console.log(e);
  }
};

const sendCancellationEmail = async (email, name) => {
  try {
    await sgMail.send({
      to: email,
      from: myEmail,
      subject: "Sorry to hear that you are leaving us 😞",
      text: `He ${name} you are leaving us, I hope to see you back in some time soon. Have a great life`,
    });
  } catch (e) {
    console.log(e);
  }
};
module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail,
};
