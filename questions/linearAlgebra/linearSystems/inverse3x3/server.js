//const { data } = require('cheerio/lib/api/attributes.js');
const math = require('mathjs');
//const mathhelper = require('../../mathhelper.js');
//const mathhelper = require('../../../helpers/mathhelper.js');
//const mathhelper = require(__basedir + '/helpers/mathhelper.js');

const util = require('node:util');

const generate = () => {

let nRows = 3;

nElements = nRows*nRows;

let dX = 0;
let x;
let X;

while ( dX === 0) {

 x = Array.from({length: nElements}, ()=> math.randomInt(-5,5));

X = math.reshape(x, [nRows, nRows]);

dX = math.det(X);

}

invX = math.inv(X);

n = math.randomInt(0,3);
let columnName;
if ( n === 0) {
    columnName = "first";
    colX = math.column(invX,0);
} else if (n === 1) {
    columnName = "second";
    colX = math.column(invX,1);
} else if (n === 2) {
    columnName = "third";
    colX = math.column(invX,2);
}

data = {
    params: { 
        X : X,
        nRows: nRows,
        columnName: columnName
    },
    correct_answers: {
        colX: colX
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