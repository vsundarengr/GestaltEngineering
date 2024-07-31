const Question = require('../models/Question.js');
const fs = require("fs");
const { response } = require('express');
const questionDir = './questions'

const decompress = require("decompress");

async function jsonReader(filePath, cb) {
    fs.readFile(filePath, (err, fileData) => {
      if (err) {
        return cb && cb(err);
      }
      try {
        const object = JSON.parse(fileData);
        return cb && cb(null, object);
      } catch (err) {
        return cb && cb(err);
      }
    });
  }


  

  const readQuestionHTML = (questionHTMLFile) =>{
    fs.readFile(questionHTMLFile, (err, html) =>{
      if(err){
        console.log('Error in reading file', err);
    }else{
      return html;
    }
  });
  }

  const handleErrors = (err)=>{
    console.log('Error code is ',err.code);
    console.log('Error message is ', err.message);
    console.log('Errors are ', err.errors);
    let errors = {question: ''};

    if (err.code == '11000'){
      errors.uuid = "Question already exists";
    }

    if (err.message.includes('JSON')){
      errors.json = "Error reading json file";
    }

    if (err.code === 'ENOENT') {
        errors.question = 'Could not find info.json file';
    }

    
  //  if(err.message.includes('CastError'))

    if (err.message.includes('question validation failed')) {
        Object.values(err.errors).forEach(({properties}) =>{
            console.log(`Property is : ${properties.message}`);
            console.log(`PATH is ${properties.path} and MESSAGE is ${properties.message}`);
            errors[properties.path] = properties.message;   
    })};

    return errors;  
  }

 
module.exports.insertQuestion_post= async (req,res)=>{
   const {location} = req.body;
    console.log('Attemping to Insert Question at :', location);
    const thisQuestionDir = questionDir + '/' + location;
    const infoJsonFile = questionDir + '/' + location + '/info.json';
    const questionHTMLFile = questionDir + '/' + location + '/question.html';
    console.log('Attempting to read info.json from ', infoJsonFile)
    jsonReader(infoJsonFile,  (err, qinfo) => {
        if (err) {
        console.log(err);
        errors = handleErrors(err);
        console.log(errors);
        res.status(400).json({errors});
        }else{
          const {uuid, title, topic, tags, prereqs, createdBy, isAdaptive,  qType, nSteps, updatedBy, difficulty, codelang, resources, stepType} = qinfo;
          console.log(`From JSON title is ${title} and topics is ${topic} `);
          console.log('Qinfo = ', qinfo);
          fs.readFile(questionHTMLFile, async (err, questionHTML)=>{
          if (err) {
            let errors = handleErrors(err);
            console.log(errors);
            res.status(500).json({errors});
          }
            const stem = questionHTML.toString();
          try {
            const question = await Question.create({uuid, title, stem, topic, tags, prereqs, createdBy, isAdaptive, qType, nSteps, updatedBy, location, difficulty, codelang, resources, stepType});
            res.status(201).json({question: question._id});
          } catch (err){
   //         console.log(err);
              let errors = handleErrors(err);
              console.log(errors);
              res.status(500).json({errors});
         }
        })
        const figFilesFolder = thisQuestionDir + '/clientFilesQuestion';
        fs.access(figFilesFolder, (err) =>{
          
          if (!err) {
            console.log('Client Files folder exists!!! About to copy now ');
            const destFigFiles = './public/questions/'  + location;
            fs.cp(figFilesFolder, destFigFiles,{recursive:true} ,(err) =>{
              if (err) {
                console.log(`Unable to copy directory ${figFilesFolder} to ${destFigFiles}: ${err}` );
              } else{
                console.log(`Copied directory ${figFilesFolder} to ${destFigFiles}: ${err}` );
              }
            })
          }
          else {
            console.log('Cannot access file! ', err);
          }
        });

      }
      });
   // res.render('insertQuestion');
    
}

