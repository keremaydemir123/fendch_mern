const cron = require("node-cron");
const fs = require("fs");
const Challenge = require("./models/ChallengeModel.js");
const userController = require("./controller/userController");
const sendMail = require("./mail/mailSender.js");
const User = require("./models/UserModel.js");


// node-cron docs: https://www.npmjs.com/package/node-cron
// this will work every every Sunday at 23:59:40

const START_WEEK = 48;

cron.schedule("40 59 23 * * Sunday", async () => {
  // manipulate challenges here
  // 1) get active challenges and update them
  try {
    const activeChallenges = await Challenge.find({ isActive: true });
    activeChallenges.forEach(async (challenge) => {
      challenge.isActive = false;
      await challenge.save();
    });
  } catch (error) {
    console.log("no active challenges");
  }

  // 2) get secret challenges and update them
  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), 0, 1);
  const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
  const currentWeek = Math.ceil(days / 7);

  const nextWeek = currentWeek - START_WEEK + 1;

  try {
    const secretChallenges = await Challenge.find({
      isSecret: true,
      week: nextWeek,
    });
    secretChallenges.forEach(async (challenge) => {
      challenge.isSecret = false;
      await challenge.save();
    });
  } catch (error) {
    console.log("no secret challenges");
  }
});

cron.schedule("30 * * * * sunday", async () => { // 0 10 0 * * Monday   foreach -> sendMail(user.email)
  const mails = await User.find().select({email:1, _id:0})
  mails.forEach((user) => sendMail(user.email))
  console.log(mails);
  //sendMail()// send mail to everyone about new challenges
});
