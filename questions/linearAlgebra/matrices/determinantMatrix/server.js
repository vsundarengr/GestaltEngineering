//const { data } = require('cheerio/lib/api/attributes.js');
const math = require('mathjs');
//const mathhelper = require('../../mathhelper.js');
//const mathhelper = require('../../../helpers/mathhelper.js');
const mathhelper = require(__basedir + '/helpers/mathhelper.js');

const util = require('node:util');

const generate = () => {

let nRows = math.randomInt(2,4);

nElements = nRows*nRows;

let x = Array.from({length: nElements}, ()=> math.randomInt(-5,5));

let X = math.reshape(x, [nRows, nRows]);

dX = math.det(X);

data = {
    params: { 
        X : X,
        nRows: nRows
    },
    correct_answers: {
        detX: dX
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