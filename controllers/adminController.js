const fs = require('fs');
const { response} = require('express');


const admin_get = (req,res)=>{
    res.render('admin');
}


module.exports = {
    admin_get
}