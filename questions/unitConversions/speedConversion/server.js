//const { data } = require('cheerio/lib/api/attributes.js');
const math = require('mathjs');
//const mathhelper = require('../../mathhelper.js');
//const mathhelper = require('../../helpers/mathhelper.js');

const generate = () => {

unitsSelection = ['m/s', 'kmph', 'cm/s','mph', 'ft/s', 'in/s', 'm/min', 'in/min'];
unitsConv = [1, 3.6, 100, 2.236936, 3.28084, 39.370079, 60, 2362.204724];
sel = math.randomInt(0, unitsSelection.length);
sel1 = sel;

while ( sel1 === sel) {
    sel1 = math.randomInt(0, unitsSelection.length);
}

v1 = math.randomInt(10, 100);
v2 = (v1/unitsConv[sel])*unitsConv[sel1];
selFrom = unitsSelection[sel];
selTo = unitsSelection[sel1];

console.log('Convert ', v1, ' ', unitsSelection[sel], ' to ', v2, ' ', unitsSelection[sel1]);

a = math.randomInt(0,15);
b = math.randomInt(0,15);

c = a + b ;

data = {
    params: { 
        v1: v1,
        selFrom: selFrom,
        selTo: selTo
    },
    correct_answers: {
        v2: v2
    },
    nDigits: 2,
    sigfigs:2
}

console.log(data);
return data;
}

generate();

module.exports = {
    generate
}