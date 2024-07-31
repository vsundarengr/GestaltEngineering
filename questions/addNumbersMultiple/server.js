//const { data } = require('cheerio/lib/api/attributes.js');
const math = require('mathjs');
//const mathhelper = require('../../mathhelper.js');
const mathhelper = require('../../helpers/mathhelper.js');

const generate = () => {

a = math.randomInt(0,15);
b = math.randomInt(0,15);

c = a + b ;
d = a - b;
e = a*b;
f = a/b;
g = a*a;
h = b*b;

data = {
    params: { 
        a: a,
        b: b
    },
    correct_answers: {
        c: c,
        d:d,
        e:e,
        f:f,
        g:g,
        h: h
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