const userController = require("../controller/userController.js");

const nodemailer = require("nodemailer");
const mail = require("./mail");

const MAIL_ROOT = process.env.MAIL_ROOT;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

// const mails = userController.getMails()

function sendMail (email) {
  
  const transporter = nodemailer.createTransport({
    service: "outlook", //smtp-mail.outlook.com
  //   secureConnection: false,
  //   port: 587,
  //   tls: {
  //     ciphers:'SSLv3'
  //  },
    auth: {
      user: MAIL_ROOT,
      pass: EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: MAIL_ROOT, // sender address
    to: email, // list of receivers
    subject: "Test Subject", // Subject line
    html: mail(), // plain text body
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
}

module.exports = sendMail;
