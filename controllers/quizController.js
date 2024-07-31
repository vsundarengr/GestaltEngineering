const fs = require('fs');
const { response} = require('express');
const CourseInstance = require('../models/CourseInstance.js');
const uuid = require('uuid');
const { math } = require('mathjs');
const mathhelper = require('../helpers/mathhelper.js');
const controllerHelpers = require('./controllerhelpers.js');
const ModuleInstance = require('../models/ModuleInstance.js');
const QuestionInstance = require('../models/QuestionInstance.js');
const QuizInstance = require('../models/QuizInstance.js');
const questionInstanceController  = require ('./questionInstanceController.js');
const { resolve } = require('path');
const { reject } = require('underscore');
const Question = require('../models/Question.js');
//const { contents } = require('cheerio/lib/api/traversing.js');

const createQuizInstance =  (curContent, modInstance, user) =>{
    return new Promise( async (resolve, reject) =>{
    const moduleInstanceId  = modInstance._id; 
    console.log(` module contents: ${curContent}`);
    let minQuestions = 0;
    let maxQuestions = 0;
    curContent.contents.forEach( cont => {
        cont.numCorrectAttempts = 0;
        minQuestions += cont.min;
        maxQuestions += cont.max;
    })
    const quiz = await QuizInstance.create(
        {user: user._id, 
        courseInstanceId: modInstance.courseId, 
        moduleInstanceId: modInstance._id,
        order: curContent.order,
        minQuestions: minQuestions,
        maxQuestions: maxQuestions,
        graded: curContent.graded,
        contents: curContent.contents,
        contentId: curContent.contentId,
        quizName: curContent.name
    });
    console.log('QUIZ INSTANCE ADDED IS ', quiz);
    if (!quiz) {
        reject('Error creating Quiz in QuizController');
    }
    resolve(quiz);
    // resolve({
    //     "question": null,
    //     "questionInstance": null,
    //     "data": {
    //         "htmlString": `<h2> Let's start the ${curContent.title}`
    //     }
    //   });
})
}

const generateQuizPerformanceHTML = (summary) =>{
    console.log('SUMMARY IS ', summary);
    let s = '';
    s += ` <table>`
    s += ` <tr> <td> Questions in quiz </td> `;
    s += ` <td> ${summary.numQuestions} </td> </tr>`;
    s += ` <tr> <td> Questions Attempted </td> `;
    s += ` <td> ${summary.numQuestionsAttempted} </td> </tr>`;
    s += ` <tr> <td> Total attempts (including incorrect ones) </td> `;
    s += ` <td> ${summary.numAttempts} </td> </tr>`;
    s += ` <tr> <td> Maximum possible points </td> `;
    s += ` <td> ${summary.maxScore} </td> </tr>`;
    s += ` <tr> <td> Your score </td> `;
    s += ` <td> ${summary.score} </td> </tr>`;
    s+= `</table>`;
    return s;
}

const getQuizPerformanceSummary = (quizInstance) =>{
    return new Promise ( (resolve, reject) => {
        let summary = {
            numQuestions: quizInstance.contents.length,
            numQuestionsAttempted: quizInstance.progress.length,
            numAttempts: 0,
            score: 0,
            maxScore: 0
        }
    ;


    quizInstance.contents.forEach( quest => {
        summary.maxScore += quest.maxScore;
    })

    getAllQuestionInstancesInQuiz(quizInstance)
        .then( results=> {
            results.forEach( qinst => {
 //               console.log('QUESTION INSTANCE IN QUIZ PERFORMACE: ', qinst);
                // summary.numAttempts += qinst.value.attempts.length;
                // summary.score += qinst.value.score;
                summary.numAttempts += qinst.attempts.length;
                summary.score += qinst.score;
     //           summary.maxScore += qinst.value.maxScore;
            })
            resolve(summary);
        })
        .catch( err=> {
            console.log('Trouble getting Question Instances '), err;
            reject(err);
        });
    });

}

