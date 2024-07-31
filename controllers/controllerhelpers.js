const fs = require('fs');
const { response} = require('express');

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
    let errors = {question: ''};

    if (err.code == '11000'){
      errors.uuid = "Item already exists";
    }

    if (err.message.includes('JSON')){
      errors.json = "Error reading json file";
    }

    if (err.code === 'ENOENT') {
        errors.question = 'Could not find file';
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


  module.exports = {
    jsonReader,
    handleErrors
  }