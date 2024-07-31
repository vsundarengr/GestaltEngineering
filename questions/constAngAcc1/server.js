//const { data } = require('cheerio/lib/api/attributes.js');
const math = require('mathjs');
//const mathhelper = require('../../mathhelper.js');
const mathhelper = require('../../helpers/mathhelper.js');

const generate = () =>{

    choices = [
        {
            type: "A disk",
            units: ["rpm", "rad/s"],
            v1r: [0,50],
            v2r: [0,50],
            acc: [-5, 5],
            step: 1,
        },
        {
            type:"A pulley",
            units: ["rpm"],
            v1r: [0,36 ],
            v2r: [0,36],
            acc: [-5, 5],
            step: 2,
        },
        {
            type:"A gear",
            units: ["rpm"],
            v1r: [0,36 ],
            v2r: [0,36],
            acc: [-5, 5],
            step: 2,
        },
        {
            type:"A wheel",
            units: ["rpm"],
            v1r: [0,36 ],
            v2r: [0,36],
            acc: [-5, 5],
            step: 2,
        }
    ];

    ind = math.randomInt(0,choices.length);
    ch = choices[ind];
    console.log('Choice is ', ch);

    ob = ch.type;
    
    v1 = 2; v2 = 2;

    while ( v1 == v2 ) {

    v1 =ch.step*math.randomInt(0, math.round( (ch.v1r[1]-ch.v1r[0])/ch.step));
    v2 =ch.step*math.randomInt(0, math.round( (ch.v2r[1]-ch.v2r[0])/ch.step));
    }
    

    console.log(`v1 = ${v1}`);
    minTime = 3; maxTime = 8;
    time = math.randomInt(minTime, maxTime);
    unitSel = ch.units[math.randomInt(0, ch.units.length)];
    if (unitSel === 'rpm'){
        v1d = math.round(v1*60/(2*math.pi));
        v2d= math.round(v2*60/(2*math.pi));
        v1 = 2*math.pi*v1d/60;
        v2 = 2*math.pi*v2d/60;
    } else {
        v1d = v1;
        v2d = v2;
    }

    acc = (v2-v1)/time;

    //acc = math.randomInt(ch.acc[0], ch.acc[1]);
    
    x = v1*time + 0.5*acc*time*time;


    console.log(`acc is ${acc}: time is ${time} : v2 is ${v2} and x is ${x} and unitSel = ${unitSel}`);

  
 
    let unitsacc = 'rad/s^2';

    let speedlabs;
    if (acc < 0 ){
        speedslab = "slows down ";
    } else {
        speedslab = "speeds up";
    }

    x = math.round(x/(2*math.pi));

    console.log(`acc = ${acc}: time = ${time} : v1 = ${v1} ; v2 = ${v2} and x is ${x}`);

    data = {
        params: {
            object: ob,
            v1: v1d,
            v2: v2d,
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
            acc: "Angular acceleration",
            dist: "Number of rotations",
            unitsacc: unitsacc,
        },
        nDigits: 2,
        sigfigs: 2
    }

    console.log('DATA IS ', data);
    return data;

   

}

generate();

module.exports = {
    generate
}