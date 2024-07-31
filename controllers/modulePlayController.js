const fs = require('fs');
const { response} = require('express');
const CourseInstance = require('../models/CourseInstance.js');
const controllerHelpers = require('./controllerhelpers.js');
const uuid = require('uuid');
const { math, mod } = require('mathjs');
const ModuleInstance = require('../models/ModuleInstance.js');
const { Module } = require('module');
const { getQuestionInstance } = require('./questionInstanceController.js');
const quizController = require('./quizController.js');
const QuestionInstance = require('../models/QuestionInstance.js');
const StudentCourseInstance = require('../models/StudentCourseInstance.js');

// const getAllQuestionInstancesInQuiz = (quizInstance)=>
// {
//     return new Promise( (resolve, reject)=>{
//         let htmlString = '';
//         promises = [];
//         quizInstance.progress.forEach( qi =>{
//             console.log('Question instance id is ', qi._id);
//             pr = QuestionInstance.findById(qi._id);
//             promises.push(pr);
//         });
//         Promise.allSettled(promises)
//             .then( results=> {
//                 resolve(results);
//             })
//             .catch( err=> console.log('getAllQuestionInstancesInQuiz:  ', err));
//     })

// }

const reviewQuiz_get = async(req,res)=>{
    const user = res.locals.user; 
    const courseId = req.query.courseId;
    const contentId = req.query.contentId;
    const moduleInstanceId = req.query.moduleInstanceId;

    const quizInstance = await quizController.getQuizInstanceByIds(contentId, moduleInstanceId, user);
   // console.log('Quiz Instance is ', quizInstance);

    let htmlString = '';

    ModuleInstance.findById(moduleInstanceId)
    .then ( (moduleInstance) => {
        let moduleId = moduleInstance.moduleId;
        CourseInstance.findById(courseId)
            .then( async (courseResults)=>{
                let module;
                courseResults.moduleList.forEach( item => {
                    //       console.log('ITEM IS ', item);
                    console.log(`Comparing Module ID ${moduleId} with ITEM ID ${item.moduleId}$`);
                    if (item.moduleId === moduleId) {
                        module = item;
                    }
                });
                quizController.getAllQuestionInstancesInQuiz(quizInstance)
                    .then( results=> {
                        results.forEach( qinst => {
                            htmlString += '<hr> <br>';
                            htmlString += '<div class="questreview">'
                        //    htmlString += qinst.value.htmlString;
                            htmlString += qinst.htmlString;
                            htmlString += '</div>';

                        })
                        console.log('HTML STRING IN QUIZ REVIEW IS ', htmlString);
                        contentIndex = moduleInstance.currentIndex;
                        res.render('reviewquiz', 
                            {
                            contentIndex: contentIndex, 
                            courseId: courseId, 
                            module: module,
                            moduleInstance: moduleInstance, 
                            questionInstances: results,
                            contentId: contentId,
                            state: "completed",
                            quizName: quizInstance.name
                            });

                    })
                    .catch( err=> console.log('ERR IS ', err));
            // quizInstance.progress.forEach( qi =>{
            //     console.log('Question instance id is ', qi._id);
            //     QuestionInstance.findById(qi._id)
            //         .then( qinst => {
            //           //  console.log('Question instance from quiz is ', qinst);
            //             htmlString += '<br>'
            //             htmlString += qinst.htmlString;
            //         })
            //         .catch( err=> console.log('Question instance from quiz could not be retrieved: ', err));
            // });

        })
        .catch(err=> console.log('Cannot get course ', err));
    })
    .catch( err=> console.log('Cannot retrieve module instance', err));
        


}

