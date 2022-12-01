const cron = require("node-cron");
const fs = require("fs");
const Challenge = require("./models/ChallengeModel.js");

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

  // 2) get challenges from static/challenges folder and create new challenges
  const currentDate = new Date();
  const startDate = new Date(currentDate.getFullYear(), 0, 1);
  const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
  const currentWeek = Math.ceil(days / 7);

  const nextWeek = currentWeek - START_WEEK + 1;

  const folders = fs.readdirSync(`${__dirname}/static/challenges/week_1/`);

  for (let i = 0; i < folders.length; i++) {
    const challenge = require(`./static/challenges/week_${nextWeek}/${folders[i]}/index`);
    try {
      await Challenge.create(challenge);
      console.log("challenge created");
    } catch (error) {
      console.log(error);
    }
  }
});

cron.schedule("0 10 0 * * Monday", () => {
  // send mail to everyone about new challenges
});
