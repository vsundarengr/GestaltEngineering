const fs = require('fs');
const { response} = require('express');
const CourseInstance = require('../models/CourseInstance.js');
const StudentCourseInstance = require('../models/StudentCourseInstance.js');
const User = require('../models/User.js');

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

  const handleErrors = (err)=>{
    console.log('Error code is ',err.code);
    console.log('Error message is ', err.message);
    console.log('Errors are ', err.errors);
    let errors = {course: ''};

    if (err.code == '11000'){
      errors.uuid = "Course already exists";
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



const allCourses_get = (req,res)=>{
  const user = res.locals.user;
  CourseInstance.find()
        .then( results =>{
            res.render('courses', {title: "All Courses", courses:results});
        })
        .catch (err => {
            res.render('404', {title: 'Cannot fetch courses'});
        });
  //  res.render('courses');
}

const showAllRegCourses_get = (req,res)=>{
  const user = res.locals.user;
  StudentCourseInstance.find({userid: user._id})
    .then( results => {
      console.log(` Found ${results.length} instance for student ${user.email}`);
      res.render('showregcourses', {title: 'Show all courses', scInstances: results});
    })
    .catch (err=> {
      console.log('Unable to get all courses for user:  ', user.email);
    })
}

const addCourse_get = (req,res) => {
    res.render('addCourse');
}

const manageCourseUsers_get = (req,res)=>{
  
  const courseId = req.query.courseId;
  const fname = req.query.fname;
  console.log('In Manage Course Users get and ID = ',);
  res.render('manageCourseUsers', {courseId: courseId, courseName: fname});
}




const readUsersFile = (fileName) => {
  return new Promise ( (resolve, reject) =>{
      fs.readFile( fileName, 'utf8', (err,data)=> {
          if (err){
              reject(err);
          }
          console.log(`'Data read from users is ${data}`);
          let usernames = data.split('\n');

          resolve(usernames)
      })
  })
}

const createStudentCourseInstances = (usersList, courseId, fname) =>{
 // console.log(' USERS LIST = ', usersList);
  return new Promise ( (resolve,reject)=>{
      let promises = [];
      usersList.forEach( async stud => {
          console.log('Student User email is ', stud.email);
          let pr = StudentCourseInstance.create({
            courseId: courseId,
            userid: stud._id,
            email: stud.email,
            fname: fname
          });
          //let pr = User.create({email: useremail, password: useremail, institution: 'UCR'});
        //  console.log('Why can I not see this? = ', pr);
          promises.push(pr);
         });
      Promise.allSettled(promises)
         .then ( results=> {
    //          console.log('RESULTS AFTER PROMSSSSS ', results);
              resolve(results);
         })
         .catch( err=> {
              console.log(' Error inserting users ', err);
              reject(err);
         });
     });
  }

 
const addStudentsToCourse_post = async (req,res) => {
  const {data, intype, courseId, courseName } = req.body;
  const user = res.locals.user;

  console.log(`Data is ${data}, CourseId = ${courseId}, CourseName = ${courseName}`);

  let usernames;
  if (intype === "file") {
      fname = data;
      fullFileName = './courses/' + courseName + '/'+ fname + '.txt';
      console.log(' FILE NAME IS ', fullFileName);
      usernames = await readUsersFile(fullFileName);
  }
  else if (intype === 'enum') {
      usernames = data.split(',');
  }

 
  let trimmedUserNames = [];
  usernames.forEach( u=>{
    trimmedUserNames.push(u.trim());
  })
  console.log('USER NAME IS ', trimmedUserNames);
  let addMessages = {};

  User.find({email: {$in: trimmedUserNames}})
    .then(   async results => {
    //  console.log(' RESULTS OF RETRIEVAL IS ', results);
        console.log(`CourseId = ${courseId} and CourseName = ${courseName}`);

        createStudentCourseInstances(results, courseId, courseName)
        .then( scInstances => {
            let i = 0;
            console.log(' PROMISES RESOLVED ', scInstances);
            scInstances.forEach( r => {
                if ( r.status === 'rejected') {
                    if ( r.reason.code == '11000') {
                        addMessages[trimmedUserNames[i]] = `User already exists in user database`;
                    } else {
                        addMessages[trimmedUserNames[i]] = `User cannot be added to user data based becasue ${r.message}`;
                    }
                } else {
                    addMessages[trimmedUserNames[i]] = `User successfully added to user database`;
                }
                i = i + 1;
            });
        })
        .then( ()=> {
          console.log('ADD MESSAGES HERE: ', addMessages);
          res.status('201').json({"message": "users added", "data": data, "addMessages": addMessages});
        })
        .catch( err=> {
            console.log('Errors adding users to user database', err);
            res.status(500).json({err});
        });
      
    })
    .catch( err=> {
      console.log('Error finding user: ', err);
      res.status(500).json({err});
    })



  //db.books.find({rating: {$in: [7,8,9]}}) 

  //res.status('201').json({"message": "users added", "data": data, "addMessages": addMessages});




}

const addCourse_post = (req,res) =>{
    const {cname, courseNumber, section, instructor, institution, session, startDate, endDate, fname} = req.body;
    const cdir = './courses/' + fname;
    const infoJsonFile = cdir + '/info.json';
    const user = res.locals.user; // Is this here?
    const addedBy = user._id;
    let name = cname;
    console.log(`DATE: Name = ${name}, CourseNumber = ${courseNumber}, Section = ${section}, Institution = ${institution} and Instructor = ${instructor}`);
    console.log(`SESSION = ${session}, START-DATE =${startDate}, END-DATE = ${endDate}, FNAME = ${fname}`);
    console.log(`INFO JSON: ${infoJsonFile}`);
    jsonReader( infoJsonFile, async (err, cinfo)=>{
        if (err) {
            console.log(err);
            errors = handleErrors(err);
            res.status(400).json({errors});
        }

        try {
            const course = await CourseInstance.create({name, courseNumber, section, instructor, institution, session, startDate, endDate, addedBy, fname});
            const studentCourseInstance = await StudentCourseInstance.create({courseId: course._id, userid: user._id, fname: fname, email: user.email });
            console.log('Done inserting course');
            res.status(201).json({"output": "Success"});
        } catch (err) {
            let errors = handleErrors(err);
            console.log(errors);
            res.status(500).json({errors});
        }
    }
    );
   // res.status(201).json({returnValue: "blah-blah"});
}

const courseDetails_get = (req, res)=>{
    const id = req.params.id;
    console.log('Retrieve Course: ', id);
    const user = res.locals.user;

    CourseInstance.findById(id)
        .then( async results => {
         //   console.log('Displaying course details: ', results);
           try {
            let quizList = await StudentCourseInstance.findOne({courseId: id, userid: user._id}, {quizList: {_id: 1, title: 1, startDate: 1, endDate: 1}, _id: 0});

            console.log('HERE ARE THE QUIZ LIST IDS CC', quizList);
            
            if ( quizList) {
            res.render('courseDetails', {title: 'Course Details', course: results, quizList: quizList.quizList});
            } else {
              res.render('courseDetails', {title: 'Course Details', course: results, quizList: []});
            }

           } catch (err) {
            console.log(`Error finding course information for ${id}`, err);
            res.render('404', {title: 'Question cannot be deleted'});
           }
        })
        .catch( err => { 
            console.log(`Error finding course ${id} `, err);
            res.render('404', {title: 'Question cannot be deleted'});
        });

}

const showStudentCourse_get = (req, res)=>{
  const id = req.params.id;
 
  const user = res.locals.user;
  console.log(`Retrieve Course ${id} for student ${user._id}`);

  CourseInstance.findById(id)
      .then( async results => {
    //      console.log('Displaying course details: ', results);
          
          try {
          const quizList = await StudentCourseInstance.findOne({courseId: id, userid: user._id}, {quizList: {_id: 1,title: 1, startDate: 1, endDate: 1}, _id: 0});

        //  console.log('HERE ARE THE QUIZ LIST IDS ', quizList);

          res.render('showStudentCourse', {title: 'Course Details', course: results, quizList: quizList.quizList});
        } catch (err) {
          console.log(`Error finding course information inside for ${id}`, err);
            res.render('404', {title: 'Question cannot be deleted'});
        }
        })
      .catch( err => { 
          console.log(`Error finding course ${id} `, err);
          res.render('404', {title: 'Show course not working'});
      });

}

const course_delete = (req,res)=>{
    const id = req.params.id;
    console.log('Deleting course: ', id);
    CourseInstance.findByIdAndDelete(id)
        .then(result => {
            res.json({redirect:'/courses'})
        })
        .catch (err => {
            console.log('ERROR DELETING COURSE ', err);
            res.status(404);
            res.render('404', {title: "Course cannot be deleted"});
        });
}


module.exports = {
    allCourses_get,
    addCourse_get,
    addCourse_post,
    courseDetails_get,
    course_delete,
    manageCourseUsers_get,
    addStudentsToCourse_post,
    showAllRegCourses_get,
    showStudentCourse_get
}