const quizNextQuestion_get = (req,res) =>{
    const user = res.locals.user; 
    const courseId = req.query.courseId;
    const contentId = req.query.contentId;
    const questionInstanceId = req.query.questionInstanceId;
    const moduleInstanceId = req.query.moduleInstanceId;

    
    console.log(`In Quiz Next Question: CourseID = ${courseId}, ContentId = ${contentId}`);
    ModuleInstance.findById(moduleInstanceId)
        .then ( (moduleInstance) => {
            let moduleId = moduleInstance.moduleId;
            CourseInstance.findById(courseId)
                .then( async (courseResults)=>{
                    let module;
                    courseResults.moduleList.forEach( item => {
                        //       console.log('ITEM IS ', item);
                        console.log(`Comparing Module ID ${moduleId} with ITEM ID ${item.moduleId}$`);
                        if (item.moduleId === moduleId) {
                            module = item;
                        }
                    })
                    currentIndex = moduleInstance.currentIndex;
                    curContent = module.module.contents[currentIndex];
                  //  questInstanceData = await quizController.getQuestion(curContent, moduleInstance, user, questionInstanceId);
                 //   quizInstance = await quizController.getQuizInstance(curContent, moduleInstance, user);
                    quizController.getQuizInstance(curContent, moduleInstance, user)
                        .then ( async quizInstance =>{
                            console.log('Quiz instance in getQuizInstance is ', quizInstance);
                            if (!quizInstance) {
                                res.render('404', {title: 'Cannot get next question'});
                                }
                            if (quizInstance.numQuestionsCompleted >= quizInstance.minQuestions ) {
                                contentIndex = moduleInstance.currentIndex;
                            
                                quizController.getQuizPerformanceSummary(quizInstance)
                                    .then( summary => {
                                        let htmlString = '<h3> You have completed the minimum number of questions in this quiz </h3>';
                                        htmlString += `Here's a summary of the quiz`;
                                        htmlString += quizController.generateQuizPerformanceHTML(summary);
                                        htmlString += 'Click Next to proceed to the next item in the module, or click Resume to practice more problems, or Click Review to go over your responses in this quiz </br>';
                                        res.render('modulework', 
                                                                {contentIndex: contentIndex, 
                                                                courseId: courseId, 
                                                                module: module,
                                                                moduleInstance: moduleInstance, 
                                                                contentHTML: htmlString,
                                                                questionInstId: '',
                                                                contentId: contentId,
                                                                state: "completed"
                                                               });
                                    })
                                    .catch( err=> console.log('Quiz Perfomance Summary updated: ', err));
                            }
                            else {
                                questInstance = await quizController.getQuestionForQuiz(curContent, moduleInstance, user, quizInstance);
                                if (!questInstance) {
                                res.render('404', {title: 'Cannot get next question'});
                                }
                                console.log('QuestionInstanceData in modulePlayController is ', questInstance);
                                let htmlString = questInstance.data['htmlString'];
                                contentIndex = moduleInstance.currentIndex;
                                res.render('modulework', 
                                                        {contentIndex: contentIndex, 
                                                        courseId: courseId, 
                                                        module: module,
                                                        moduleInstance: moduleInstance, 
                                                        contentHTML: htmlString,
                                                        questionInstId: questInstance.questionInstance._id,
                                                        contentId: contentId,
                                                        state: "started"
                                                       });
                            }
                        })
                        .catch( err=> console.log('Unable to get quiz instance ', err));
                    
                })
                .catch( err=> console.log('Cannot find course in quizNextQuestion', err));
        })
        .catch( err=> console.log('Cannot find module instance ', err));

}

