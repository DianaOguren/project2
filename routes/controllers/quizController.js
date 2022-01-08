import * as quizService from "../../services/quizService.js";
import * as questionService from "../../services/questionService.js";

const showRandomQuestion = async ({ state, params, render }) => {
  const userId = (await state.session.get("user")).id;
  const randomId = params.id;
  let question = await quizService.showrandomQuestion(randomId);
  const list = await questionService.showListofOptions(randomId);
  render("quiz.eta", {question: question, options: list, user: userId} );
};

const showQuestion = async ({ response, render, state }) => {
    
    if (await state.session.get("authenticated")) {
      const userId = (await state.session.get("user")).id;
      const res = await quizService.showQuestions(userId);
      
      if (res.length > 0){
        const max = res.length;
        const randomNumber = Math.floor(Math.random() * max);
        const randomString = res[randomNumber];
        const randomId = randomString.id;
        response.redirect(`/quiz/${randomId}`);
      } else {
        let text = "No questions to show";
        render("quiz.eta", { question_text: text, user: userId});
      }
    } else {
      response.redirect("/auth/login");
    }
  };

const checkAnswer = async ({ request, response, params , state}) => {
  
  const body = request.body();
  const param = await body.value;
  let isCorrect = param.get("is_correct");
  const questionId = params.id;
  const optionId = params.optionId;
  let dbisCorrect = await quizService.takeisCorrectValue(optionId);
  const isCorrectValuefromDb = dbisCorrect.is_correct ;
  if (isCorrect == null){
    isCorrect = false;
  } else {
    isCorrect = true;
  }
  if ((isCorrect == isCorrectValuefromDb) && (isCorrect == true)){
    response.redirect(`/quiz/${questionId}/correct`);
  } else {
    response.redirect(`/quiz/${questionId}/incorrect`);
  }

  const userId = (await state.session.get("user")).id;
  await quizService.addStatistic(userId, questionId, optionId, isCorrectValuefromDb);
};


const showCorrectPage = async ({  state, render }) => {
  const userId = (await state.session.get("user")).id;
  render("correct.eta" , {user: userId});
};



const showIncorrectPage = async ({ state, params, render }) => {
  const userId = (await state.session.get("user")).id;
  const questionId = params.id;
  const data = await quizService.isCorrectValuebyQuestionId(questionId);
  render("incorrect.eta", {data: data, user: userId});
};


export { showQuestion, showRandomQuestion, checkAnswer, showCorrectPage, showIncorrectPage};