const getAllQuestionInstancesInQuiz = async (quizInstance) => {

    let qarray = [];

    quizInstance.progress.forEach( qi=> {
        qarray.push(qi._id);
    })

    try {
        const qinstArrays = await QuestionInstance.find({_id: {$in: qarray}});
        return qinstArrays;
    }
    catch(err) {
        console.log('Error retrieving questioning isntances ', err);
        return null;
    }

}

const getAllQuestionInstancesInQuizOld = (quizInstance)=>
{
    return new Promise( (resolve, reject)=>{
        let htmlString = '';
        promises = [];
        quizInstance.progress.forEach( qi =>{
            console.log('Question instance id is ', qi._id);
            pr = QuestionInstance.findById(qi._id);
            promises.push(pr);
        });
        Promise.allSettled(promises)
            .then( results=> {
                resolve(results);
            })
            .catch( err=> console.log('getAllQuestionInstancesInQuiz:  ', err));
    })

}

const getQuizInstanceByIds = (contentId, moduleInstanceId, user)=>{
    return new Promise ( (resolve, reject) => {
        console.log('contentId = ', contentId, ' and moduleInstanceId is ', moduleInstanceId);
        QuizInstance.findOne({contentId: contentId, moduleInstanceId: moduleInstanceId})
            .then (  async results=> {
            //    console.log(' RESULTS ARE ', results);
                if ( !results) {
                    createQuizInstance(curContent, modInstance, user)
                        .then( (quiz) => resolve(quiz))
                        .catch( err => console.log('Error creating quiz', err));
                } else {
                    resolve(results);
                }
            })
            .catch(err => {
                    console.log('Unable to retrieve or create new quiz ', err);
                    reject(err);
            });
    });       
}

const getQuizInstance = (curContent, modInstance, user)=>{
    return new Promise ( (resolve, reject) => {
        console.log('curContent.contentId = ', curContent.contentId, ' and moduleInstanceId is ', modInstance._id);
        QuizInstance.findOne({contentId: curContent.contentId, moduleInstanceId: modInstance._id})
            .then (  async results=> {
          //      console.log(' RESULTS ARE ', results);
                if ( !results) {
                    createQuizInstance(curContent, modInstance, user)
                        .then( (quiz) => resolve(quiz))
                        .catch( err => console.log('Error creating quiz', err));
                } else {
                    resolve(results);
                }
            })
            .catch(err => {
                    console.log('Unable to retrieve or create new quiz ', err);
                    reject(err);
            });
    });       
}


const getQuestionForQuiz = (curContent, modInstance, user, quizInstance) => {
    return new Promise( (resolve, reject) => {
            let choiceParams = {};
            if (quizInstance.order === 'fixed') {
                fname = quizInstance.contents[0].fname;
                questionId = quizInstance.contents[0].questionId;
                fracQuestions = quizInstance.contents[0].fracQuestions;
                choiceParams.fracQuestions = fracQuestions;
                if (typeof quizInstance.contents[index].fracQuestions === 'undefined') {
                    fracQuestions = [1.0, 1.0];
                } else {
                     fracQuestions = quizInstance.contents[index].fracQuestions;
                }
                console.log('Fixed: Fname is ', quizInstance.fname, ' QuestionId: ', questionId, ' fracQuestions = ', fracQuestions);
            }
            else if (quizInstance.order === 'random') {
                let numItems = quizInstance.contents.length;
                let index = mathhelper.getRandomInt(numItems);
                fname = quizInstance.contents[index].fname;
                questionId = quizInstance.contents[index].questionId;
                if (typeof quizInstance.contents[index].fracQuestions === 'undefined') {
                    fracQuestions = [1.0, 1.0];
                } else {
                     fracQuestions = quizInstance.contents[index].fracQuestions;
                }
     
                console.log('Random: Fname is ', fname, ' QuestionId: ', questionId, ' fracQuestions is ', fracQuestions);
                choiceParams.fracQuestions = fracQuestions;
            }
            getQuestionInstance(questionId, user, quizInstance._id, choiceParams)
                .then( questInst => {
                    console.log('Resolving getQuestionInstance in QuizController ');
                    let progress = quizInstance.progress;
                    progress.push(questInst.questionInstance);
                    QuizInstance.update({contentId: curContent.contentId, moduleInstanceId: modInstance._id}, {progress: progress})
                        .then ( qi => {
                            console.log(`Question Instance inserted into quiz instance`);
                            resolve(questInst);
                        })
                        .catch( err=> console.log('Cannot insert question instance into '));
                  
                })
                .catch ( err=> { reject('Unable to get question in QuizController')});
    });
}

