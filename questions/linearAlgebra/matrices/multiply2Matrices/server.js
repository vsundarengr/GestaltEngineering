//const { data } = require('cheerio/lib/api/attributes.js');
const math = require('mathjs');
//const mathhelper = require('../../mathhelper.js');
//const mathhelper = require('../../../helpers/mathhelper.js');
const mathhelper = require(__basedir + '/helpers/mathhelper.js');

const util = require('node:util');

const generate = () => {

console.log('BASE DIR IS = ', __basedir);

let nRows1 = math.randomInt(2,4);
let nCols1 = math.randomInt(1,4);
let nCols2 = math.randomInt(1,5);

nElements1 = nRows1*nCols1;
nElements2 = nCols1*nCols2;

let x = Array.from({length: nElements1}, ()=> math.randomInt(-5,5));
let y = Array.from({length: nElements2}, ()=> math.randomInt(-5,5));



let X = math.reshape(x, [nRows1, nCols1]);
let Y = math.reshape(y, [nCols1, nCols2]);

Z = math.multiply(X,Y);


data = {
    params: { 
        X : X,
        Y: Y,
        nRows1: nRows1,
        nCols1: nCols1,
        nCols2: nCols2
    },
    correct_answers: {
        Z: Z
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