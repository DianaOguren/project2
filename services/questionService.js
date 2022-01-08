import { executeQuery } from "../database/database.js";

const addQuestion = async (title, question_text, userId) => {
  await executeQuery(
    "INSERT INTO questions ( title, question_text, user_id) VALUES ($1, $2, $3)",
    title,
    question_text,
    userId
  );
};
const showlist = async (userId) => {
    const res = await executeQuery(
        "SELECT id, title FROM questions WHERE user_id = $1",
        userId,
      );
    return res;
  };

const showOnequestion = async (questionId, userId) => {
    const res = await executeQuery(
        "SELECT title, question_text FROM questions WHERE id = $1 AND user_id = $2",
        questionId,
        userId
      );
    return res.rows[0];
  };
  

const showListofOptions = async (questionId) => {
    const res = await executeQuery(
        "SELECT * FROM question_answer_options WHERE question_id = $1",
        questionId
      );
    return res.rows;
  };

const addAnswer = async (question_id, option_text, is_correct) => {
    await executeQuery(
      "INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES ($1, $2, $3)",
      question_id, 
      option_text, 
      is_correct
    );
  };


const deleteOptionById = async (optionId) => {
    await executeQuery("DELETE FROM question_answer_options WHERE id = $1;", optionId);
  }; 

  


const deleteQuestionById = async (questionId) => {
    await executeQuery("DELETE FROM questions WHERE id = $1;", questionId);
  }; 

export { addQuestion, showlist, showOnequestion, addAnswer, showListofOptions, deleteOptionById, deleteQuestionById };