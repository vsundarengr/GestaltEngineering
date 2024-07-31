const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail,'Please enter a valid email'] // isEmail is a function from the validator package
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength:[6, 'Minimum passwork length is 6']
    },
    institution: {
        type: String
    },
    isJustCreated: {
        type: Boolean,
        default: true
    },

},{timestamps:true});

// fire the function before doc save to db
// first hash the password and then save to the db
userSchema.pre('save', async function( next){
    console.log('User about to be created ands saved', this);
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// fire the function (doc,next) after the document was saved to db
userSchema.post('save', function(doc,next) {
    console.log('new user was created and saved ', doc);
    next();
});

// static method to login method

userSchema.statics.login = async function( email, password) {
    const user = await this.findOne({email:email});
    if (user){
        const auth = await bcrypt.compare(password,user.password); // first convert unhashed password that the user supplies to a hashed password. Then compare
        console.log('Password match is ', auth);
        if (auth) {
            return user;
        }
        throw Error('Incorrect password');
    }
    throw Error('Incorrect email');
    }


const User = mongoose.model('user', userSchema); // must be singular of the collection name

module.exports = User;