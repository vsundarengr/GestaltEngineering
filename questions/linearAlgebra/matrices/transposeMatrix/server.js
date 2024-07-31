//const { data } = require('cheerio/lib/api/attributes.js');
const math = require('mathjs');
//const mathhelper = require('../../mathhelper.js');
//const mathhelper = require('../../helpers/mathhelper.js');
const util = require('node:util');

const generate = () => {

let nRows = math.randomInt(2,5);
let nCols = math.randomInt(1,4);

nElements = nRows*nCols;

let x = Array.from({length: nElements}, ()=> math.randomInt(-5,5));

let X = math.reshape(x, [nRows, nCols]);
let Xt = math.transpose(X);
//let Xt = math.reshape(x, [nCols, nRows]);



data = {
    params: { 
        X : X,
        nRows: nRows,
        nCols: nCols
    },
    correct_answers: {
        Xt: Xt
    },
    nDigits: 2,
    sigfigs: 2
}
util.inspect.defaultOptions.depth = null;
console.log(data);
return data;
}

//generate();

module.exports = {
    generate
}