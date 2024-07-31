//const { data } = require('cheerio/lib/api/attributes.js');
const math = require('mathjs');
//const mathhelper = require('../../mathhelper.js');
//const mathhelper = require('../../../helpers/mathhelper.js');
const mathhelper = require(__basedir + '/helpers/mathhelper.js');

const util = require('node:util');

const generate = () => {

console.log('BASE DIR IS = ', __basedir);

let nRows = math.randomInt(2,6);

let x = Array.from({length: nRows}, ()=> math.randomInt(-5,5));


let xlen = math.sqrt(math.dot(x,x));


let X = math.reshape(x, [1, nRows]);


data = {
    params: { 
        X :X,
        nRows: nRows
    },
    correct_answers: {
        xlen: xlen
    },
    nDigits: 2,
    sigfigs: 2
}
util.inspect.defaultOptions.depth = null;
console.log(data);
return data;
}

generate();

module.exports = {
    generate
}