//const { data } = require('cheerio/lib/api/attributes.js');
const math = require('mathjs');
//const mathhelper = require('../../mathhelper.js');
const mathhelper = require('../../helpers/mathhelper.js');

const generate = () => {

a = math.randomInt(0,15);
b = math.randomInt(1,15);

let mask = mathhelper.getRandomMask(4,1,4);
let params_summa = {};
let ca_summa = {};

if (mask[0] === 1) {
    params_summa['opt0'] = a + b;
    ca_summa['opt0'] = "true";
} else {
    params_summa['opt0'] = a + b + math.randomInt(1,8);
    ca_summa['opt10'] = "false";
}

if (mask[1] === 1) {
    params_summa['opt1'] = a - b;
    ca_summa['opt1'] = "true";
} else {
    params_summa['opt1'] = a - b + math.randomInt(1,8);
    ca_summa['opt1'] = "false";
}

if (mask[2] === 1) {
    params_summa['opt2'] = a * b;
    ca_summa['opt2'] = "true";
} else {
    params_summa['opt2'] = a * b + math.randomInt(1,8);
    ca_summa['opt2'] = "false";
}

if (mask[3] === 1) {
    params_summa['opt3'] = a*a;
    ca_summa['opt3'] = "true";
} else {
    params_summa['opt3'] = a *a + math.randomInt(1,8);
    ca_summa['opt3'] = "false";
}

c = a**2 - 2;

let maskmc = mathhelper.getRandomMask(5,1,1);
let params_summc = {};
let ca_summc = {};
for (let i = 0; i < maskmc.length; i++) {
    let str = 'opt' + i;
    if (maskmc[i] === 1) {
        params_summc[str] = b**2;
        ca_summc[str] = "true";
    }
    else {
        params_summc[str] = b**2 + math.randomInt(2,9);
        ca_summc[str] = "false";
    }

}

data = {
    params: { 
        a: a,
        b: b,
        summc: params_summc,
        summa: params_summa
    },
    correct_answers: {
        summc: ca_summc,
        summa: ca_summa,
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