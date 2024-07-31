const fs = require('fs');
const { response} = require('express');
const CourseInstance = require('../models/CourseInstance.js');
const StudentCourseInstance = require('../models/StudentCourseInstance.js');
const uuid = require('uuid');
const math  = require('mathjs');
const mathhelper = require('../helpers/mathhelper.js');
const controllerHelpers = require('./controllerhelpers.js');
const ModuleInstance = require('../models/ModuleInstance.js');
const QuestionInstance = require('../models/QuestionInstance.js');
const QuizInstance = require('../models/QuizInstance.js');
const questionInstanceController  = require ('./questionInstanceController.js');
const { resolve } = require('path');
const { reject } = require('underscore');
const Question = require('../models/Question.js');
const StandAloneQuizInstance = require('../models/StandAloneQuizInstance.js');

const addQuiz_get = (req,res) =>{
    const courseId = req.params.id;
    console.log('Add Quiz pressed for course ', courseId);
    res.render('addQuiz', {courseId: courseId});
}

const initializeQuizTree = async (fileName) => {
    console.log('In Initalize Filename = ', fileName);
    return new Promise( async (resolve,reject)=> {
    controllerHelpers.jsonReader(fileName, (err, minfo)=>{
        if (err) {
            console.log('Encountered error in reading ', fileName);
            console.log(err);
            reject('Unable to open file');
            return null;
        }
    
    initializeQuizTreeRec(minfo);
    resolve(minfo);
    })
});
}

const initializeQuizTreeRec = async (node) => {

    node.numQuestions = 0;
    node.numAttempts = 0;
    node.numCorrect = 0;
    node.numServed = 0;
    node.minQuestions = 0;
    node.numFirstAttemptCorrect = 0;
    node.minFirstAttemptCorrect = 1;

    if (node.topics !== undefined && node.topics !== null) {
        for (let i = 0; i < node.topics.length; i++) {
            let subtopic = node.topics[i];
            initializeQuizTreeRec(subtopic);
            node.numQuestions = node.numQuestions + subtopic.numQuestions;
            node.numCorrect = node.numCorrect + subtopic.numCorrect;
            node.numAttempts = node.numAttempts +  subtopic.numAttempts;
            node.numServed = node.numServed +  subtopic.numServed;
            node.minQuestions= node.minQuestions +  subtopic.minQuestions;
        }
    }

    let contents = node.contents;
    if (contents !== undefined && contents !== null) {
        for (let i = 0; i < contents.length; i++) {
        //console.log('Question name = ', contents[i].fname, ' in node: ', node.name);
            contents[i].numQuestions = 1;
            contents[i].numAttempts = 0;
            contents[i].numCorrect = 0;
            contents[i].numServed = 0;
            contents[i].numFirstAttemptCorrect = 0;
            contents[i].minQuestions = contents[i].min;
            let progress = [];
            contents[i].progress = progress;
            node.numQuestions = node.numQuestions + 1;
            node.numCorrect = node.numCorrect + contents[i].numCorrect;
            node.numAttempts = node.numAttempts +  contents[i].numAttempts;
            node.numServed = node.numServed +  contents[i].numServed;
            node.minQuestions= node.minQuestions +  contents[i].minQuestions;
            node.numFirstAttemptCorrect = node.numFirstAttemptCorrect + contents[i].numFirstAttemptCorrect;


        }   
    }
}

const searchTree = (node, topicNames, retNodeArray) => {
    // Search for particular topics in the tree and return the relevant top level nodes
      //  console.log('Node Name in search Tree = ', node.name, ' TOPIC NAMES = ', topicNames);
        let index = topicNames.findIndex(el => el === node.name);
    
        if ( index >= 0) {
       //     console.log('Found ', node.name, ' in position ', index,' from topicNames ', topicNames);
            topicNames.splice(index,1);
       //     console.log('Removed ', node.name, 'Now topicNames = ', topicNames);
            retNodeArray.push(node);
            return;
        }
    
       
        if (node.topics !== undefined && node.topics !== null) {
            for (let i = 0; i < node.topics.length; i++) {
                let subtopic = node.topics[i];
                searchTree(subtopic, topicNames, retNodeArray);
            }
        }
    
    }
    
    const getQuestionNames = (node, questionMap) => {
    // Get all the questions from a node
        let contents = node.contents;
    
        if (contents !== undefined && contents !== null) {
            for (let i = 0; i < contents.length; i++) {
           //     console.log('Question name = ', contents[i].fname, ' in node: ', node.name);
                questionMap.set(contents[i].fname, contents[i]);
            }
        }
    
        let topics = node.topics;
        if (topics !== undefined && topics !== null) {
            for (let i = 0; i < topics.length; i++) {
                let subnode = topics[i];
                getQuestionNames(subnode, questionMap);
            }
        } else {
    //        console.log('No more topics: Exiting ', node.name);
        }
    
    }
    

