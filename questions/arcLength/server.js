//const { data } = require('cheerio/lib/api/attributes.js');
const math = require('mathjs');
//const mathhelper = require('../../mathhelper.js');
const mathhelper = require('../../helpers/mathhelper.js');

const generate = () => {

labels = ["arc length", "radius", "angle"];

unitsdist = ["cm","in","ft","m"];
unitsangle = ["degrees", "radians"];

udist = unitsdist[math.randomInt(unitsdist.length)];
uangle = unitsangle[math.randomInt(unitsangle.length)];


ch = math.randomInt(1,3);

switch (ch) {
    case 0: // unknown arc length
        radius = math.random(0.25,10).toPrecision(2);
        angle = 5*math.randomInt(1,72);
        anglerad = angle*math.pi/180;
        arclength = radius*angle;
        A = radius;
        labelA = 'radius';
        unitsA = udist;
        labelB = 'angle';
        unitsB = uangle;
        if (uangle === 'radians') {
            B = Number.toPrecision(anglerad,2);
        } else {
            B = angle;
        }
        C = arclength;
        labelC = 'arc length';
        unitsC = udist;
        break;
    case 1: 
        angle = 5*math.randomInt(1,72);
        anglerad = angle*math.pi/180;
        labelA = 'angle';
        unitsA = uangle;
        if (uangle === 'radians') {
            A = anglerad;
        } else {
            A = angle;
        }
        arclength = math.randomInt(5,25);
        B = arclength;
        labelB = 'arc length';
        unitsB = udist;
        radius = arclength/anglerad;
        C = radius;
        labelC = 'radius';
        unitsC = udist;
        break;
    case 2:
        radius = math.randomInt(1,15);
        labelA = 'radius';
        A = radius;
        unitsA= udist;
        circum = 2*math.pi*radius;
        arclength = math.round((math.random()*circum));
        B = arclength;
        labelB = 'arc length';
        unitsB = udist;
        angle = arclength/radius;
        
        if (uangle === 'radians') {
            C = angle;
        } else {
            C = angle*180/math.pi;
        }
        labelC = 'angle';
        unitsC = uangle;
        break;

}

//console.log(`choice  ${ch}: radius = ${radius}; angle = ${angle}; Arc length = ${arclength}`);

data = {
    params: {
        A: math.round(A*100)/100,
        B: math.round(B*100)/100,
        labelA: labelA,
        labelB: labelB,
        labelC: labelC,
        unitsA: unitsA,
        unitsB: unitsB,
        unitsC: unitsC
    },
    correct_answers: {
        C: C
    },
    correct_answers_labels: {
        C: "C"
    },
    nDigits: 2,
    sigfigs: 2
}

console.log(data);
return data;
}

//generate();

module.exports = {
    generate
}