const quizNextQuestion1_get = (req,res) =>{
    const user = res.locals.user; 
    const courseId = req.query.courseId;
    const contentId = req.query.contentId;
    const questionInstanceId = req.query.questionInstanceId;
    const moduleInstanceId = req.query.moduleInstanceId;
    
    console.log(`In Quiz Next Question: CourseID = ${courseId}, ContentId = ${contentId}`);
    ModuleInstance.findById(moduleInstanceId)
        .then ( (moduleInstance) => {
            let moduleId = moduleInstance.moduleId;
            CourseInstance.findById(courseId)
                .then( async (courseResults)=>{
                    let module;
                    courseResults.moduleList.forEach( item => {
                        //       console.log('ITEM IS ', item);
                        console.log(`Comparing Module ID ${moduleId} with ITEM ID ${item.moduleId}$`);
                        if (item.moduleId === moduleId) {
                            module = item;
                        }
                    })
                    currentIndex = moduleInstance.currentIndex;
                    curContent = module.module.contents[currentIndex];
                    questInstanceData = await quizController.getQuestion(curContent, moduleInstance, user, questionInstanceId);
                 //  quizInstance = await quizController.getQuizInstance(curContent, moduleInstance, user);
                 //  questInstance
                    if (!questInstanceData) {
                        reject('Quiz controller has not been able to get questions');
                    }
                    if (questInstanceData.data === null) {
                        contentIndex = moduleInstance.currentIndex;
                        let htmlString = '<h3> You have completed this quiz </h3>. Click Next to proceed to the next item in the module or Click Review to go over your responses in this quiz </br>';
                        res.render('modulework', 
                                                {contentIndex: contentIndex, 
                                                courseId: courseId, 
                                                module: module,
                                                moduleInstance: moduleInstance, 
                                                contentHTML: htmlString,
                                                questionInstId: '',
                                                contentId: contentId,
                                                state: "completed"
                                               });
                    }
                    else {
                        console.log('QuestionInstanceData in modulePlayController is ', questInstanceData);
                        let htmlString = questInstanceData.data['htmlString'];
                        contentIndex = moduleInstance.currentIndex;
                        res.render('modulework', 
                                                {contentIndex: contentIndex, 
                                                courseId: courseId, 
                                                module: module,
                                                moduleInstance: moduleInstance, 
                                                contentHTML: htmlString,
                                                questionInstId: questInstanceData.questionInstance._id,
                                                contentId: contentId,
                                                state: "started"
                                               });
                    }
                })
                .catch( err=> console.log('Cannot find course in quizNextQuestion', err));
        })
        .catch( err=> console.log('Cannot find module instance ', err));

}

const deliverModule_get = (req,res) => {
    const user = res.locals.user; 
    const courseId = req.query.courseId;
    const moduleInstanceId = req.query.moduleInstanceId;
    const name = req.query.name;

    console.log(`Course Id = ${courseId},  and Module Instance Id = ${moduleInstanceId} and Name is ${name} `);
    
    ModuleInstance.findById(moduleInstanceId)
        .then(  (results) => {
            let moduleId = results.moduleId;
    //        console.log('MODULE INSTANCE is ', results);
            CourseInstance.findById(courseId)
                .then ( (courseResults => {
                    console.log(' COURSE RESULTS ARE : ', courseResults);
                    let module;
                    courseResults.moduleList.forEach( item => {
                        console.log('ITEM IS ', item);
                        console.log(`Comparing Module ID ${moduleId} with ITEM ID ${item.moduleId}$`);
                        if (item.moduleId === moduleId) {
                            module = item;
                        }
                    });
                    console.log('MODULE SELECTED IS ', module);
                    getContentToDisplay(results, module, name, user)
                        .then( nextContent => {
                            console.log('To be sent back to client ', nextContent);
            
                            ModuleInstance.updateOne({_id: moduleInstanceId}, {currentIndex: nextContent.index})
                               .then( moduleInstance=> { 
                                    results.currentIndex = nextContent.index;
                               //     console.log('Updated instance: ', moduleInstance);
                                 //   res.status(200).json({index: nextContent.index, contentHTML: nextContent.htmlString});
                                    res.render('modulework', 
                                                {contentIndex: nextContent.index, 
                                                courseId: courseId, 
                                                module: module,
                                                moduleInstance: results, 
                                                contentHTML: nextContent.htmlString,
                                                questionInstId: nextContent.questionInstanceId,
                                                contentId: nextContent.contentId,
                                                state: nextContent.state
                                                });
                              })
                               .catch( err=> console.log('Unable to obtain getContentToDisplay in deliverModule ', err));
                        })
                        .catch( err=> console.log('Unable to getContentToDisplay'));

                    
                   // nextContent = getContentToDisplay(results, module, name);
                }))
                .catch( err=> console.log('Cannot retrieve course results ', err));
        })
        .catch( err => console.log(`Error retrieving Module instance ${moduleInstanceId} Error is : ${err}`)
        );
    
}