const addQuiz_post = async (req,res) =>{
    console.log('Add Quiz pressed');
    const {fname, startDate, endDate, courseId } = req.body;
    const user = res.locals.user;

    console.log('ID of the course is', courseId, ' and user id is ', user._id); 
;
    let added = await createNewStandAloneQuizInstance(fname, startDate, endDate, courseId, user);

    if ( added.acknowledged) {
        console.log('Added standalone quiz ');
        res.status(201).json({"redirect": "/courses/" + courseId, "user": user._id, "courseId": courseId, "added": true});
    } else {
        console.log('Unable to add standalone quiz');
        res.status(201).json({"added": false});
    }

}

const activateQuizSA_post =  async (req,res) =>
{
    const {courseId, quizId} = req.body;
    const user = res.locals.user;
    
    console.log(`Attempting to activate ${quizId} in ${courseId}`);

    try {

    const quizTemplate = await StandAloneQuizInstance.findOne({_id: quizId, courseId: courseId});
   
   // console.log('Quiz template is ', quizTemplate);

    const studentList = await StudentCourseInstance.find({courseId: courseId}, {userid: 1, email: 1});
  //  console.log('Current user is ', user._id);
 //   console.log('Student List is ', studentList);

    let saArray = [];

    for (let i = 0; i < studentList.length; i++) {
        // skip if instructor
        if (studentList[i].userid.equals(user._id)) {
            console.log('Found instructor. Skipping ');
            continue;
        }

        let saQuizParams = {userid: studentList[i].userid, 
            email: studentList[i].email,
            title: quizTemplate.title,
            courseId: quizTemplate.courseId,
            questionMap: quizTemplate.questionMap,
            quizData: quizTemplate.quizData,
            startDate: quizTemplate.startDate,
            endDate: quizTemplate.endDate,
            fname: quizTemplate.fname,
            isActive: quizTemplate.isActive,
            currentQuestionInstance: null
            };
          saArray.push(saQuizParams);
    }

    const saQuizzes = await StandAloneQuizInstance.create(saArray);

    for (let i = 0; i < saQuizzes.length; i++) {
        let studentUserId = saQuizzes[i].userid;
        const addedStudent = await StudentCourseInstance.updateOne({courseId: courseId, userid: studentUserId}, {$push: {quizList: saQuizzes[i]}}, { strict: false });
     //   console.log('Added student = ', addedStudent);
        // let updatedStatus = await StudentCourseInstance.updateOne({courseId: courseId, userid: studentUserId}, {$push})
    }

  //  console.log(`SA Quizzes =  ${saQuizzes}`);
    res.status(201).json({'createdQuizInstances': true});
    
    } catch (err) {

        console.log(`Error in activiateQUIZ ${err}`);
        res.status(201).json({'createdQuizInstances': false});

    }
    



}

