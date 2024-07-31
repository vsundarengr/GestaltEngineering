const fs = require('fs');
const { response} = require('express');
const CourseInstance = require('../models/CourseInstance.js');
const controllerHelpers = require('./controllerhelpers.js');
const uuid = require('uuid');
const { math } = require('mathjs');
const ModuleInstance = require('../models/ModuleInstance.js');
const Question = require('../models/Question.js');
const mongoose = require('mongoose');



const addModule_get = (req,res) =>{
    const courseId = req.params.id;
    console.log('Add Module pressed for course ', courseId);
    res.render('addModule', {courseId: courseId});
}

const updateQuiz = (cont) => {
    return new Promise( (resolve, reject) =>{
        console.log(`Cont type is ${cont.type} and Cont title is ${cont.title}`);
        promises = [];
        for (let i = 0 ; i < cont.contents.length; i++) {
            let questName = cont.contents[i].fname;
            console.log('Retrieving ', questName);
            pr = Question.findOne({location: questName});
            promises.push(pr);
        }
            
        Promise.allSettled(promises)
            .then (results => {
                let i = 0;
                results.forEach ( q => {
                    quest = q.value;
                    console.log(`Question name = ${quest.location} found and Question ID is ${quest._id} while title is ${quest.title}`);
                    if (cont.contents[i].fname === quest.location) {
                        cont.contents[i].questionId = quest._id;
                        console.log(`Should have added to ${quest.location} and ${quest._id}`);
                    } else {
                        console.log('MISMATCH IN MODULE CONTROLLER');
                    }
                    i = i + 1;

                    if ( i === cont.contents.length) {
                        console.log('NOW RESOLVING INSIDE MODULE CONTROLLER');
                        resolve(cont);
                    }

            })
            
        })
        .catch (err=> console.log('Could not get all the questions for this module', err));
    })  
}

const updateQuestionIdsOfModuleList = (minfo)=>{
    return new Promise( (resolve, reject) =>{
    let contLength = minfo.contents.length;
    for ( let j = 0; j < contLength; j++) {
        let cont = minfo.contents[j];
        console.log(`Cont type is ${cont.type} and Cont title is ${cont.title}`);
        promises = [];
        if (cont.type === 'quiz') {
            let contid = uuid.v4();
            cont['contentId'] = contid;
            cont['index'] = j;
            pr = updateQuiz(cont);
            promises.push(pr);
        } else {
            let contid = uuid.v4();
            cont['contentId'] = contid; 
        }
    }

    Promise.allSettled(promises)
        .then ( results => {
            results.forEach( res => {
                cont = res.value;
                console.log('PROMISE is ', res);
                console.log('CONTENT IN PROMISES IS ', cont);
            //    ix = cont.index;
              //  minfo.contents[ix] = cont;
            })
            resolve(minfo);  
        })
        .catch( err=> {
            console.log('Could not update question Ids', err);
            reject(err)});
        })
    }
            // for (let i = 0 ; i < cont.contents.length; i++) {
            //     let questName = cont.contents[i].fname;
            //     console.log('Retrieving ', questName);
            //     Question.findOne({location: questName})
            //         .then( quest => {
            //                 console.log(`Found Question: ${questName}: ID is ${quest}`);
            //                 console.log(`${j} $ : Question name = ${questName} and Question ID is ${quest._id} while title is ${quest.title}`);
            //                 let contid = uuid.v4();
            //                 cont['contentId'] = contid;
            //                 cont.contents[i].questionId = quest._id;
            //               //  console.log('CONTENT HERE IS: ', cont);
            //                 if ( i === cont.contents.length - 1 && j === contLength -1) {
            //                     console.log('NOW RESOLVING ');
            //                     resolve(minfo);
            //                 }    
            //         })
            //         .catch( err => {
            //             console.log(`Unable to retrieve question ${questName} from Question DB while adding course  ${err}`);
            //             reject(err);
            //         });
            // }
    
  


