const nodemailer = require("nodemailer");
var hbs = require("nodemailer-express-handlebars");
const path = require("path");

const MAIL_ROOT = process.env.MAIL_ROOT;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

async function sendMail({ email, displayName, challenge }) {
  // const mailList = await User.find().select({email:1, _id:0})
  // console.log('mailList :>> ', mailList);
  // const displayName = []
  // mailList.map((user) => {displayName.push(user.displayName)})
  // console.log('displayName: >>', displayName)
  
  const transporter = nodemailer.createTransport({
    service: "outlook", //smtp-mail.outlook.com
    auth: {
      user: MAIL_ROOT,
      pass: EMAIL_PASSWORD,
    },
  });

  const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve("./mail/views"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./mail/views"),
    extName: ".handlebars",
  };
  transporter.use("compile", hbs(handlebarOptions));

  const mailOptions = {
    from: MAIL_ROOT, // sender address
    to: "turhan-ergene@hotmail.com", // list of receivers  -->  mailList
    subject: "Test Subject", // Subject line
    // html: mail(displayName), // plain text body
    template: "email",
    context: {
      displayName: displayName,
      text: "Lorem ipsum dolor sit amet, consectetur...",
      tech: challenge[0].tech,
      objective: challenge[0].objective,
      tech2: challenge[1]?.tech,
      objective2: challenge[1]?.objective,
    },
  };

  await transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log(err);
    else console.log("Email sent: " + info.response);
  });
}

module.exports = sendMail;
