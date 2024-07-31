//const { data } = require('cheerio/lib/api/attributes.js');
const math = require('mathjs');
//const mathhelper = require('../../mathhelper.js');
const mathhelper = require('../../helpers/mathhelper.js');
const util = require('node:util');

const generate = () => {

let nRows = math.randomInt(1,5);
let nCols = math.randomInt(1,4);

nElements = nRows*nCols;

let x = Array.from({length: nElements}, ()=> math.randomInt(-5,5));
let y = Array.from({length: nElements}, ()=> math.randomInt(-5,5));

let z = math.add(x,y);

let X = math.reshape(x, [nRows, nCols]);
let Y = math.reshape(y, [nRows, nCols]);
let Z = math.reshape(z, [nRows, nCols]);


data = {
    params: { 
        X : X,
        Y: Y,
        nRows: nRows,
        nCols: nCols
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