const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AdminUsers = require('../models/AdminUsers');
const UserInteraction = require('../models/UserInteraction');

const requireAuth = (req,res,next)=>{
    const token = req.cookies.jwt;

    // check json web token exists and is verified
    if (token) {
        jwt.verify(token,'net ninja secret', (err, decodedToken)=>{
            if (err) {
                console.log('Error ion verifying token: ', err);
                res.redirect('/login');
            } else {
                console.log(decodedToken);
                next();
            }
        })
    } else{
        res.redirect('/login');
    }
}

const checkUser = (req,res,next)=>{
    const token = req.cookies.jwt;
    if (token){
        jwt.verify(token,'net ninja secret', async (err, decodedToken)=>{
            if (err) {
                console.log('Error ion verifying token: ', err);
                res.locals.user = null; // if errir, then set property to null
                next();
            } else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user; // inject to view
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}

const logUserInteraction = async (req,res,next) =>{
    const user = res.locals.user;
    const query = req.query;
    const params = req.params;
    const body = req.body;
    let userId = null;
    if ( user ) {
        userId = user._id;
    }
    console.log(`User is ${userId}, query is ${query}, params is ${params} and body is ${body}`);
    try {
         const userInteraction = await UserInteraction.create({userId: userId, query: JSON.stringify(query), params: JSON.stringify(params), body: JSON.stringify(body)});
         if ( userInteraction ) {
            console.log(`User interaction for ${userId} inserted to database`);
         }
         else {
            console.log(`Did not log user interaction is ${userId}`);
         }
    } catch( err) {
        console.log('Error logging user interaction is :', err);
    }

    next();

}

const checkAdminUser = (req,res,next) =>{
    const token = req.cookies.jwt;
    console.log('Calling middleware checkAdminUser');
    if (token){
        jwt.verify(token,'net ninja secret', async (err, decodedToken)=>{
            if (err) {
                console.log('Error in verifying token: ', err);
                res.locals.user = null; // if errir, then set property to null
                next();
            } else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user; // inject to view
                userid = user._id;
                console.log('User id is ', userid);
                let adminUser = await AdminUsers.find({admins: userid});
                console.log('Admin user is ', adminUser);
                if (adminUser.length === 1 ) {
                    next();
                }
                else {
                    res.locals.user = null;
                    console.log('Need admin privileges to access this page');
                    res.render('errorpage', {errCode: "403", title:"Cannot access resource"});
                }
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports = { requireAuth, checkUser, checkAdminUser, logUserInteraction};