const Question = require('../models/Question.js');
const fs = require("fs");
const { response } = require('express');
const questionDir = './questions';
const readPL = require('../helpers/readprairielearn.js');
const QuestionInstance = require('../models/QuestionInstance.js');
const plutil = require('../helpers/plutilities.js');
//const { data } = require('cheerio/lib/api/attributes.js');

const handleErrors = (err) => {
  console.log('Error code is ', err.code);
  console.log('Error message is ', err.message);
  console.log('Errors are ', err.errors);
  let errors = { question: '' };

  if (err.code == '11000') {
    errors.uuid = "Question already exists";
  }

  if (err.message.includes('JSON')) {
    errors.json = "Error reading json file";
  }

  if (err.code === 'ENOENT') {
    errors.question = 'Could not find info.json file';
  }


  //  if(err.message.includes('CastError'))

  if (err.message.includes('question validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      console.log(`Property is : ${properties.message}`);
      console.log(`PATH is ${properties.path} and MESSAGE is ${properties.message}`);
      errors[properties.path] = properties.message;
    })
  };

  return errors;
}



const getQuestionInstance = async (qid, userid, quizInstanceId, choiceParams = null)=>{
  return new Promise (  (resolve,reject)=>{
  Question.findById(qid)
        .then(   (results) => {
       //    console.log('Qid is ', qid,' Results is ', results);
            const location = results['location'];
            const htmlString = results['stem'];
            const questionDir = './questions';
            const questionHTMLFile = questionDir + '/' + location + '/question.html';
            const stepType = results['stepType'];
            const hintString = results['hintString'];
     //       console.log(' Location for question Instance is ', location, ' Trying to read ', questionHTMLFile);
          //  const htmlString = await fs.readFile(questionHTMLFile,'utf8');
          const questionid = results._id;
          console.log('Choice Params in QuestionInstance is ', choiceParams);
        //  console.log(' Results is ', results);
          if (results['isAdaptive']) {
              if (results['codelang'] === 'python') {
               readPL.generateDataFromPrairieLearnAdaptive(location,htmlString, choiceParams)
                    .then (  async (data) =>  { 
                         try{ 
                               const dataString = JSON.stringify(data['data']);
                               let solutionStrings = '';
                               if (hintString){
                                   solutionStrings = readPL.generateSolutionHTMLFromString(data['data'], hintString, location)
                               }
                               console.log(`About to send id: ${questionid}, userId: ${userid} and dataString: ${dataString} to the database`);
                               const questionInstance = await QuestionInstance.create({questionid: questionid, 
                                                                                        fname: location, 
                                                                                        userid: userid, 
                                                                                        data: dataString, 
                                                                                        htmlString: data['htmlString'], 
                                                                                        quizInstanceId: quizInstanceId, 
                                                                                        stepType: stepType, 
                                                                                        solutionStrings: solutionStrings});  
                               resolve({
                                question: results,
                                questionInstance: questionInstance,
                                data: data
                              });
         //                      res.render('questionDetails', {title: 'Question Instance', question: results, questionInstId: questionInstance._id, htmlString: data['htmlString'] });    
        //                     res.render('questionDetails', {title: 'Question Instance', question: results, htmlString: data['htmlString'] });
                       } catch (err){
                                          console.log(err);
                       }

                    })
                    .catch ( err => {console.log('Error in GETTING INSTANCE is:  ', err)});
                // console.log('DATA IS: ', data);
                // res.render('questionDetails', {title: 'Question Instance', question: results, htmlString: data['htmlString'] });
                }
              else if (results['codelang'] === 'javascript') {
                readPL.generateDataFromJSAdaptive(location, htmlString, choiceParams)
                      .then (async (data)=> {
                              const dataString = JSON.stringify(data['data']);
                              let solutionStrings = '';
                              if (hintString){
                                  solutionStrings = readPL.generateSolutionHTMLFromString(data['data'], hintString, location)
                              }
                              console.log(`About to send id: ${questionid}, userId: ${userid} and dataString: ${dataString} to the database`);
                       //       console.log('Solution Strings = ', solutionStrings);
                              const questionInstance = await QuestionInstance.create({questionid: questionid, 
                                                                                      fname: location, 
                                                                                      userid: userid, 
                                                                                      data: dataString, 
                                                                                      htmlString: data['htmlString'], 
                                                                                      quizInstanceId: quizInstanceId, 
                                                                                      stepType: stepType,
                                                                                      solutionStrings: solutionStrings});  
                              resolve({
                                question: results,
                                questionInstance: questionInstance,
                                data: data
                              });
      //                         res.render('questionDetails', {title: 'Question Instance', question: results, questionInstId: questionInstance._id, htmlString: data['htmlString'] });    
                      })
                      .catch( err=> { console.log('ERROR GETTING JAVASCRIPT ADAPTIVE: ', err)});
       //         console.log('DATA IS: ', data);
                }
              }
            else{
                readPL.generateDataFromPrairieLearnFixed(location, htmlString, choiceParams)
                    .then ( async (data) => {
                        console.log('DATA is ', data);
                        const dataString = JSON.stringify(data['answers']);
                        console.log(`About to send id: ${questionid}, userId: ${userid} and dataString: ${dataString} to the database`);
                        const questionInstance = await QuestionInstance.create({questionid: questionid, 
                                                                                fname: location, 
                                                                                userid: userid, 
                                                                                data: dataString, 
                                                                                htmlString: data['htmlString'], 
                                                                                quizInstanceId: quizInstanceId,
                                                                                solutionStrings: []});
                        console.log('HTML String is ', data['htmlString']);
                        resolve({
                          question: results,
                          questionInstance: questionInstance,
                          data: data
                        });
     //                   res.render('questionDetails', {title: 'Question Instance', question: results, questionInstId: questionInstance._id, htmlString: data['htmlString'] });
                    })
                    .catch (err => {console.log('ERR IN CREATE QUEST INST :', err)});
             //   res.render('questionDetails', {title: 'Question Instance', question: results });
            }

        })
        .catch(err=>{console.log('Error accessing question record in creating variant', err)});
      });
}