const getContentToDisplay =  (modInstance, module, name, user) => {

    return new Promise ( async (resolve, reject) => {
        let cont = {
            index: '',
            htmlString: '',
            questionInstanceId: ''
        }
        let currentIndex = modInstance.currentIndex;
        maxIndex = module.module.contents.length;
        let nextIndex = currentIndex;
        if (name === 'next')  {
            nextIndex  = currentIndex + 1;
        }else if(name === 'prev') {
            nextIndex  = currentIndex - 1;
        }else {
            for (let k = 0; k < maxIndex; k++) {
                if ( module.module.contents[k].name === name) {
                    nextIndex = k;
                    break;d
                }
            }
        }
        console.log('NEXT INDEX = ', currentIndex);
        let curContent = module.module.contents[nextIndex];
        console.log('CURRENT CONTENT is ', curContent);
        let htmlString ='';
        switch ( curContent.type) {
            case "static_content":
                if (name === "objectives") {
                    htmlString += '<h3> Objectives</h3> <ul> ';
                    curContent.objectives.forEach( obj => {
                        htmlString += `<li> ${obj} </li>`;
                    });
                    htmlString += '</ul>';
                    cont.state = "started";
                 }
                break;
            case "video":
                let videourl = curContent.url;
                htmlString += `<iframe width="420" height="345" src="${videourl}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen> </iframe>`;
                cont.state = "started";
            //  htmlString += `<iframe width="420" height="345" src="https://www.youtube.com/embed/tgbNymZ7vqY"> </iframe>`;
                break;
            case "static_page":
                htmlString += `<iframe src="${curContent.url}"> </iframe>`;
                console.log('This is a static page');
                cont.state = "started";
                break;
            case "quiz":
               const quizInstance = await quizController.getQuizInstance(curContent, modInstance, user);
               // questInstanceData = await quizController.getQuestion(curContent, modInstance, user);
                if (quizInstance.numQuestionsCompleted >= quizInstance.maxQuestions ) {
                    summary = await quizController.getQuizPerformanceSummary(quizInstance);
                    htmlString = '<h3> You have completed the minimum number of questions in this  quiz </h3>';
                    htmlString += `Here's a summary of the quiz`;
                    htmlString += quizController.generateQuizPerformanceHTML(summary);
                    htmlString += 'Click Next to proceed to the next item in the module, or click on continue with practice or click Review to go over your responses in this quiz </br>';
                   // htmlString = '<h3> You have completed this quiz </h3> </br>Click Next to proceed to the next item in the module or Click Review to go over your responses in this quiz </br>';
                    cont.questionInstanceId = '';
                    cont.state = "completed";
                }
                else {
                    
                    if ( quizInstance.progress.length === 0) {
                        htmlString += `<h3> Let's start the ${curContent.title} </h3>`;
                        cont.state = "started";
                    }
                    else {
                        htmlString += `<h3> Let's resume the ${curContent.title} </h3>`;
                        cont.state = "inprogress";
                    }
                }
                // if (!questInstanceData) {
                //     reject('Quiz controller has not been able to get questions');
                // }
                // else {
                //     console.log('QuestionInstanceData in modulePlayController is ', questInstanceData);
                //     htmlString += questInstanceData.data['htmlString'];
                //     if (questInstanceData.questionInstance) {
                //         cont.questionInstanceId = questInstanceData.questionInstance._id;
                //    }
                
                break;
            default:
                console.log('None of the above choices in modulePlayController: Choice was ', curContent.type);
        }
        console.log('HTML STRING IN MODULE PLAY IS ', htmlString);
        cont.index = nextIndex;
        cont.htmlString = htmlString;
        cont.contentId = curContent.contentId;
        resolve(cont);
    })

}

