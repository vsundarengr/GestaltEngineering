//const { data } = require('cheerio/lib/api/attributes.js');
const math = require('mathjs');
//const mathhelper = require('../../mathhelper.js');
//const mathhelper = require('../../helpers/mathhelper.js');

const generate = () => {

AB = math.randomInt(5,25)*0.5;
BC = math.round(AB*math.random(0.4,0.8),1);
abcdeg = math.randomInt(20,170);
abc = abcdeg*math.pi/180;

AC = math.sqrt(AB**2 + BC**2 - 2*AB*BC*math.cos(abc));

bac = math.acos( (AB**2 + AC**2 - BC**2)/(2*AB*AC));
bacdeg = bac*180/math.pi;
acbdeg = 180 - (abcdeg+bacdeg);

data = {
    params: { 
        AB: AB,
        BC: BC,
        abcdeg: abcdeg
    },
    correct_answers: {
        AC: AC,
        bacdeg: bacdeg,
        acbdeg: acbdeg

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