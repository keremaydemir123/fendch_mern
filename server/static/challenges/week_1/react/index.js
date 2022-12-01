const fs = require("fs");

const tasksMd = fs.readFileSync(`${__dirname}/tasks.md`).toString();
const solutionMd = fs.readFileSync(`${__dirname}/solution.md`).toString();

module.exports = {
  tech: "React",
  tags: ["React", "Hooks", "Context", "State", "Props"],
  tumbnail:
    "https://blogger.googleusercontent.com/img/a/AVvXsEh9P49IBlVaI1qoUW465AEpQqAFQprfFVRdvHB65y_ZArd4R62ErPMIXQFsjug5Ar-cksKJxOUxV9b-DVDdab093cQRPzjlgL8iMq6B9DARlPEVBo6FZZI09Xw7JGm-k7LIiwfgVQXhW8VegDCmMzxl4Pj2B4QDZMhy9ph6ZdliY8bQirdBRDrzRnhNww=s16000",
  week: 1,
  objective: "Todo App",
  description: "Create a todo app using React",
  tasksMd: tasksMd,
  solutionMd: solutionMd,
  tasksVideo: "gy1B3agGNxw",
  solutionVideo: "gy1B3agGNxw",
  liveExample: "https://react-todo-app-1.netlify.app/",
};
