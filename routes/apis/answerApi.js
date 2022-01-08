import { executeQuery } from "../../database/database.js";


const checkAnswer = async ({ request, response }) => {
    const body = request.body({ type: "json" });
    const document = await body.value;
    console.log(document.questionId);
    const correct = await executeQuery("SELECT correct from question_answers WHERE question_id = $1 AND question_answer_option_id = $2;", document.questionId, document.optionId);
    response.body = correct.rows[0].correct;
    
        
};

export { checkAnswer };

