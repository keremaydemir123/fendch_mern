const nodemailer = require("nodemailer");
const mail = require("./mail");

const MAIL_ROOT = process.env.MAIL_ROOT;
const EMAIL_PASSWORD = process.env.MAIL_PASSWORD;
const TEST_MAIL_RECIEVER = process.env.TEST_MAIL_RECIEVER;

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: MAIL_ROOT,
    pass: EMAIL_PASSWORD,
  },
});
const mailOptions = {
  from: MAIL_ROOT, // sender address
  to: TEST_MAIL_RECIEVER, // list of receivers
  subject: "Test Subject", // Subject line
  html: mail(), // plain text body
};
function sendMail() {
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
}
module.exports = sendMail;
