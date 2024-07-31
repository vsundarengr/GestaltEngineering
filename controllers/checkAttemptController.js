const Question = require('../models/Question.js');
const fs = require("fs");
const { response } = require('express');
const QuestionInstance = require('../models/QuestionInstance.js');
const checkAnswers = require('../helpers/checkAnswers.js');
const uuid = require('uuid');
const QuizInstance = require('../models/QuizInstance.js');

const checkAttempt_post =  (req,res)=>{
   // const instanceId = req.params.id;
    const {instanceId, responses} = req.body;
    const user = res.locals.user; // Is this here?
    const userid = user._id;
    
    console.log(`CHECK ATTEMPT  :  ${user._id} and QUESTION_INSTANCE = ${instanceId}`);
    
    
    QuestionInstance.findById(instanceId)
        .then( results => {
            console.log('Found Results: ', results);
            console.log('Student response is ', responses);
            const keys = Object.keys(responses);
            let allCorrect = true;
            for ( let i = 0; i < keys.length; i++) {
                key = keys[i];
                resps = responses[key];
                let checkRes;
                for (let j = 0; j < resps.length; j++) {
                    resp = resps[j];
                  if (resp.type === 'text') {
                    checkRes = checkAnswers.checkNumericResponse(JSON.parse(results['data']), resp);
                    console.log('NUMERIC CHECK RESULT IS ', checkRes);
                  }
                  else if (resp.type === 'radio') {
                    console.log('RADIO RESPONSE IS ', resp);
                    checkRes = checkAnswers.checkMultipleChoiceResponse(JSON.parse(results['data']), resp);
                  }
                  else if (resp.type === 'checkbox') {
                    console.log('CHECK BOX RESPONSE IS ', resp);
                    checkRes = checkAnswers.checkMultipleAnswerResponse(JSON.parse(results['data']), resp);
                  }
                  else if (resp.type === 'matrix') {
                    console.log('MATRIX TYPE ', resp);
                    checkRes = checkAnswers.checkMatrixResponse(JSON.parse(results['data']), resp);
                  }
                  resp['checkRes'] = checkRes;
                  if (checkRes.res === false) {
                    allCorrect = false;
                  }
               }    
            }
          
          let score = 0;

          //  console.log('AFTER FEEDBACK: ', responses);
          if ( allCorrect ) {
            score = results.maxScore;
          }
          console.log(`Allcorrect: ${allCorrect}: Score: ${score}`);

          results.attempts.push({responses: responses, timeAttempted: Date.now(), correct: allCorrect});
          QuestionInstance.updateOne({_id: instanceId }, {attempts: results.attempts, isCompletedCorrectly: allCorrect, score: score})
            .then( (qi => {
                console.log('Updated question instance with attempt');
            }))
            .catch ( err => console.log('Cannot update attempt in CheckAttemptController', err));

          if (allCorrect === true) {
            console.log('Quiz instance is ', results.quizInstanceId);
            QuizInstance.findById(results.quizInstanceId)
              .then (quizInstance => {
                if (!quizInstance) {
                  res.status(201).json({responses});
                  return;
                }
                console.log('LOOKING FOR ', results.fname);
                let contIndex;
                for (let i = 0; i < quizInstance.contents.length; i++) {
                  if (quizInstance.contents[i].fname === results.fname) {
                    quizInstance.contents[i].numCorrectAttempts = quizInstance.contents[i].numCorrectAttempts + 1;
                    contIndex = i;
                    break;
                  }
                }
                quizInstance.numQuestionsCompleted += 1;
                if (quizInstance.contents[contIndex].numCorrectAttempts >= quizInstance.contents[contIndex].max) {
                    console.log(' MAX ATTEMPTS EXCEEDED ', contIndex);
                    quizInstance.contents.splice(contIndex,1);
                    
                  }
  
                console.log('AFTER CORRECTING ', quizInstance.contents);
                QuizInstance.updateOne({_id: quizInstance._id},{contents: quizInstance.contents, numQuestionsCompleted:quizInstance.numQuestionsCompleted })
                    .then( qi => {
                      console.log('Updated quiz instance after checking: ', qi);
                    })
                    .catch( err => console.log('Problem updating quiz instance after checking', err));
                 })
              .catch ( err => console.log('Cannot retrieve quiz instance', err));
          }
          // //  console.log('AFTER FEEDBACK: ', responses);
          // if ( allCorrect ) {
          //   score = results.maxScore;
          // }
          // console.log(`Allcorrect: ${allCorrect}: Score: ${score}`);

          // results.attempts.push({responses: responses, timeAttempted: Date.now(), correct: allCorrect});
          // QuestionInstance.updateOne({_id: instanceId }, {attempts: results.attempts, isCompletedCorrectly: allCorrect, score: score})
          //   .then( (qi => {
          //       console.log('Updated question instance with attempt');
          //   }))
          //   .catch ( err => console.log('Cannot update attempt in CheckAttemptController', err));
          
          responses['numAttempts'] = results.attempts.length; // which attempt is this
          responses['showAnswerTimes'] = 1; // after how many attempts should the answer be shown. 
          res.status(201).json({responses});
            
        })
        .catch( err=> console.log(err));

}



module.exports = {
    checkAttempt_post,
};
