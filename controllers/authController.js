const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AdminUsers = require('../models/AdminUsers')

//const { addUsers_post } = require('./userController.js');
//const question = require('../models/Question.js');
// handle errors
const handleErrors = (err) =>{
    console.log(err.message, err.code);
    let errors = { email: '', password: ''};
    

    //incorrect email
    if (err.message === 'Incorrect email'){
        errors.email = 'That email is not registered';

    }

    if (err.message === 'Incorrect password'){
        errors.password = 'Incorrect password';
    }

    if (err.code === 11000) {
        errors.email = "That email is already registered";
        return errors;
     }

    // validation errors
    if (err.message.includes('user validation failed')){
        //console.log('Within handle errors: ', err);
        Object.values(err.errors).forEach(({properties}) =>{
            errors[properties.path] = properties.message;   
       }
        );
    }
    return errors;
}

const maxAge = 3*24*60*60; // time in seconds. Valid for  3 days

const createToken = (id) =>{
    return jwt.sign({id}, 'net ninja secret', {expiresIn: maxAge});
}

module.exports.signup_get = (req,res)=>{
    res.render('signup');
}

module.exports.resetpassword_post = async (req,res)=>{
    const {useremail} = req.body;
    console.log('Trying to change password for user ', useremail);
    try {
        const user = await User.findOne({email: useremail});
        console.log(`Found user ${useremail} to change password for`);
        const salt = await bcrypt.genSalt();
        hashednewpassword = await bcrypt.hash(useremail, salt);
        User.updateOne({_id: user._id}, {password: hashednewpassword, isJustCreated: true})
            .then ( r => {
                console.log('RESULT OF RESET DATE PASSWORD IS ', r);
                res.status(201).json({changed: true});
            })
            .catch( err=> console.log('UNABLE TO RESET PASSWORD ', err));
    }catch(err) {
        console.log('Error in resetting password ', err);
        let errors = handleErrors(err);
        res.status(500).json({errors});
    }

}

module.exports.changepassword_post = async (req,res)=>{
    const {email, password, newpassword} = req.body;
    try {
        const user = await User.login(email, password);
        console.log(`Found user ${email} to change password for`);
        const salt = await bcrypt.genSalt();
        hashednewpassword = await bcrypt.hash(newpassword, salt);
        User.updateOne({_id: user._id}, {password: hashednewpassword, isJustCreated: false})
            .then ( r => {
                console.log('RESULT OF UPDATE PASSWORD IS ', r);
                res.status(201).json({changed: true});
            })
            .catch( err=> console.log('UNABLE TO UPDATE PASSWORD ', err));
    }catch(err) {
        console.log('Error in changing password ', err);
        let errors = handleErrors(err);
        res.status(500).json({errors});
    }

}

module.exports.signup_post =  async (req,res)=>{
    const {email, password, institution} = req.body;
    console.log(`Email is ${email},   password is ${password} and institution is ${institution}`);

    try{
        const user = await  User.create({
                email: email, 
                password: password, 
                institution: institution, 
                isJustCreated: false });
        const token = createToken(user._id);
        res.cookie('jwt', token,{httpOnly: true, maxAge: maxAge*1000});
        res.status(201).json({user: user._id});
    }catch(err){
        console.log(err);
        let errors = handleErrors(err);
        res.status(500).json({errors});
    }

    //res.send('new signup');
}

module.exports.login_get = (req,res)=>{
    res.render('login')
}

module.exports.changepassword_get = (req,res)=>{
    res.render('changepassword')
}

module.exports.login_post = async (req,res)=>{
    const {email, password} = req.body;
    console.log(`Login attempt: Email is ${email} and his password is ${password}`);
    try {
        const user = await User.login(email, password);
        let adminUser = await AdminUsers.find({admins: user._id});
        let isAdmin = false;
        if (adminUser.length === 1) {
            isAdmin = true;
        }
        if (!user.isJustCreated) {
            if (isAdmin) {
                console.log('IS ADMIN');
                const token = createToken(user._id);
                res.cookie('jwt', token,{httpOnly: true, maxAge: maxAge*1000});
                res.status(200).json({"redirect": "/allQuestions", user: user._id});
            } else {
                console.log('IS NOT ADMIN');
                const token = createToken(user._id);
                res.cookie('jwt', token,{httpOnly: true, maxAge: maxAge*1000});
              //  let redirectLoc = "/showAllRegCourses_get/" + user._id;
                let redirectLoc = "/showAllRegCourses"
                res.status(200).json({"redirect": redirectLoc, user: user._id});
            }
        }
        else{
            res.status(200).json({"redirect": "/changepassword", user: user._id});
        }
  } catch(err) {
        const errors = handleErrors(err);
        res.status(400).json({errors});
  }
    
}

module.exports.logout_get = (req,res)=>{
    res.cookie('jwt','',{maxAge:1}); // replace cookie with a jwt of empty string with a time out of 1 ms
    res.redirect('/');
}

// module.exports.insertQuestion_post=(req,res)=>{
//     const loc = req.body;
//     console.log('Attemping to Insert Question at :', loc);
//     res.render('insertQuestion');
    
// }

// module.exports.insertQuestion_get=(req,res)=>{
//     res.render('insertQuestion');
// }