const createNewStandAloneQuizInstance =  (fname, startDate, endDate, courseId, user) =>{
    return new Promise( (resolve, reject) => { 
    CourseInstance.findById(courseId)
        .then ( async results => {
            let courseName = results.fname;
            const fileName = './courses/' + courseName + '/modules/' + fname + '.json';
            console.log('File name for module is ', fileName);

            let rootTreeNode = null;
            
            try {
                rootTreeNode = await initializeQuizTree(fileName);
            } 
            catch (err) {
                reject(err);
            }

            let retNodeArray = [];
            let topicNames = [];
            topicNames.push(rootTreeNode.name);
    //        console.log('Topic Names = ', topicNames);

            searchTree(rootTreeNode, topicNames, retNodeArray);
            let questionMap = new Map();
            for (let i = 0; i < retNodeArray.length; i++) {
                let retNode = retNodeArray[i];
        //        console.log(' Array found = ', retNodeArray[i].name); 
                getQuestionNames(retNode, questionMap) ;
            }
            let qarray = Array.from(questionMap.keys());
       //     console.log('QARRAY = ', qarray);
           
            try {

            const qidarray = await Question.find({location: {$in: qarray}}, {qtype: 1, location: 1});
           // console.log('QIDARRAY = ', qidarray);
            for (let i = 0; i < qidarray.length; i++) {
                let qfname = qidarray[i].location;
                questionMap.get(qfname).questionId = qidarray[i]._id;
            }
            
            
               
            let saQuizParams = {userid: user._id, 
                                email: user.email,
                                title: rootTreeNode.title,
                                courseId: courseId,
                                questionMap: questionMap,
                                quizData: rootTreeNode,
                                startDate: startDate,
                                endDate: endDate,
                                fname: fname,
                                isActive: true,
                                currentQuestionInstance: null
                                };
            
            const quizTemplate = await StandAloneQuizInstance.create(saQuizParams);

            const added1 = await CourseInstance.updateOne({_id: courseId},{$push: {quizList: quizTemplate}});

            const saQuiz = await StandAloneQuizInstance.create(saQuizParams);

            // const findres = await StudentCourseInstance.findOne({courseId: courseId, userid: user._id});

            // console.log('HERE IS the result ', findres);

            const added2 = await StudentCourseInstance.updateMany({courseId: courseId, userid: user._id}, {$push: {quizList: saQuiz}}, { strict: false });
            console.log('ADDED 2 ', added2);
            resolve(added2);
            } catch ( err) { reject(err) ;
            }
        })
    })
    }
            

const generateHTMLTree = (node) => {
   // let htmlString = " <ul> ";
  //  htmlString += ` <li id="${node.name}"> ${node.title} Hello!`;
    let htmlString = "";
    if (node.topics !== undefined && node.topics !== null) {
        htmlString += ' <ul> ';
        for (let i = 0; i < node.topics.length; i++) {
            let subnode = node.topics[i];
            let iconFileName;

            if (subnode.numServed === 0) {
                iconFileName = "common/greycircle.png";
            }
            if (subnode.numServed > 0 && subnode.numCorrect === 0) {
                iconFileName = "common/redcircle.png";
            }

            if (subnode.numCorrect >0) {
                if (subnode.numCorrect < subnode.minQuestions) {
                    if ( subnode.numFirstAttemptCorrect >= subnode.minFirstAttemptCorrect) {
                        iconFileName = "common/orange1.png";
                    }
                    else {
                      iconFileName = "common/orangecircle.png";
                    }
                }
                else {
                    if (subnode.numFirstAttemptCorrect >= subnode.minFirstAttemptCorrect) {
                        iconFileName = "common/green1.png";
                    } 
                    else {
                    iconFileName = "common/greencircle.png";
                    }
                }
            }
            
            let stats = `Attempted = ${subnode.numServed}; Correct = ${subnode.numCorrect}`; 

            htmlString += `<li id="${subnode.name}" data-jstree='{"icon":"${iconFileName}"}'> <div class="tooltip"> ${subnode.title} `;
            htmlString += `<span class="tooltiptext">  ${stats} </span> </div>`;
            htmlString += generateHTMLTree(subnode);
            htmlString += ' </li> ';
        }
        htmlString += ' </ul> ';
    }
    return htmlString;
}



const updateTreeScores = (node, questionMap) => {
    let contents = node.contents;
  // console.log('In update Tree scores: Node = ', node.name, ' Question Map has ', questionMap.keys());
    node.numQuestions = 0;
    node.numCorrect = 0;
    node.numAttempts = 0;
    node.numServed = 0;
    node.minQuestions = 0;
    node.numFirstAttemptCorrect = 0;
    if (contents !== undefined && contents !== null) {

        for (let i = 0; i < contents.length; i++) {
            node.numQuestions = node.numQuestions + 1;
            let qtn = questionMap.get(contents[i].fname);
            contents[i].numCorrect = qtn.numCorrect;
            contents[i].numAttempts = qtn.numAttempts;
            contents[i].numServed = qtn.numServed;
            contents[i].minQuestions = qtn.minQuestions;
            contents[i].numFirstAttemptCorrect = qtn.numFirstAttemptCorrect;
            node.numCorrect = node.numCorrect + qtn.numCorrect;
            node.numAttempts = node.numAttempts + qtn.numAttempts;
            node.numServed = node.numServed + qtn.numServed;
            node.minQuestions= node.minQuestions + qtn.minQuestions;
            node.numFirstAttemptCorrect = node.numFirstAttemptCorrect + qtn.numFirstAttemptCorrect;
   //         console.log('Num served for ', contents[i].fname ,' is ', contents[i].numServed);
        }
    }

    let topics = node.topics;
    if (topics !== undefined && topics !== null) {
        for (let i = 0; i < topics.length; i++) {
            let subnode = topics[i];
            updateTreeScores(subnode, questionMap);
            node.numQuestions = node.numQuestions + subnode.numQuestions;
            node.numCorrect = node.numCorrect + subnode.numCorrect;
            node.numAttempts = node.numAttempts + subnode.numAttempts;
            node.numServed = node.numServed + subnode.numServed;
            node.minQuestions= node.minQuestions + subnode.minQuestions;

        }
    } else {
        console.log('No more topics: Exiting ', node.name);
    }
}


