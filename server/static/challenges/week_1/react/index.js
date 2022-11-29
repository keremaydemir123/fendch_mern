const { readFileSync } = require("fs");

const tasks_en = readFileSync("./tasks_en.md").toString();
const tasks_tr = readFileSync("./tasks_tr.md").toString();
const solution_en = readFileSync("./solution_en.md").toString();
const solution_tr = readFileSync("./solution_tr.md").toString();

module.exports = {
  tech: "React",
  tags: ["React", "Hooks", "Context", "State", "Props"],
  tumbnail:
    "https://blogger.googleusercontent.com/img/a/AVvXsEh9P49IBlVaI1qoUW465AEpQqAFQprfFVRdvHB65y_ZArd4R62ErPMIXQFsjug5Ar-cksKJxOUxV9b-DVDdab093cQRPzjlgL8iMq6B9DARlPEVBo6FZZI09Xw7JGm-k7LIiwfgVQXhW8VegDCmMzxl4Pj2B4QDZMhy9ph6ZdliY8bQirdBRDrzRnhNww=s16000",
  en: {
    week: "week 1",
    objective: "Todo App",
    description: "Create a todo app using React",
    tasksMd: tasks_en,
    solutionMd: solution_en,
    tasksVideo: "gy1B3agGNxw",
    solutionVideo: "gy1B3agGNxw",
  },
  tr: {
    week: "hafta 1",
    objective: "Yapılacaklar Uygulaması",
    description: "React kullanarak bir yapılacaklar uygulaması yapın",
    tasksMd: tasks_tr,
    solutionMd: solution_tr,
    tasksVideo: "gy1B3agGNxw",
    solutionVideo: "gy1B3agGNxw",
  },
};