const getNewModule = (user, courseId, moduleId, scInstanceId, moduleList) => {
    return new Promise ( (resolve, reject) => {
        CourseInstance.findById(courseId)
        .then( async results => {
            let module;
            let mList = results.moduleList;
            mList.forEach(element => { // find the module needed
                if (element.moduleId === moduleId){
                    module = element;
                }
            }); 
            try{
                let miuuid = uuid.v4();
                let moduleInstance = {};
                let contents = [];
                module.module.contents.forEach( cont => {
                    const contInfo = {
                            "contentId": cont.contentId,
                            "status": "assigned"
                        };
                    contents.push(contInfo);
              //      console.log('Cont is ', contInfo);
                });
                console.log('Trying to create nodule instance ');
                
                moduleInstance = await ModuleInstance.create({courseId: courseId, moduleId: moduleId, userId: user._id, contents: contents});
                let moduleInCourseInstance = {
                    status: "started",
                    isActive: true,
                    moduleInstanceId: moduleInstance._id,
                    moduleId: moduleId
                };
                moduleList.push(moduleInCourseInstance);
                StudentCourseInstance.updateOne({_id: scInstanceId}, { moduleList : moduleList})
                            .then( r => console.log('Updated student course instance '))
                            .catch(  err=> console.log('Cannot updated student course instance', err));


                console.log('Module instance is ', moduleInstance);

                let contentHTML = 'Click Next to Begin .. </br>';


                let modStruct =  { contentIndex: 0, 
                    courseId: courseId, 
                    module: module, 
                    moduleInstance: moduleInstance, 
                    contentHTML: contentHTML, 
                    contentId: -1, 
                    questionInstId: '',
                    state: "started"
                };

                resolve(modStruct);

                // res.render('modulework', 
                // { contentIndex: 0, 
                //     courseId: courseId, 
                //     module: module, 
                //     moduleInstance: moduleInstance, 
                //     contentHTML: contentHTML, 
                //     contentId: -1, 
                //     questionInstId: '',
                //     state: "started"
                // });
        //      res.render('modulework', { courseId: courseId, module: module, moduleId:miuuid});
            } catch (err) {
                reject(err);
                // console.log(err);
                // errors = controllerHelpers.handleErrors(err);
                // res.status(500).json({errors});
            }
        //    res.status(201).json({redirect: 'modulework', courseId: courseId, module: module});

        })
        .catch(err => console.log("Couldn't retrieve course ", err));

    })
}


const getExistingModule = (user, courseId, moduleId, scInstance, moduleList) => {
    return new Promise ( (resolve, reject) => {
        CourseInstance.findById(courseId)
        .then( async courseInstance => {
            let module;
            courseInstance.moduleList.forEach(element => { // find the module needed
                if (element.moduleId === moduleId){
                    module = element;
                }
            }); 

            let moduleInstance = null;
            scInstance.moduleList.forEach( m => {
                console.log('Module Instance is ', m);
                if ( m.moduleId === moduleId && m.isActive === true) {
                    moduleInstanceId = m.moduleInstanceId;
                }
            });

            if (!moduleInstanceId) {
                console.log(' FOR SOME REASON IN GET EXISTING MODULE: MODULEINSTANCE ID = ', moduleInstanceId);
                reject(err);

            }

            ModuleInstance.findById(moduleInstanceId)
                .then( moduleInstance => {
                    let contentHTML = 'Click Next to resume .. </br>';

                    let modStruct =  { contentIndex: 0, 
                        courseId: courseId, 
                        module: module, 
                        moduleInstance: moduleInstance, 
                        contentHTML: contentHTML, 
                        contentId: -1, 
                        questionInstId: '',
                        state: "started"
                    };
                    console.log('MOD STRUCT IN EXISTING MODULE IS ', modStruct);
                    resolve(modStruct);
                })
                .catch( err=> {
                    console.log('Unable to retruieve module instance in getExistingModule ', err);
                    reject(err);
                })
        })
        .catch(err => {
            console.log("Couldn't retrieve course in getExistingModule", err);
            reject(err)});
    })
}