const updateQuizSA_get = async (req,res) => {
    const courseId = req.query.courseId;
    const quizId = req.query.quizId;
    const ctempId = req.query.ctempId;

    res.render('updateQuizSA',{courseId: courseId, quizId: quizId, ctempId: ctempId});

}

const updateQuizSA_post = async (req,res) => {

    const {courseId, quizId, ctempId, startDate, endDate, fname} = req.body;

    console.log(`Updating Ctemp ${ctempId}, Quiz ${quizId} in course ${courseId} with new file ${fname}`);

    try {
        let courseInfo = await CourseInstance.findById(courseId);
        let saQuizzes = await StandAloneQuizInstance.find({fname: fname});
        console.log('Found records for sa quizzes ', saQuizzes.length);
        if (courseInfo) {
            const fileName = './courses/' + courseInfo.fname + '/modules/' + fname + '.json';
            console.log('File name for module is ', fileName);
            let rootTreeNode = await initializeQuizTree(fileName);
            
      //      console.log('ROOT TREE NODE IS ', rootTreeNode);
             
        
        let retNodeArray = [];
        let topicNames = [];
        topicNames.push(rootTreeNode.name);
   //     console.log('Topic Names = ', topicNames);

        searchTree(rootTreeNode, topicNames, retNodeArray);
        let questionMap = new Map();
        for (let i = 0; i < retNodeArray.length; i++) {
            let retNode = retNodeArray[i];
   //         console.log(' Array found = ', retNodeArray[i].name); 
            getQuestionNames(retNode, questionMap) ;
        }
        let qarray = Array.from(questionMap.keys());
     //   console.log('QARRAY = ', qarray);

        
    for (let index = 0; index < saQuizzes.length; index++) {
        saQId = saQuizzes[index]._id;
        curQMap = saQuizzes[index].questionMap;
      //  console.log('Map before update ', curQMap);

        
        const qidarray = await Question.find({location: {$in: qarray}}, {_id: 1, qtype: 1, location: 1});
        console.log('Updating Question Ids in the map');
      //  console.log('Qid array in updateing question is ', qidarray);
         for (let i = 0; i < qidarray.length; i++) {
        //    console.log('The id for this question is ', qidarray[i]._id);
             let qfname = qidarray[i].location;
             curQMap.get(qfname).questionId = qidarray[i]._id;
             
         }


        for (let i = 0; i < qarray.length; i++) {
            let key = qarray[i];
            let keyExists = curQMap.has(key);
            if (!keyExists) {
                console.log(`Key ${key} does not currently exists. Needs updating`);
                let quest = questionMap.get(key);
                curQMap.set(key, quest);
            }
        }

       
       updateTreeScores(rootTreeNode, curQMap);
       let updatedDB = await StandAloneQuizInstance.updateOne({_id: saQId}, 
                                        {questionMap: curQMap, quizData: rootTreeNode});
       console.log('Updated database is ', updatedDB);
       }
      //  console.log('Map after update ', curQMap);


        res.status(201).json({updated: true});

        
    }
    } 
    catch (err) {
        reject(err);
        res.status(201).json({updated: false});
    }

    

    

}