module.exports.importZip_post= async (req,res)=>{
  const {zipFileName} = req.body;
  const location = zipFileName.slice(0,-4);
  console.log('Attemping to Import .zip named :', zipFileName);
  const thisQuestionDir = questionDir + '/' + zipFileName.slice(0,-4);
  const zipFile = thisQuestionDir + '/' + zipFileName;
  const infoJsonFile = './tmp/info.json';
  const questionHTMLFile = './tmp/question.html';
  
  console.log('Checking if ' + zipFileName + ' exists')
  fs.readFile(zipFile, function(err, fd) {    // Zip file must be in a question directory, and it must have the same name as the question
    if(err) {
      console.log('Couldn\'t find', zipFile, ' for importing');
      let errors = handleErrors(err);
      console.log(errors);
      res.status(400).json({errors});
    }else{
      console.log('Found', zipFile, 'for importing');
      
      (async() => {     // Do the unzipping

        try{
          const files = await decompress(zipFile, "tmp",)  //unzip contents into this temp folder (cannot be done in the questions directory!)
          console.log("unzipped file into /tmp")

          jsonReader(infoJsonFile,  (err, qinfo) => {   //make sure info.json exists
            if (err) {
              console.log(err);
              let errors = handleErrors(err);
              console.log(errors);
              res.status(400).json({errors});
            }else{
              fs.readFile(questionHTMLFile, async (err, questionHTML)=>{    //make sure question.html exists
                if (err) {
                  let errors = handleErrors(err);
                  console.log(errors);
                  res.status(500).json({errors});
                }
                else{
                  const stem = questionHTML.toString();
                  console.log('Success Importing Zip! Contains info.json and question.html')
                  fs.rm("tmp", { recursive: true, force: true }, er => {
                    if (er) {
                      let errors = handleErrors(err);
                      console.log(errors);
                      res.status(500).json({errors});
                    }
                    console.log('deleted tmp/')
                  })

                  //Finally, add question to DB

                  const {uuid, title, topic, tags, prereqs, createdBy, isAdaptive,  qType, nSteps, updatedBy, difficulty, codelang} = qinfo;

                  try {
                    const question = await Question.create({uuid, title, stem, topic, tags, prereqs, createdBy, isAdaptive, qType, nSteps, updatedBy, location, difficulty, codelang});
                    res.status(201).json({question: question._id});
                  } catch (err){
           //         console.log(err);
                      let errors = handleErrors(err);
                      console.log(errors);
                      res.status(500).json({errors});
                 }
                  
                }
              })
            }
          })

        }catch(error){
          console.log(error)
          console.log('failure decompressing', zipFileName)
          res.status(500).json({error});
        }
      })();

      
      }
  });
  
}

module.exports.questionUpdateSolution_post = async( req,res)=>{
  const {qid, location} = req.body;
  console.log('Attemping to update Question at :', location);
  const thisQuestionDir = questionDir + '/' + location;
  const solutionHTMLFile = questionDir + '/' + location + '/solution.html';

  console.log(`Reading ${solutionHTMLFile} `);
        fs.readFile(solutionHTMLFile, async (err, solutionHTML)=>{
        if (err) {
          let errors = handleErrors(err);
          errors.updated = false;
          console.log(errors);
          res.status(500).json({errors});
        }
        else{
          const hintString = solutionHTML.toString();
        try {
       //   console.log('Solution is ', soln);
          const question = await Question.updateOne({location: location}, {$set: {hintString: hintString}},{multi: true} );
          console.log('Question updated with solution = ', question);
          res.status(201).json({updated: true});
        }
        catch(err){
          console.log('Unable to update Question', err);
          res.status(201).json({updated: false, found: true});
        }
      }
      })
  
  
}

module.exports.questionUpdateHTML_post = async( req,res)=>{
  const {qid, location} = req.body;
  console.log('Attemping to update HTML for Question at :', location);
  const thisQuestionDir = questionDir + '/' + location;
  const questionHtmlFile = questionDir + '/' + location + '/question.html';

  console.log(`Reading ${questionHtmlFile} `);
        fs.readFile(questionHtmlFile, async (err, questionHTML)=>{
        if (err) {
          let errors = handleErrors(err);
          errors.updated = false;
          console.log(errors);
          res.status(500).json({errors});
        }
          const htmlString = questionHTML.toString();
        try {
          console.log('Question is ', htmlString);
          const question = await Question.updateOne({location: location}, {$set: {stem: htmlString}},{multi: true} );
          console.log('Question updated with html string = ', question);
          res.status(201).json({updated: true});
        }
        catch(err){
          console.log('Unable to update Question with HTML', err);
          res.status(201).json({updated: false, found: true});
        }
      })
  
  
}

