//const { data } = require('cheerio/lib/api/attributes.js');
const math = require('mathjs');
// const mathhelper = require('../../mathhelper.js');
//const mathhelper = require('../../helpers/mathhelper.js');

const generate = () => {

n = math.randomInt(4,8);

x = math.multiply(100,math.random([1,n]));
x = math.round(x);

y = math.multiply(100,math.random([1,n]));
y = math.round(y);

console.log('x = ', x, 'y = ', y);

meanx = math.mean(x);
meany = math.mean(y);

stdx = math.std(x);
stdy = math.std(y);

xd = math.add(x,-meanx);
yd = math.add(y,-meany);

sumdot = math.sum( math.dotMultiply(xd,yd));

covar = sumdot/(n-1);
cor = covar/(stdx*stdy);

data = {
    params: { 
        x: x,
        y: y
    },
    correct_answers: {
        covar: covar,
        cor: cor
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