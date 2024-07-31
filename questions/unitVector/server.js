//const { data } = require('cheerio/lib/api/attributes.js');
const math = require('mathjs');
//const mathhelper = require('../../mathhelper.js');
const mathhelper = require('../../helpers/mathhelper.js');

const generate = () => {

let x1 = 0;
let x2 = 0;
let y1 = 0;
let y2 = 0;

while (x1 === 0 && x2 === 0 && y1 === 0 && y2 === 0) {
    x1 = math.randomInt(-10,10);
    y1 = math.randomInt(-10,10);
    x2 = math.randomInt(-10,10);
    y2 = math.randomInt(-10,10);
}

x = x2 - x1;
y = y2 - y1;

len = math.sqrt(x*x + y*y);

ux = x/len;
uy = y/len;

console.log(`x1 = ${x1}, y1 = ${y1}, x2 = ${x2}, y2 = ${y2}`);

data = {
    params: { 
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2
    },
    correct_answers: {
        ux: ux,
        uy: uy
    },
    nDigits: 2,
    sigfigs:2
}

console.log(data);
return data;
}

//generate();

module.exports = {
    generate
}