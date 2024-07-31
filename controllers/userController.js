const fs = require('fs');
const { response} = require('express');
const mongoose = require('mongoose');

const User = require('../models/User.js');

const manageusers_get = (req,res) =>{
    res.render('manageusers');
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

const addUsersToDB = (usernames) =>{
    return new Promise ( (resolve,reject)=>{
        let promises = [];
        usernames.forEach( async useremail => {
            useremail = useremail.trim();
            console.log('User email is ', useremail);
            let pr = User.create({email: useremail, password: useremail, institution: 'UCR'});
            promises.push(pr);
           });
        Promise.allSettled(promises)
           .then ( results=> {
                resolve(results);
           })
           .catch( err=> {
                console.log(' Error inserting users ', err);
                reject(err);
           });
       });
    }


const addUsers_post = async (req,res) => {
    const {data, intype } = req.body;
    const user = res.locals.user;

    let usernames;
    if (intype === "file") {
        fname = data;
        fullFileName = './users/' + fname + '.txt';
        console.log(' FILE NAME IS ', fullFileName);
        usernames = await readUsersFile(fullFileName);
    }
    else if (intype === 'enum') {
        usernames = data.split(',');
    }

    let addMessages = {};

    addUsersToDB(usernames)
        .then( results => {
            let i = 0;
            results.forEach( r => {
                if ( r.status === 'rejected') {
                    if ( r.reason.code == '11000') {
                        addMessages[usernames[i]] = `User already exists in user database`;
                    } else {
                        addMessages[usernames[i]] = `User cannot be added to user data based becasue ${r.message}`;
                    }
                } else {
                    addMessages[usernames[i]] = `User successfully added to user database`;
                }
                i = i + 1;
            });
            res.status('201').json({"message": "users added", "data": data, "addMessages": addMessages});
        })
        .catch( err=> {
            console.log('Errors adding users to user database', err);
            res.status(500).json({err});
        });


}

module.exports = {
    manageusers_get,
    addUsers_post
}