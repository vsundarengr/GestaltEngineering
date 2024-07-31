//const { data } = require('cheerio/lib/api/attributes.js');
const math = require('mathjs');
//const mathhelper = require('../../mathhelper.js');
const mathhelper = require('../../helpers/mathhelper.js');

const generate = () => {

a = math.randomInt(0,15);
b = math.randomInt(1,15);

let mask = mathhelper.getRandomMask(4,1,4);
let params_summc = {};
let ca_summc = {};

if (mask[0] === 1) {
    params_summc['opt0'] = a + b;
    ca_summc['opt0'] = "true";
} else {
    params_summc['opt0'] = a + b + math.randomInt(1,8);
    ca_summc['opt10'] = "false";
}

if (mask[1] === 1) {
    params_summc['opt1'] = a - b;
    ca_summc['opt1'] = "true";
} else {
    params_summc['opt1'] = a - b + math.randomInt(1,8);
    ca_summc['opt1'] = "false";
}

if (mask[2] === 1) {
    params_summc['opt2'] = a * b;
    ca_summc['opt2'] = "true";
} else {
    params_summc['opt2'] = a * b + math.randomInt(1,8);
    ca_summc['opt2'] = "false";
}

if (mask[3] === 1) {
    params_summc['opt3'] = a*a;
    ca_summc['opt3'] = "true";
} else {
    params_summc['opt3'] = a *a + math.randomInt(1,8);
    ca_summc['opt3'] = "false";
}

c = a**2 - 2;

data = {
    params: { 
        a: a,
        b: b,
        summc: params_summc
    },
    correct_answers: {
        summc: ca_summc,
        c: c
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