const addModule_post = (req,res) =>{
    console.log('Add Module pressed');
    const {fname, startDate, endDate, courseId } = req.body;
    const user = res.locals.user;

    console.log('ID of the course is', courseId, ' and user id is ', user._id);

    
    CourseInstance.findById(courseId)
        .then( results => {
            let moduleList = results.moduleList;
            let courseName = results.fname;
            const fileName = './courses/' + courseName + '/modules/' + fname + '.json';
            console.log('File name for module is ', fileName);
            
            controllerHelpers.jsonReader(fileName, (err, minfo)=>{
                if (err) {
                    console.log(err);
                    errors = controllerHelpers.handleErrors(err);
                    console.log(errors);
                    res.status(400).json({errors});
                }
          //      console.log('JSON INFO IS ', minfo);

            
          let qmap = new Map();

          minfo.contents.forEach( cont => {
            let contid = uuid.v4();
            cont['contentId'] = contid;
             if ( cont.type === 'quiz') {
                let contLength = cont.contents.length;
                for ( let i = 0; i < contLength; i++ ) {
                    qfname = cont.contents[i].fname;
                    qmap.set(qfname, "1");
                }
             }
          })

          qarray = Array.from(qmap.keys());
          console.log('Question array is ', qarray);

          Question.find({location: {$in: qarray}})
            .then ( qtns => {
  //              console.log('RESULTS OF DATABASE SEARCH IS ', qtns);
                qtns.forEach( qtn => {
                    qfname = qtn.location;
                    qmap.set(qfname, qtn._id);
                })
                idArray = Array.from(qmap.values());
                console.log('Values after DATABASE SEARCH are ', idArray);

                minfo.contents.forEach( cont => {
                    if ( cont.type === 'quiz') {
                       let contLength = cont.contents.length;
                       for ( let i = 0; i < contLength; i++ ) {
                           qfname = cont.contents[i].fname;
                       //    qid = qmap.get(qfname);
                           cont.contents[i].questionId = qmap.get(qfname);
                       }
                    }
                 })

                 let muuid = uuid.v4();
                 //        console.log('Your UUID is: ' + muuid);
                  const newModule = {
                             "moduleId": muuid,
                             "module":  minfo,
                             "startDate": startDate,
                             "endDate": endDate,
                             "fileName": fname
                  };
                 
                 moduleList.push(newModule);
                 CourseInstance.updateOne({_id: courseId}, {$set: {moduleList: moduleList}})
                     .then( results =>{
                         res.status(201).json({"redirect": "/courses/" + courseId, "user": user._id, "courseId": courseId});
                     })
                     .catch( err => console.log('Cannot update course from database', err));

            })
            .catch( err => {
                console.log(`Error finding questions. check if all questions have been added first`, err);
                res.status(201).json({"redirect": "/courses/" + courseId, "user": user._id, "courseId": courseId})
            })

            }) // close json reader
        })
        .catch(err=> console.log(`Error: Cannot find course id in modulecontroller.js: ${err}`));
    }
            

            // minfo.contents.forEach( cont => {
            //     let contid = uuid.v4();
            //     cont['contentId'] = contid;
                
            //     if (cont.type === 'quiz') {
            //         for (let i = 0 ; i < cont.contents.length; i++) {
            //             let questName = cont.contents[i].fname;
            //             console.log('Retrieving ', questName);
            //             Question.findOne({location: questName})
            //                 .then( quest => {
            //                         // console.log(`Found Question: ${questName}: ID is ${quest}`);
            //                         // console.log(`But Question type = ${typeof(quest)} and Question ID is ${quest._id} while title is ${quest.title}`);
            //                         cont.contents[i].questionId = quest._id;
                                    
            //                 })
            //                 .catch( err => {
            //                     console.log('Unable to retrieve question from Question DB while adding course ', err);
            //                 });
            //         }
            //     }
            // });
            
            
//             updateQuestionIdsOfModuleList(minfo)
//                 .then( minfo => {
//                     // minfo.contents.forEach( cont => {
//                     //     console.log('CONTENT AFTER : ', cont);
//                     // })
//                     let muuid = uuid.v4();
//             //        console.log('Your UUID is: ' + muuid);
//                     const newModule = {
//                         "moduleId": muuid,
//                         "module":  minfo,
//                         "startDate": startDate,
//                         "endDate": endDate,
//                         "fileName": fname
//                     };
//              //   moduleList.push(JSON.stringify(newModule));
//                     moduleList.push(newModule);
//                     CourseInstance.updateOne({_id: courseId}, {$set: {moduleList: moduleList}})
//                         .then( results =>{
//                             res.status(201).json({"redirect": "/courses/" + courseId, "user": user._id, "courseId": courseId});
//                        })
//                         .catch( err => console.log('Cannot update from database', err));

//              })
//             .catch(err=> console.log('Errors updating Question IDs: Promise rejected ', err));
//             })
//         })
//         .catch( err=> console.log("Cannot retrieve course from database : ", err));
// }

