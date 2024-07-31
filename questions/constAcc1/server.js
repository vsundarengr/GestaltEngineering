//const { data } = require('cheerio/lib/api/attributes.js');
const math = require('mathjs');
//const mathhelper = require('../../mathhelper.js');
const mathhelper = require('../../helpers/mathhelper.js');

const generate = () =>{

    choices = [
        {
            article:"An",
            type: "object",
            units: ["m/s","ft/s","kmph","mph"],
            v1r: [0,50],
            v2r: [0,50],
            acc: [-5, 5],
            step: 1,
        },
        {
            article:"A",
            type:"car",
            units: ["mph","kmph"],
            v1r: [0,36 ],
            v2r: [0,36],
            acc: [-5, 5],
            step: 2,
        }
    ];

    ind = math.randomInt(0,choices.length);
    ch = choices[ind];
    console.log('Choice is ', ch);

    veh = ch.type;
    article = ch.article;
    v1 = 2; v2 = 2;

    while ( v1 == v2 ) {

    v1 =ch.step*math.randomInt(0, math.round( (ch.v1r[1]-ch.v1r[0])/ch.step));
    v2 =ch.step*math.randomInt(0, math.round( (ch.v2r[1]-ch.v2r[0])/ch.step));
    }
    

    console.log(`v1 = ${v1}`);
    minTime = 3; maxTime = 8;
    time = math.randomInt(minTime, maxTime);

    acc = (v2-v1)/time;

    //acc = math.randomInt(ch.acc[0], ch.acc[1]);
    
    x = v1*time + 0.5*acc*time*time;

    

    unitSel = ch.units[math.randomInt(0, ch.units.length)];
    console.log(`acc is ${acc}: time is ${time} : v2 is ${v2} and x is ${x} and unitSel = ${unitSel}`);
    switch(unitSel) {
        case 'm/s':
            unitsacc = 'm/s^2';
            unitsdist = 'm';
            break;
        case 'kmph':
            unitsacc = 'm/s^2';
            unitsdist = 'm';
            v1 = math.round(v1*3600/1000);
            v2 = math.round(v2*3600/1000);
            break;
        case 'mph':
            unitsacc = 'ft/s^2';
            unitsdist = 'ft';
            v1 = math.round(v1*2.236936);
            v2 = math.round(v2*2.236936);
            x = 3.28084*x;
            acc = 3.28084*acc;
            break;
        case 'ft/s':
            unitsacc = 'ft/s^2';
            unitsdist = 'ft';
            v1 = math.round(v1*3.28084);
            v2 = math.round(v2*3.28084);
            x = 3.28084*x;
            acc = 3.28084*acc;
            break;
    }
    let speedlabs;
    if (acc < 0 ){
        speedslab = "slows down ";
    } else {
        speedslab = "speeds up";
    }

    console.log(`acc = ${acc}: time = ${time} : v1 = ${v1} ; v2 = ${v2} and x is ${x}`);

    data = {
        params: {
            article: article,
            vehicle: veh,
            v1: v1,
            v2: v2,
            time: time,
            speedslab: speedslab
        },
        param_labels:{
            unitsv1: unitSel,
            unitsv2: unitSel,

        },
        correct_answers: {
            acc: acc,
            dist: x
        },
        correct_answers_labels: {
            acc: "Acceleration",
            dist: "Distance",
            unitsacc: unitsacc,
            unitsdist: unitsdist
        },
        nDigits: 2,
        sigfigs: 2
    }

    return data;

   // console.log('DATA IS ', data);

}

// const generate = () => {
// sideLabels = ['OA', 'AB', 'OB'];

// indices = mathhelper.getRandomPermutationRange(3);

// console.log(indices);

// OA = math.randomInt(5,15);
// AB = math.randomInt(5,15);
// OB = math.sqrt(math.square(OA) + math.square(AB));

// if (indices[2] == 0 ) {
//     OB = math.round(OB);
//     OA = math.sqrt(math.square(OB) - math.square(AB));
// } else if (indices[2] == 1) {
//     OB = math.round(OB);
//     AB = math.sqrt(math.square(OB) - math.square(OA));
// }

// sides = [OA, AB, OB];
// console.log(sides);

// data = {
//     params: {
//         A: sides[indices[0]],
//         B: sides[indices[1]]
//     },
//     param_labels: {
//         A: sideLabels[indices[0]],
//         B: sideLabels[indices[1]]
//     },
//     correct_answers: {C: sides[indices[2]]},
//     correct_answers_labels: {C: sideLabels[indices[2]]},
//     nDigits: 2,
//     sigfigs:2
// }

// console.log(data);
// return data;
// }

//generate();

module.exports = {
    generate
}