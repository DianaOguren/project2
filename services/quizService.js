import { executeQuery } from "../database/database.js";

const showQuestions = async (userId) => {
    const res = await executeQuery(
        "SELECT * FROM questions WHERE user_id <> $1",
        userId,
      );
  return res.rows;
  };

const showrandomQuestion = async (randomId) => {
    const res = await executeQuery(
        "SELECT * FROM questions WHERE id = $1",
        randomId,
      );
    return res.rows[0];
  };

const takeisCorrectValue = async (optionId) => {
    const res = await executeQuery(
        "SELECT  is_correct  FROM question_answer_options WHERE id = $1",
        optionId,
      );
    return res.rows[0];
  };

  const  isCorrectValuebyQuestionId = async (questionId) => {
    const res = await executeQuery(
        "SELECT * FROM question_answer_options WHERE question_id = $1 AND is_correct =true",
        questionId,
      );
    return res.rows[0];
  };

  const addStatistic = async (userId, questionId, optionId, isCorrectValuefromDb) => {
    await executeQuery(
      "INSERT INTO question_answers (user_id, question_id, question_answer_option_id, correct) VALUES ($1, $2, $3, $4)",
      userId, questionId, optionId, isCorrectValuefromDb
    );
  };
  
export { showQuestions , showrandomQuestion, takeisCorrectValue, isCorrectValuebyQuestionId, addStatistic};