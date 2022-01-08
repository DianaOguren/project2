import * as questionService from "../../services/questionService.js";
import { validate, required, minLength } from "https://deno.land/x/validasaur@v0.15.0/mod.ts";

const getData = async (request) => {
  const data = {
    title: "",
    question: "",
    errors: null, 
  };

  if (request) {
    const body = request.body();
    const params = await body.value;
    data.title = params.get("title");
    data.question = params.get("question_text");
  }

  return data;
};

const getDataforanswer = async (request) => {
  const data = {
    question_id: null,
    option_text: "",
    is_correct: "",
    errors: null, 
  };

  if (request) {
    const body = request.body();
    const params = await body.value;
    data.option_text = params.get("option_text");
    data.is_correct = params.get("is_correct");
  }

  return data;
};

const validationRules = {
  title: [required, minLength(1)],
  question: [required, minLength(1)],
};

const validationRulesforAnswerOptions = {
  option_text: [required, minLength(1)],
};

const showMainpage = ({ render }) => {
  render("mainpage.eta");
  
};

const showMain = async ({ response, render, state }) => {
  
  if (await state.session.get("authenticated")) {
    const userId = (await state.session.get("user")).id;
    const res = await questionService.showlist(userId);
   
    render("main.eta", { errors: [], title: "", question: "", questions: res.rows, user: userId});
  } else {
    response.redirect("/auth/login");
  }
};

const addQuestion = async ({ request, response, render, state}) => {
  const data = await getData(request);
  const userId = (await state.session.get("user")).id;
  const [passes, errors] = await validate(data, validationRules);

  if (!passes) {
    data.errors = errors;
    render("main.eta", {data: data, user: userId});
  } else {
    await questionService.addQuestion(
      data.title, data.question, userId
    );
    response.redirect("/questions");
  }
};
const showOnequestion = async ({ render, params, state }) => {
  const userId = (await state.session.get("user")).id;
  const idQuestion = params.id;
  const obj = await questionService.showOnequestion(idQuestion, userId);
  const list = await questionService.showListofOptions(idQuestion);
  console.log(obj);
  console.log(list);
  render("question.eta", {obj: obj, idQuestion: idQuestion , options: list, user: userId} );
};

const addAnswer = async ({ request, response, render, params, state}) => {
  const data = await getDataforanswer(request);
  data.question_id = params.id;
  console.log(data.question_id);
  console.log(data.option_text);
  console.log(data.is_correct);
 
  if (data.is_correct == null){
    data.is_correct = false;
  }
  console.log(data.is_correct);
  const list = await questionService.showListofOptions(data.question_id);
  const [passes, errors] = await validate(data, validationRulesforAnswerOptions);




  if (!passes) {
    const userId = (await state.session.get("user")).id;
    data.question_id = params.id;
    const obj = await questionService.showOnequestion(data.question_id, userId);
    data.errors = errors;
    render("questionoption.eta", {object: data, obj: obj, options: list, user: userId});
  } else {
    await questionService.addAnswer(
      data.question_id, data.option_text, data.is_correct
    );
    response.redirect(`/questions/${data.question_id}`);
  }
};

const deleteOption = async ({response, params}) => {
  
  const questionId = params.questionId;
  const optionId = params.optionId;
  await questionService.deleteOptionById(optionId);
  response.redirect(`/questions/${questionId}`);
};

const deleteQuestion = async ({response, params}) => {
  
  const questionId = params.id;
  
  await questionService.deleteQuestionById(questionId );
  response.redirect("/questions");
};


export { showMainpage, showMain, addQuestion, showOnequestion, addAnswer, deleteOption, deleteQuestion };