const addModule_post_old = (req,res) =>{
    console.log('Add Module pressed');
    const {fname, startDate, endDate, courseId } = req.body;
    const user = res.locals.user;

    console.log('ID of the course is', courseId, ' and user id is ', user._id);

    
    CourseInstance.findById(courseId)
        .then( results => {
            let moduleList = results.moduleList;
            let courseName = results.fname;
            const fileName = './courses/' + courseName + '/modules/' + fname + '.json';
            console.log('File name for module is ', fileName);
            
            controllerHelpers.jsonReader(fileName, (err, minfo)=>{
                if (err) {
                    console.log(err);
                    errors = controllerHelpers.handleErrors(err);
                    console.log(errors);
                    res.status(400).json({errors});
                }
          //      console.log('JSON INFO IS ', minfo);

            
          let qmap = new Map();

          minfo.contents.forEach( cont => {
            let contid = uuid.v4();
            cont['contentId'] = contid;
             if ( cont.type === 'quiz') {
                let contLength = cont.contents.length;
                for ( let i = 0; i < contLength; i++ ) {
                    qfname = cont.contents[i].fname;
                    qmap.set(qfname, "1");
                }
             }
          })

          qarray = Array.from(qmap.keys());
          console.log('Question array is ', qarray);

          Question.find({location: {$in: qarray}})
            .then ( qtns => {
  //              console.log('RESULTS OF DATABASE SEARCH IS ', qtns);
                qtns.forEach( qtn => {
                    qfname = qtn.location;
                    qmap.set(qfname, qtn._id);
                })
                idArray = Array.from(qmap.values());
                console.log('Values after DATABASE SEARCH are ', idArray);
            })

            minfo.contents.forEach( cont => {
                if ( cont.type === 'quiz') {
                   let contLength = cont.contents.length;
                   for ( let i = 0; i < contLength; i++ ) {
                       qfname = cont.contents[i].fname;
                   //    qid = qmap.get(qfname);
                       cont.contents[i].questionId = qmap.get(qfname);
                   }
                }
             })


            

            // minfo.contents.forEach( cont => {
            //     let contid = uuid.v4();
            //     cont['contentId'] = contid;
                
            //     if (cont.type === 'quiz') {
            //         for (let i = 0 ; i < cont.contents.length; i++) {
            //             let questName = cont.contents[i].fname;
            //             console.log('Retrieving ', questName);
            //             Question.findOne({location: questName})
            //                 .then( quest => {
            //                         // console.log(`Found Question: ${questName}: ID is ${quest}`);
            //                         // console.log(`But Question type = ${typeof(quest)} and Question ID is ${quest._id} while title is ${quest.title}`);
            //                         cont.contents[i].questionId = quest._id;
                                    
            //                 })
            //                 .catch( err => {
            //                     console.log('Unable to retrieve question from Question DB while adding course ', err);
            //                 });
            //         }
            //     }
            // });
            
            
            updateQuestionIdsOfModuleList(minfo)
                .then( minfo => {
                    // minfo.contents.forEach( cont => {
                    //     console.log('CONTENT AFTER : ', cont);
                    // })
                    let muuid = uuid.v4();
            //        console.log('Your UUID is: ' + muuid);
                    const newModule = {
                        "moduleId": muuid,
                        "module":  minfo,
                        "startDate": startDate,
                        "endDate": endDate,
                        "fileName": fname
                    };
             //   moduleList.push(JSON.stringify(newModule));
                    moduleList.push(newModule);
                    CourseInstance.updateOne({_id: courseId}, {$set: {moduleList: moduleList}})
                        .then( results =>{
                            res.status(201).json({"redirect": "/courses/" + courseId, "user": user._id, "courseId": courseId});
                       })
                        .catch( err => console.log('Cannot update from database', err));

             })
            .catch(err=> console.log('Errors updating Question IDs: Promise rejected ', err));
            })
        })
        .catch( err=> console.log("Cannot retrieve course from database : ", err));
}


const deleteModule_delete = (req,res)=>{
    const user = res.locals.user; 
    const courseId = req.query.courseId;
    const moduleId = req.query.moduleId;

    console.log(`User is ${user} and Course ID = ${courseId}: Module ID: ${moduleId}`);
    
    CourseInstance.findById(courseId)
        .then ( course => {
            let index = -1;
            let modList = course.moduleList;
            for ( let i = 0; i < course.moduleList.length; i++) {
                if ( moduleId === course.moduleList[i].moduleId) {
                    index = i;
                    break;
                }
            }
            console.log(' Deleting module with index = ', index, ' and length is ', modList.length);
            if (index > -1 ) {
                deletedMod = modList.splice(index,1);
                CourseInstance.updateOne({_id: courseId}, {moduleList: modList})
                    .then( results => {
                        console.log(`Deleted Module ${moduleId} from the course ${courseId}`);
                        res.status(201).json({"redirect": "/courses/" + courseId, "user": user._id, "courseId": courseId});
                    })
                    .catch( err => console.log('Unable to delete and update course: ', err));
            }
        })
        .catch( err => console.log('Error finding ', err));
}

module.exports = {
    addModule_get,
    addModule_post,
    deleteModule_delete
}