const launchQuizSA_get = async (req,res) => {
    const user = res.locals.user; 
    const courseId = req.query.courseId;
    const quizId = req.query.quizId;
    
    console.log(`Course Id = ${courseId},  Quiz Id = ${quizId} and User is ${user}`);

    StandAloneQuizInstance.findOne({_id: quizId, userid: user._id})
        .then( quizsa => {
            quizData = quizsa.quizData;
            let htmlString = generateHTMLTree(quizData);
            quizData.courseId = courseId;
            quizData.htmlString = htmlString;
            quizData.quizId = quizsa._id;
            console.log(' FOUND QUIZ DATA = ', quizData._id);
            res.render('quizsa', {quizData: quizData, question: null});
        })
        .catch(err=> console.log('Cannot access quiz instance for student ', err));

}

const generateResourceString = (resources) => {
    let htmlString = '';

   // console.log('RESOURCES = ', resources);
   if (!(typeof resources) || !resources  ||  resources.length === 0 ) {
    return htmlString;
   }

   htmlString += '<label for="resources"> Choose a resource:  </label> ';
   htmlString += '<select name="resources" id="resources" class="resources"> ';

   for (let i = 0; i < resources.length; i++) {
        htmlString += `<option data-url = "${resources[i].url}" id= "${resources[i].name}" value="${resources[i].name} "> ${resources[i].title}  </option> `;
   }

   htmlString += '</select> ';
   htmlString += '<button id="resbutton" value="submit" onClick="showResources()"> Show resource </button> ';
   
   return htmlString;

}

const getQuizQuestion_post =  (req,res) =>{
    console.log('Get Quiz Question');
    const {courseId, quizId, selected} = req.body;
    const user = res.locals.user;
    console.log('Selected nodes = ', selected);

    StandAloneQuizInstance.findOne({_id: quizId, userid: user._id})
        .then ( async quizsa => {

            let retNodeArray = [];
            let qinfo = quizsa.quizData;
            let questionMap = new Map();
            // get all the relevant nodes
            searchTree(qinfo, selected, retNodeArray);
            
            // get all questions in the selected tree
            for (let i = 0; i < retNodeArray.length; i++) {
                let retNode = retNodeArray[i];
                console.log(' Array found = ', retNodeArray[i].name); 
                getQuestionNames(retNode, questionMap) ;
            }


            const iter1 = questionMap.keys();
            for (let key of iter1) {
                console.log('All questions selection Key is ', key);
            }

            const numQtns = questionMap.size;
            let qtnIndex = math.randomInt(0,numQtns);
            console.log('Numnber of questions in selection ', numQtns, ' Index to be chosen = ', qtnIndex);


            const iterator1 = questionMap.keys();
            let index = 0;
            let qtnChosen = null;
            for (let key of iterator1) {
                if (index++ === qtnIndex) {
                    console.log('Found: ');
                    console.log('KEY is ', key, ' Value is ', questionMap.get(key));
                    qtnChosen = quizsa.questionMap.get(key);
                    break;
                }
                else {  
                console.log("Let's keep looking ");
                }
            }

            try {
                let qtnId = quizsa.questionMap.get(qtnChosen.fname).questionId;
               // let qtn = await Question.findOne({"location": qtnChosen.fname});
                console.log('Question found is ', qtnChosen.fname);
                let question = await Question.findOne({_id: qtnId});
                let questInstance = await questionInstanceController.getQuestionInstance(qtnId, user._id, quizsa._id);
         //       console.log('Quest Instance = ', questInstance);
                let htmlString = `<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script> `;
                htmlString += `<script id="MathJax-script" async="" src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>`;
                htmlString += questInstance.data['htmlString'];
              
                qtnChosen.numServed = qtnChosen.numServed + 1;
                qtnChosen.progress.push(questInstance.questionInstance._id);
         //       console.log('CHOSEN QUESTION AFTER = ', qtnChosen);
                let saQMap = quizsa.questionMap;
               
                if ( quizsa.currentQuestionInstanceId) {
                    let prevQuestion = await QuestionInstance.findById(quizsa.currentQuestionInstanceId);
                    let oldFName = prevQuestion.fname;
                    let prevNode = quizsa.questionMap.get(oldFName);
                    
                    if (prevQuestion.isCompletedCorrectly) {
                        prevNode.numCorrect = prevNode.numCorrect + 1;

                        if (prevQuestion.attempts.length === 1) {
                            prevNode.numFirstAttemptCorrect = prevNode.numFirstAttemptCorrect + 1;
                        }
                    }
                    

                    prevNode.numAttempts = prevNode.numAttempts + prevQuestion.attempts.length;

                

             //       console.log('PreQuestion = ', prevQuestion);
             //       console.log('PrevNode = ', prevNode);
                    saQMap.set(oldFName, prevNode);
                    

                }
                saQMap.set(qtnChosen.fname, qtnChosen);
                updateTreeScores(qinfo, saQMap);
           //     console.log('QINFO is ', JSON.stringify(qinfo));
                

                let updated = await StandAloneQuizInstance.updateOne({_id : quizsa._id, userid: user._id}, 
                                                                    {quizData: qinfo, 
                                                                    currentQuestionInstanceId: questInstance.questionInstance._id,
                                                                    questionMap: saQMap
                                                                    });
                console.log('IN UPDATED = ', updated);

                let treeHTMLString = generateHTMLTree(qinfo);

                let resourceString = generateResourceString(question.resources);

                let toBeSent = {"retrieved": true, 
                                questionInstId: questInstance.questionInstance._id,
                                contentHTML: htmlString,
                                treeHTMLString: treeHTMLString,
                                resourceString: resourceString,
                                stepType: question.stepType};
          //      console.log('I am sending this: ', toBeSent);
                res.status(201).json(toBeSent);
            }
            catch (err) {
                console.log('Error in ! = ', err);
                res.status(201).json({"retrieved": false});
            }
            
            
        })
        .catch (err=>{
            console.log('Error in getQuizQuestion  ', err);
            res.status(201).json({"retrieved": false});
        });
}

