const { response} = require('express');
const User = require('../models/User.js');
const FeedbackFromStudent = require('../models/FeedbackFromStudent.js');

const feedbackFromStudents_post = async (req,res)=>{
    const user = res.locals.user;
    const {moduleInstanceId, moduleId, courseId, sftitle, sftext, qid, contentId, sftype} = req.body;

    let newqid;
    if ( qid != '') {
        newqid = qid;
    }

    const feed = {
        userid: user._id,
        title: sftitle,
        studentFeedbackBody : sftext,
        moduleInstanceId: moduleInstanceId,
        moduleId: moduleId,
        questionInstanceId: newqid,
        contentId: contentId,
        courseId, courseId,
        feedbackType: sftype
    }
    


    console.log('FEEDBACK IS ', feed);
    try {
        const fd = await FeedbackFromStudent.create(feed);
        if (fd) {
            console.log('Saved feedback to database');
            res.status(200).json({"message": "Successfully submitted", code: true}); 
         }
         else {
             console.log('Unable to save feedback to database');
             res.status(500).json({"message": "Could not submit feedback", code: false}); 
         }
    } catch (err) {
        console.log('Error creating feedback', err);
        res.status(500).json({"message": "Could not submit feedback", code: false}); 
    }
    
   

}


module.exports = {
    feedbackFromStudents_post
}