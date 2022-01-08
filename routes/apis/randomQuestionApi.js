import { executeQuery } from "../../database/database.js";

const showRandomQuestionApi = async ({ response  }) => {
    let seconddata = {optionId: null, optionText: ""};
    let data = {
        questionId: null,
        questionTitle: "",
        questionText: "",
        answerOptions: [],
      };

    
    const result = await executeQuery("SELECT * FROM questions");
    const res = result.rows;
    console.log(res);
      if (res.length > 0){
        const max = res.length;
        const randomNumber = Math.floor(Math.random() * max);
        const randomString = res[randomNumber];
        const randomId = randomString.id;
        let question = await executeQuery("SELECT * FROM questions WHERE id = $1", randomId);
        console.log(question);
        data.questionId = question.rows[0].id;
        data.questionTitle = question.rows[0].title;
        data.questionText = question.rows[0].question_text;

        const list = await executeQuery("SELECT * FROM question_answer_options WHERE question_id = $1",randomId);

        for (let i=0; i < list.rows.length; i++){
            seconddata.optionId = list.rows[i].id;
            seconddata.optionText = list.rows[i].option_text;
            data.answerOptions.push(seconddata);
        };
        response.body = data;
      }
};

export { showRandomQuestionApi} ;