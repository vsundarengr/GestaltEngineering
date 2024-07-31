//const { data } = require('cheerio/lib/api/attributes.js');
const math = require('mathjs');
// const mathhelper = require('../../mathhelper.js');
const mathhelper = require('../../helpers/mathhelper.js');

const generate = () => {
sideLabels = ['OA', 'AB', 'OB'];

indices = mathhelper.getRandomPermutationRange(3);

console.log(indices);

OA = math.randomInt(5,15);
AB = math.randomInt(5,15);
angleDeg = 5*math.randomInt(1, 35);
angle = angleDeg*Math.PI/180;
OB = math.sqrt(math.square(OA) + math.square(AB) - 2*OA*AB*math.cos(angle));

if (indices[2] == 0 ) {
    OB = math.round(OB);
    OA = math.sqrt(math.square(OB) - math.square(AB) + 2*OA*AB*math.cos(angle));
} else if (indices[2] == 1) {
    OB = math.round(OB);
    AB = math.sqrt(math.square(OB) - math.square(OA) + 2*OA*AB*math.cos(angle));
}

sides = [OA, AB, OB];
console.log(sides);

data = {
    params: {
        A: sides[indices[0]],
        B: sides[indices[1]],
		C: angleDeg
    },
    param_labels: {
        A: sideLabels[indices[0]],
        B: sideLabels[indices[1]]
    },
    correct_answers: {D: sides[indices[2]]},
    correct_answers_labels: {D: sideLabels[indices[2]]},
    nDigits: 2,
    sigfigs:2
}

console.log(data);
return data;
}

module.exports = {
    generate
}