const getReviewSA_get = (req,res) =>{
    console.log('Get Quiz Question');
    const user = res.locals.user; 
    const courseId = req.query.courseId;
    const quizId = req.query.quizId;
    const selString = req.query.selected;
    console.log('SELECT STRING = ', selString);
    let selected = selString.split(',');
    // let startIndex = 0;
    // let index = selString.indexOf(",", startIndex);
    // let k = 0;
    // while (index > 0) {
    //     selected[k++] = selString.split(startIndex,index-1);
    //     startIndex = index + 1;
    //     index = selString.indexOf(",", startIndex);
    // }


    
  //  const {courseId, quizId, selected} = req.body;
  //  const user = res.locals.user;
    console.log('Selected nodes = ', selected);

    StandAloneQuizInstance.findOne({_id: quizId, userid: user._id})
        .then ( async quizsa => {

            let retNodeArray = [];
            let qinfo = quizsa.quizData;
            let questionMap = new Map();
            // get all the relevant nodes
            searchTree(qinfo, selected, retNodeArray);
            
            for (let i = 0; i < retNodeArray.length; i++) {
                console.log(' Array found = ', retNodeArray[i].name); 
                getQuestionNames(retNodeArray[i], questionMap) ;
            }

            let qinstIdsArray = [];
            const iter1 = questionMap.keys();
            for (let key of iter1) {
                console.log('All questions selection Key is ', key);
                console.log('Question =  is ', quizsa.questionMap.get(key));
                qinstIdsArray = qinstIdsArray.concat(quizsa.questionMap.get(key).progress); 
            }


            try {
                console.log('QINST IDS ARRAY IS ', qinstIdsArray);
                const qinstArray = await QuestionInstance.find({_id: {$in: qinstIdsArray}, userid: user._id});
                console.log(' Getting qinst array ', qinstArray);
               for (let j = 0; j < qinstArray.length; j++) {
                    console.log('Question Instance is :', qinstArray[j].fname);
              }

                let respStruct = {
                                courseId: courseId,
                                quizId: quizId,
                                moduleInstance: null,
                                questionInstances: qinstArray 
                             }
             //   console.log('RESP STRUCT IS ', respStruct);
                console.log('About to send response to reviewquiz ');
                res.render('reviewquiz', respStruct);

           // res.status(201).json({"retrieved": true});
            } catch (err) {
              console.log('Error in question instances ', err);
              res.status(201).json({"retrieved": false});
        }
        })
        .catch( err=> {
            console.log('In Review Quiz = ', err);
            res.status(201).json({"retrieved": false});
           
        });
}