module.exports.questionUpdateJson_post= async (req,res)=>{
  const {qid, location} = req.body;
  console.log('Attemping to update Question at :', location);
  const thisQuestionDir = questionDir + '/' + location;
  const infoJsonFile = questionDir + '/' + location + '/info.json';
  const questionHTMLFile = questionDir + '/' + location + '/question.html';
  console.log('Attempting to read info.json from ', infoJsonFile)
  jsonReader(infoJsonFile,  (err, qinfo) => {
      if (err) {
      console.log(err);
      errors = handleErrors(err);
      console.log(errors);
      res.status(400).json({errors});
      }else{
        const {uuid, title, topic, tags, prereqs, createdBy, isAdaptive,  qType, nSteps, updatedBy, difficulty, codelang, resources,stepType} = qinfo;
        console.log('QINFO ', qinfo);
        if ( resources) {
        for (let i = 0; i < resources.length; i++) {
          let r = resources[i];
          if ( r.type === "localfile") {
            let rFile =   '/questions/' + location + '/' + r.url;
            r.url = rFile;
          }
        }
      }

        console.log(`From JSON title is ${title} and topics is ${topic} `);
        fs.readFile(questionHTMLFile, async (err, questionHTML)=>{
        if (err) {
          let errors = handleErrors(err);
          console.log(errors);
          res.status(500).json({errors});
        }
          const stem = questionHTML.toString();
        try {
          const question = await Question.updateOne({_id: qid}, {uuid, title, stem, topic, tags, prereqs, createdBy, isAdaptive, qType, nSteps, updatedBy, location, difficulty, codelang, resources, stepType});
          res.status(201).json({question: question._id});
        } catch (err){
 //         console.log(err);
            let errors = handleErrors(err);
            console.log(errors);
            res.status(500).json({errors});
       }
      })
      const figFilesFolder = thisQuestionDir + '/clientFilesQuestion';
      fs.access(figFilesFolder, (err) =>{
        
        if (!err) {
          console.log('Client Files folder exists!!! About to copy now ');
          const destFigFiles = './public/questions/'  + location;
          fs.cp(figFilesFolder, destFigFiles,{recursive:true} ,(err) =>{
            if (err) {
              console.log(`Unable to copy directory ${figFilesFolder} to ${destFigFiles}: ${err}` );
            } else{
              console.log(`Copied directory ${figFilesFolder} to ${destFigFiles}: ${err}` );
            }
          })
        }
        else {
          console.log('Cannot access file! ', err);
        }
      });

    }
    });
 // res.render('insertQuestion');
  
}

module.exports.insertQuestion_get = (req,res)=>{
    res.render('insertQuestion');
}

module.exports.importZip_get = (req,res)=>{
  res.render('importZip');
}

module.exports.allQuestions_get = (req,res)=>{
    Question.find()
        .then( results=> {
        //    console.log(results);
            res.render('allQuestions', {title: 'All Questions', questions: results})
        })
        .catch (err=>{
            console.log(err);
        })
   // res.render('allQuestions');
}



module.exports.questionDetails_get = (req, res)=>{
  const id = req.params.id;
  console.log('Retrieve Question: ', id);
  Question.findById(id)
    .then(results => {
     
      const location = results['location'];
      const hfile = './questionsoutput/' + location + '/questionoutput.html';
    //  console.log('About to read HTML file: ', hfile);
      const viewToRender = 'questionsoutput/' + location + '/questionoutput.html';
      fs.readFile(hfile, (err, html)=>{
        let htmlString = null;
        
        if (err) {
          console.log('Error in reading file', err);
        } else{
          htmlstring = html.toString();
        }
        
      //  console.log(' HTML string is ', html.toString());
        res.render('questionDetails', {title: 'Question Details', question: results, questionInstId: '',htmlString: html.toString(), viewToRender: viewToRender });
      });
     
    
   //  res.render('questionDetails', {title: 'Question Details', question: results});
    })
    .catch( err => {
      console.log(`Error finding Question ${id}. Error is ${err}`);
    })
}

module.exports.question_delete = (req, res)=>{
  const id = req.params.id;
  console.log('Deleting record ', id);
  Question.findByIdAndDelete(id)
    .then( result => {
      res.json({redirect: '/allQuestions'});
    })
    .catch(err => {
      console.log(err);
      res.status(404);
      res.render('404', {title: 'Question cannot be deleted'});

    });
}


// module.exports.questionUpdateJson_post = (req,res) => {
//   const {qid,location} = req.body;
  
//   const infoJsonFile = questionDir + '/' + location + '/info.json';
//   console.log('Attemping updationg json Question at :', location, 'QID = ', qid, 'File name = ', infoJsonFile);
//   jsonReader(infoJsonFile,  async (err, qinfo) => {
//     if (err) {
//       console.log(err);
//       errors = handleErrors(err);
//       console.log(errors);
//       res.status(200).json({updated: false});
//     }else{
//       console.log('QINFO = ', qinfo);
    
//       try {
//         const updated = await Question.updateOne({_id: qid}, qinfo )
//         console.log('UPDATED = ', updated);
//         res.status(200).json({updated: true});
//       }
//       catch (err) {
//         console.log('Error in updateJson ', err);
//         res.status(200).json({updated:false});
//       }
//     }
//   });
  
// }