const getQuestion =   (curContent, modInstance, user) =>
{
    return new Promise ( (resolve, reject) => {
    console.log('curContent.contentId = ', curContent.contentId, ' and moduleInstanceId is ', modInstance._id);
    QuizInstance.findOne({contentId: curContent.contentId, moduleInstanceId: modInstance._id})
        .then (  async results=> {
            console.log(' RESULTS ARE ', results);
            if ( !results) {
                createQuizInstance(curContent, modInstance, user)
                    .then( (quiz) => resolve(quiz))
                    .catch( err => console.log('Error creating quiz'));
            }
            else{
             //   console.log('RESULTS IS ', results);
                let fname;
                let questionId;

                // If the quiz is completed. 
                if ( results.numQuestionsCompleted >= results.maxQuestions) {
                    resolve( { 
                        question: null,
                        questionInstance: null,
                        data: null
                    });
                }

                if ( results.completedFraction < 1) {
                    if (results.order === 'fixed') {
                        fname = results.contents[0].fname;
                        questionId = results.contents[0].questionId;
                        choiceParams.fracQuestions = fracQuestions;
                        console.log('Fixed: Fname is ', results.fname, ' QuestionId: ', questionId, ' ChoiceParams = ', choiceParams);
                    }
                    else if (results.order === 'random') {
                        let numItems = results.contents.length;
                        let index = mathhelper.getRandomInt(numItems);
                        fname = results.contents[index].fname;
                        questionId = results.contents[index].questionId;
                        choiceParams.fracQuestions = fracQuestions;
                        console.log('Get Question: Random: Fname is ', fname, ' QuestionId: ', questionId, ' ChoiceParams: ', choiceParams);
                    }
                    getQuestionInstance(questionId, user, results._id, choiceParams)
                        .then( questInst => {
                            console.log('Resolving getQuestionInstance in QuizController ');
                            let progress = results.progress;
                            progress.push(questInst.questionInstance);
                            QuizInstance.update({contentId: curContent.contentId, moduleInstanceId: modInstance._id}, {progress: progress})
                                .then ( qi => {
                                    console.log(`Question Instance inserted into quiz instance`);
                                    resolve(questInst);
                                })
                                .catch( err=> console.log('Cannot insert question instance into '))
                          
                        })
                        .catch ( err=> { reject('Unable to get question in QuizController')});
                  //  let htmlString = `<h2> Question found </h2>`
                
                }
            }
        })
        .catch ( err => {
            console.log('Cannot access quiz instance ', err);
            reject(err);
        });
    });
} 

const getQuestionInstance = (questionId, user, quizInstanceId, choiceParams = null) => {
    return new Promise ( (resolve, reject) => {
        console.log(' IN GET QUESTION INSTANCE OF QUIZ CONTROLLER ', choiceParams);
    questionInstanceController.getQuestionInstance(questionId, user, quizInstanceId, choiceParams)
        .then( results => {
       //     console.log('QUESTION INSTANCE STRUCT ', results);
            resolve(results);
        })
        .catch( err => { 
            console.log('Question Instance cannot be created :', err);
            reject(err) 
        });
    });
}

// const nextQuestion_get = (req,res) =>{
//     const user = res.locals.user; 
//     const courseId = req.query.courseId;
//     const moduleId = req.query.moduleId;

// }



module.exports = {
    getQuestion,
    getQuizInstance,
    getQuizInstanceByIds,
    getQuestionForQuiz,
    getAllQuestionInstancesInQuiz,
    getQuizPerformanceSummary,
    generateQuizPerformanceHTML,

}