const showHint_get = async (req,res) =>{
  const user = res.locals.user;

  const questionInstanceId = req.query.qid;
  const currentLevel = Number(req.query.currentLevel);
  


  try {
    const qinst = await QuestionInstance.findOne({_id: questionInstanceId});
    let hintStrings = qinst.solutionStrings[0];
    console.log('Hint strings is ', qinst.solutionsStrings);
    if ( hintStrings === undefined || Object.keys(hintStrings).length === 0) {
      res.status(201).json({hintString: 'No hints available for this question'});
    }
    else {
    let hintString = 'Hints: <p> <ul>'
    for ( let i = 0; i <= currentLevel && i < Object.keys(hintStrings).length; i++) {
      hintString += "<li>"
      hintString += hintStrings[i+1];
      hintString += "</li> <p> ";

    }

    hintString += "</ul>";

    // console.log('Current level = ', currentLevel);
    // console.log('Hint Strings = ', hintStrings);
    // console.log('Hint string to be sent = ', hintString);
    res.status(201).json({hintString: hintString})
   
  }
  

  } catch (err) {
    console.log('Cannot find solution ', err);
    res.status(201).json({found: false})
   // res.status(201).json({"answers": answers});
  }

}

const showAnswer_get = async (req, res) => {
  const user = res.locals.user;
  const questionInstanceId = req.params.id;

  QuestionInstance.findById(questionInstanceId)
    .then( questionInstance => {
      console.log('ANSWERS IN HERE IS ', JSON.parse(questionInstance.data));
   //   console.log('QUESTION INSTANCE IS ', questionInstance);
      let answers;
      answers = JSON.parse(questionInstance.data).correct_answers;

      if (answers) {
        keys = Object.keys(answers);
        for (let i = 0; i < keys.length; i++) {
          key = keys[i];
          val = answers[key];
          console.log('Value is ', val);
          if ( Array.isArray(val)) {
              mat = plutil.emitLatexMatrix(val);
              answers[key] = mat;
          }
        }
      }

      if ( !answers) {
        answers = {};
      }

      answers_mcq = JSON.parse(questionInstance.data).answers;
      console.log('ANSWERS MCQ is ', answers_mcq);
      if (answers_mcq !== undefined) {
      for ( let i = 0; i < answers_mcq.length ; i++) {
        let name = answers_mcq[i].name;
        console.log(`NAME: ${name}`);
        answers[name] = answers_mcq[i].correct_answers;
      }
    }

      console.log('ANSWERS TO BE SEND: ', answers);

      res.status(201).json({"answers": answers});

    })
    .catch(err => console.log('Show answer: Cannot retrieve question instance', err));
}

const showNextStep_get= async (req,res) => {
  const qid = req.query.qid;
  console.log('IN SHOW NEXT STEP ', qid);
  try {
  const q = await QuestionInstance.findOne({_id: qid});
  
  currentStep = q.currentStep;
  nextStep = currentStep + 1;
  data = JSON.parse(q.data);

  console.log('Current step = ', currentStep, ' while next step is ', nextStep, ' Number of steps is ', data.steps.length);

  let lastStep = false;

  if (nextStep === data.steps.length -1 ){
    lastStep = true;
  }

  nextStepAnswers = data.steps[nextStep];
  data.correct_answers = nextStepAnswers;
  
 //  console.log('AFTER FEEDBACK: ', responses);

  stepAttempts = q.stepAttempts;
  stepAttempts.push(q.attempts);
  
  const ures = await QuestionInstance.updateOne({_id: qid}, 
                            {currentStep: nextStep, 
                            stepAttempts: stepAttempts,
                            attempts: [],
                            data: JSON.stringify(data)});
  
  if ( ures) {
    console.log(' DONE updated = ', ures);
    res.status(201).json({"updated": true, nextStep: (nextStep+1), lastStep: lastStep});
  }
  } catch (err) {
    console.log('Error updating ', err);
    res.status(201).json({"updated": false});
  }
  //res.render('updateQuizSA',{courseId: courseId, quizId: quizId, ctempId: ctempId});

  


}

const questionInstance_create_get = async (req, res) => {
  const id = req.params.id;
  const user = res.locals.user; // Is this here?
  const userid = user._id;
  console.log('USER IS : ', user._id);
  console.log('Create Question Instance with : ', id);
  const q = await getQuestionInstance(id, userid);

  if (q.questionInstance) {
    res.render('questionDetails', { title: 'Question Instance', question: q.question, questionInstId: q.questionInstance._id, htmlString: q.data['htmlString'] });
  }
  else {
    console.log('Unable to get question ', id);
  }
}



module.exports = {
  questionInstance_create_get,
  getQuestionInstance,
  showAnswer_get,
  showNextStep_get,
  showHint_get
}
