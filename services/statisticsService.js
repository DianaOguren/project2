import { executeQuery } from "../database/database.js";

const showNumberofAnswers = async (userId) => {
    const res = await executeQuery(
        "SELECT COUNT(*) FROM question_answers WHERE user_id = $1",
        userId,
      );
    return res.rows[0];
  };

const showNumberofCorrectAnswers = async (userId) => {
    const res = await executeQuery(
        "SELECT COUNT(*) FROM question_answers WHERE user_id = $1 AND correct = true",
        userId,
      );
    return res.rows[0];
  };
  
const showNumberofAnswerstoUser = async (userId) => {
    const res = await executeQuery(
        "SELECT  COUNT(*) FROM  questions as q,  question_answers as a WHERE q.user_id = $1  AND  q.id=a.question_id",
        userId,
      );
    return res.rows[0];
  };

const showTop = async () => {
    const res = await executeQuery(
        "SELECT u.email, count(a.question_id)  FROM  users as u,  question_answers as a WHERE   u.id=a.user_id GROUP BY u.id ORDER by count DESC limit 5;"
      );
    return res.rows;
  };
  
  

export { showNumberofAnswers, showNumberofCorrectAnswers, showNumberofAnswerstoUser, showTop };