const launchModule_get = (req,res)=>{
    const user = res.locals.user; 
    const courseId = req.query.courseId;
    const moduleId = req.query.moduleId;
    
    console.log(`Course Id = ${courseId},  Module Id = ${moduleId} and User is ${user.email}`);

    StudentCourseInstance.findOne({courseId: courseId, userid: user._id})
        .then(  scInstance => {
            console.log('Sc Instance in launchModule is ', scInstance);
            let curModule = null;
            scInstance.moduleList.forEach( m => {
                if ( m.moduleId === moduleId && m.isActive === true) {
                    curModule = m;
                }
            })
            console.log(' Current Module is ', curModule);
            if (!curModule) {
            getNewModule(user, courseId, moduleId, scInstance, scInstance.moduleList)
                .then( modStruct=>res.render('modulework', modStruct) )
                .catch( err=> console.log('Error getting new module', err));
            }
            else {
                // let modStruct =  { contentIndex: 0, 
                //     courseId: courseId, 
                //     module: module, 
                //     moduleInstance: moduleInstance, 
                //     contentHTML: contentHTML, 
                //     contentId: -1, 
                //     questionInstId: '',
                //     state: "started"
                // };
                getExistingModule(user, courseId, moduleId, scInstance, scInstance.moduleList)
                .then( modStruct=>res.render('modulework', modStruct) )
                .catch( err=> console.log('Error getting new module', err));
            }
        })
        .catch(err => console.log('Cannot access course instance for student ', err));

    // CourseInstance.findById(courseId)
    //     .then( async results => {
    //         let module;
    //         let mList = results.moduleList;
    //         mList.forEach(element => { // find the module needed
    //             if (element.moduleId === moduleId){
    //                 module = element;
    //             }
    //         }); 
    //         try{
    //             let miuuid = uuid.v4();
    //             let moduleInstance = {};
    //             let contents = [];
    //             module.module.contents.forEach( cont => {
    //                 const contInfo = {
    //                         "contentId": cont.contentId,
    //                         "status": "assigned"
    //                     };
    //                 contents.push(contInfo);
    //           //      console.log('Cont is ', contInfo);
    //             });
    //             console.log('Trying to create nodule instance ');
    //             moduleInstance = await ModuleInstance.create({courseId: courseId, moduleId: moduleId, userId: user._id, contents: contents});
    //             console.log('Module instance is ', moduleInstance);

    //             let contentHTML = 'Click Next to Begin .. </br>';

    //             // let contentHTML = '<h3> Objectives</h3> <ul> ';
    //             // module.module.objective.forEach( obj => {
    //             //     contentHTML += `<li> ${obj} </li>`;
    //             // });
    //             // contentHTML += '</ul>';
    //             res.render('modulework', 
    //             { contentIndex: 0, 
    //                 courseId: courseId, 
    //                 module: module, 
    //                 moduleInstance: moduleInstance, 
    //                 contentHTML: contentHTML, 
    //                 contentId: -1, 
    //                 questionInstId: '',
    //                 state: "started"
    //             });
    //     //      res.render('modulework', { courseId: courseId, module: module, moduleId:miuuid});
    //         } catch (err) {
    //             console.log(err);
    //             errors = controllerHelpers.handleErrors(err);
    //             res.status(500).json({errors});
    //         }
    //     //    res.status(201).json({redirect: 'modulework', courseId: courseId, module: module});

  //      })
   //     .catch(err => console.log("Couldn't retrieve course ", err));

}

module.exports = {
    launchModule_get,
    deliverModule_get,
    quizNextQuestion_get,
    reviewQuiz_get
}