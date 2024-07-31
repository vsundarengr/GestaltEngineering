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
OB = math.sqrt(math.square(OA) + math.square(AB));

if (indices[2] == 0 ) {
    OB = math.round(OB);
    OA = math.sqrt(math.square(OB) - math.square(AB));
} else if (indices[2] == 1) {
    OB = math.round(OB);
    AB = math.sqrt(math.square(OB) - math.square(OA));
}

sides = [OA, AB, OB];
console.log(sides);

data = {
    params: {
        A: sides[indices[0]],
        B: sides[indices[1]]
    },
    param_labels: {
        A: sideLabels[indices[0]],
        B: sideLabels[indices[1]]
    },
    correct_answers: {C: sides[indices[2]]},
    correct_answers_labels: {C: sideLabels[indices[2]]},
    nDigits: 2,
    sigfigs:2
}

console.log(data);
return data;
}

module.exports = {
    generate
}