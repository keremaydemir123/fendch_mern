const cron = require("node-cron");

// node-cron docs: https://www.npmjs.com/package/node-cron
// this will work every every Sunday at 23:59:59
cron.schedule("59 59 23 * * Sunday", () => {
  // manipulate challenges here
  // 1) get active challenges and update them
  // 2) get challenges from static/challenges folder and create new challenges
});

cron.schedule("0 10 0 * * Monday", () => {
  // send mail to everyone about new challenges
});