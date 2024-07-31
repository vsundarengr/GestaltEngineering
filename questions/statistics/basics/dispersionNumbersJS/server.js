//const { data } = require('cheerio/lib/api/attributes.js');
const math = require('mathjs');
// const mathhelper = require('../../mathhelper.js');
//const mathhelper = require('../../helpers/mathhelper.js');

const generate = () => {

n = math.randomInt(4,8);

x = math.multiply(100,math.random([1,n]));
x = math.round(x);
console.log('x = ', x);

meanx = math.mean(x);
medx = math.median(x);
modex = math.mode(x);

stdx = math.std(x);
varx = math.variance(x);

data = {
    params: { 
        x: x
    },
    correct_answers: {
        meanx: meanx,
        medx: medx,
        stdx: stdx,
        varx: varx
    },
    nDigits: 2,
    sigfigs: 2
}

console.log(data);
return data;
}

generate();

module.exports = {
    generate
}