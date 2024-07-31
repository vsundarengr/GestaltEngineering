//const { data } = require('cheerio/lib/api/attributes.js');
const math = require('mathjs');
//const mathhelper = require('../../mathhelper.js');
const mathhelper = require('../../helpers/mathhelper.js');

const generate = () => {

a = math.randomInt(0,15);
b = math.randomInt(0,15);

c = a + b ;
c1 = c + 2;
c2 = c - 2;
c3 = c + 4;

data = {
    params: { 
        a: a,
        b: b,
        c: c,
        opt1: c,
        opt2: c1,
        opt3: c2,
        opt4: c3,
        summc: {opt1: c, opt2: c1, opt3: c2, opt4: c3 }
    },
    correct_answers: {
        summc: {opt1: "true", opt2: "false", opt3: "false", opt4: "false"}
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