const cron = require("node-cron");
const fs = require("fs");
const Challenge = require("./models/ChallengeModel.js");
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

cron.schedule("30 20 * * * sunday", async () => {
  // 0 10 0 * * Monday   // 30 * * * * sunday
  console.log("worked");
  const users = await User.find().select({ email: 1, displayName: 1, _id: 0 });
  const activeChallenges = await Challenge.find({ isActive: true }).select({
    tech: 1,
    objective: 1,
  });
  for (let i = 0; i < users.length; i++) {
    sendMail({
      email: users[i].email,
      displayName: users[i].displayName,
      challenge: activeChallenges,
    });
  }
  console.log("worked2");

  // get the active challenge of the week send
});
