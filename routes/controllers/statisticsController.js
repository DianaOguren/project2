import * as statisticsService from "../../services/statisticsService.js";

const showStatistic = async ({ render, state, response }) => {
  if (await state.session.get("authenticated")) {
    const userId = (await state.session.get("user")).id;
    const obj = await statisticsService.showNumberofAnswers(userId);
    const object = await statisticsService.showNumberofCorrectAnswers(userId);
    const object3 = await statisticsService.showNumberofAnswerstoUser(userId);
    const object4 = await statisticsService.showTop();
    render("statistics.eta", {obj: obj, object: object, object3: object3, object4: object4, user: userId});
  } else {
    response.redirect("/auth/login");
  }  
  };

export { showStatistic};