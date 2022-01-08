import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as quizController from "./controllers/quizController.js";
import * as statisticsController from "./controllers/statisticsController.js";
import * as randomQuestionApi from "./apis/randomQuestionApi.js";
import * as answerApi from "./apis/answerApi.js";

const router = new Router();

router.get("/", mainController.showMainpage);
router.get("/questions", mainController.showMain);
router.post("/questions", mainController.addQuestion);
router.get("/questions/:id", mainController.showOnequestion);
router.post("/questions/:id/options", mainController.addAnswer);

router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);

router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.postLoginForm);

router.post("/questions/:questionId/options/:optionId/delete", mainController.deleteOption);
router.post("/questions/:id/delete", mainController.deleteQuestion);

router.get("/quiz", quizController.showQuestion);
router.get("/quiz/:id", quizController.showRandomQuestion);

router.post("/quiz/:id/options/:optionId", quizController.checkAnswer);

router.get("/quiz/:id/correct", quizController.showCorrectPage);
router.get("/quiz/:id/incorrect", quizController.showIncorrectPage);


router.get("/statistics", statisticsController.showStatistic);


router.get("/api/questions/random", randomQuestionApi.showRandomQuestionApi);
router.post("/api/questions/answer", answerApi.checkAnswer);


export { router };
