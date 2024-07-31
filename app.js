const { application } = require('express');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const {requireAuth, checkUser, checkAdminUser, logUserInteraction} = require("./middleware/authMiddleware");

global.__basedir = __dirname;

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json()); // convert json in the request 
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = process.env.MONGOURI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log('Now listening on port ' + process.env.PORT);
    app.listen(process.env.PORT)})
  .catch((err) => console.log(err));

// routes
app.get('/admin', checkAdminUser);
app.get('*', [checkUser, logUserInteraction]); // apply to every get request
app.delete('*', [checkUser,logUserInteraction]); //apply to every delete
app.post('*', [checkUser, logUserInteraction]);
// app.post('/insertQuestion',checkUser); 
// app.post('/allQuestions', checkUser);
// app.post('/checkAttempt', checkUser);
// app.post('/addCourse', checkAdminUser);
// app.post('/addModule', checkUser);


app.get('/', (req, res) => res.render('home'));
//app.get('/smoothies', (req, res) => res.render('smoothies')); // without authenticated veiw

//app.get('/', requireAuth, (req, res) => res.render('home')); // with authenticaled view
//app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies')); // with authenticated view
//app.get('/insertQuestion', requireAuth,  (req,res)=> res.render('insertQuestion'));

app.use(authRoutes);

// app.get('/set-cookies', (req,res)=>{
//   res.cookie('newUser',false);
//   res.cookie('isEmployee', true, {maxAge: 1000*60*60*24});
//   // Other options httpOnly:true - doesn;t allow script access
//   // secure:true: only over https - secure connections

//  // res.setHeader('Set-Cookie','newUser=true');
//   res.send('you get a cookie!');
// });

// app.get('/read-cookies', (req,res)=>{
//   const cookies = req.cookies;
//   console.log(cookies);
//   // Use dot notation to access elements
//   res.json(cookies);
// });