const getAllStudentsPerformance = async (courseId, ctempId) => {
    try {
        let  quizTemplate = await StandAloneQuizInstance.findOne({courseId: courseId, quizList: {_id: ctempId}},{fname: 1, quizData: 1});
        
        let numQuestions = quizTemplate.quizData.numQuestions;
    
        let saQuizzes = await StandAloneQuizInstance.find({courseId: courseId, fname: quizTemplate.fname});
    
        // for (let i = 0; i < saQuizzes.length; i++) {
        //     console.log(`Student email is ${saQuizzes[i].email} Served = ${saQuizzes[i].quizData.numServed} Attempts = ${saQuizzes[i].quizData.numAttempts} Correct = ${saQuizzes[i].quizData.numCorrect}, minFirstCorrect = ${saQuizzes[i].quizData.numFirstAttemptCorrect}`);
        // }
        return {numQuestions: numQuestions, quizTemplate: quizTemplate, saQuizzes: saQuizzes};
    } catch (err) {
        console.log('Unable to get student performance data');
        throw err;
    }
}

const downloadQuizSACSV_get = async (req,res)=>{
    const user = res.locals.user; 
    const courseId = req.query.courseId;
    const quizId = req.query.quizId;
    const ctempId = req.query.ctempQuizd;

    console.log(`Download User = ${user._id}, QuizId = ${quizId}, Course Quiz Id = ${ctempId}`);

    try {

        let courseName = await CourseInstance.findOne({_id: courseId}, {fname: 1, _id: 0});

        let ret = await getAllStudentsPerformance(courseId, ctempId);
        let saQuizzes = ret.saQuizzes;
        str = '';
        for (let i = 0; i < saQuizzes.length; i++) {
            str += `${saQuizzes[i].email}, ${saQuizzes[i].quizData.numServed}, ${saQuizzes[i].quizData.numAttempts}, ${saQuizzes[i].quizData.numCorrect}, ${saQuizzes[i].quizData.numFirstAttemptCorrect} \n`;
        }
    //    console.log('String = ', str);
        
        const csvFileName = './public/temp/' + 'saquiz_' + courseName.fname + '_' + ret.quizTemplate.fname + '.csv';
        console.log('Writing to output CSV File is ', csvFileName);
        fs.writeFile(csvFileName, str, (err) => {
            if (err) 
                throw err;
            console.log('The CSV file has been saved!: ', csvFileName);
            res.download(csvFileName, function (error) {
                console.log("Error : ", error)
            });
          });

    } catch (err) {
        console.log('Unable to get student performance data file', err);
        res.status(201).json({"retrieved": false});

    }

    
}

const reviewQuizSAWork_get = async (req, res) => {
    const user = res.locals.user; 
    const courseId = req.query.courseId;
    const quizId = req.query.quizId;
    const ctempId = req.query.ctempQuizId;

    console.log(`User = ${user._id}, QuizId = ${quizId}, Course Quiz Id = ${ctempId}`);

    try {
    // let  quizTemplate = await StandAloneQuizInstance.findOne({courseId: courseId, quizList: {_id: ctempId}},{fname: 1, quizData: 1});
    
    // let numQuestions = quizTemplate.quizData.numQuestions;

    // let saQuizzes = await StandAloneQuizInstance.find({courseId: courseId, fname: quizTemplate.fname});

    // for (let i = 0; i < saQuizzes.length; i++) {
    //     console.log(`Student email is ${saQuizzes[i].email} Served = ${saQuizzes[i].quizData.numServed} Attempts = ${saQuizzes[i].quizData.numAttempts} Correct = ${saQuizzes[i].quizData.numCorrect}, minFirstCorrect = ${saQuizzes[i].quizData.numFirstAttemptCorrect}`);
    // }

    let ret = await getAllStudentsPerformance(courseId, ctempId);
   // console.log('RETURN VALUES = ', ret);

    res.render('reviewQuizSAInstructor', {numQuestions: ret.numQuestions, courseId: courseId, quizId: quizId, ctempId: ctempId, saQuizzes: ret.saQuizzes });
  //  res.status(201).json({"retrieved": true});
    } catch (err) {
        console.log('File name not found ', err);
        res.status(201).json({"retrieved": false});
    }
}

module.exports = {
    addQuiz_get,
    addQuiz_post,
    launchQuizSA_get,
    getQuizQuestion_post,
    getReviewSA_get,
    activateQuizSA_post ,
    updateQuizSA_get,
    updateQuizSA_post,
    reviewQuizSAWork_get,
    downloadQuizSACSV_get
}