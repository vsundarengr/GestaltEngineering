//const { data } = require('cheerio/lib/api/attributes.js');
const math = require('mathjs');
//const mathhelper = require('../../mathhelper.js');
const mathhelper = require('../../helpers/mathhelper.js');

const generate = () =>{
    // Default radius is in cm
    choices = [
        {
            type: "A disk",
            units: ["ft","in","cm"],
            radius: [10, 50],
            rpmrange: [-900, 900],
            unitsangspeed: ['rpm','rad/s'],
            step: 2
        },
        {
            type: "A wheel",
            units: ["in","cm"],
            radius: [2, 40],
            rpmrange: [-1200, 1200],
            unitsangspeed: ['rpm'],
            step: 2
        },
        {
            type: "A flywheel",
            units: ["in","cm"],
            radius: [2, 40],
            rpmrange: [-1200, 1200],
            unitsangspeed: ['rpm'],
            step: 2
        },
        {
            type: "A gear",
            units: ["in","cm"],
            radius: [2,20],
            rpmrange: [-1200, 1200],
            unitsangspeed: ['rpm'],
            step: 2
        }
    ];

    ind = math.randomInt(0,choices.length);
    ch = choices[ind];
    //console.log('Choice is ', ch);

    ob = ch.type;

    unitSel = ch.units[math.randomInt(0, ch.units.length)];

    let rpm = 0;
    while ( rpm == 0) {
        rpm = ch.step*math.randomInt( (ch.rpmrange[1] -ch.rpmrange[0])/ch.step);
    }
    unitsangspeed = ch.unitsangspeed[math.randomInt(0,ch.unitsangspeed.length)];
    radps = rpm*2*math.pi/60;
    if (unitsangspeed === 'rad/s') {
        radps = math.round(radps);
        angspeed = radps;
    }
    else {
        angspeed = rpm;
    }


    if (rpm < 0) {
        direction = "clockwise";
    } else{
        direction = "counterclockwise";
    }

    radius = math.randomInt(ch.radius[0],ch.radius[1]);
    
    if (unitSel === 'ft') {
        radius = 0.032808*radius;
        radius = math.round(10*radius)/10;
        unitsvel = 'ft/s';
    } else if (unitSel === 'in') {
        radius = 0.393701*radius;
        radius = math.round(10*radius)/10;
        unitsvel = 'ft/s';
    } else if (unitSel === 'cm') {
        unitsvel = 'm/s';
    }

    frac = math.pickRandom([0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9]);
    rad = math.round(100*frac*radius)/100;

    angleStep = 5;
    angle = angleStep*math.randomInt(1,72);
    angrad = angle*math.pi/180;

    //console.log(`Rpm = ${rpm}, Radius = ${radius}, Rad = ${rad} and Angle = ${angle}`);

    r = [rad*math.cos(angrad), rad*math.sin(angrad),0];
    omega = [0,0,radps];

    v = math.cross(omega,r);
    vmag= math.norm(v);

    if ( unitSel === 'cm') {
        v = math.multiply(v,1/100);
        vmag = vmag/100;
    }

    //console.log(`Radius = ${r}, Omega = ${omega} and Velocity = ${v}, Speed is ${vmag}`);

    data = {
        params: {
            object: ob,
            radius: radius,
            angspeed: angspeed,
            unitsangspeed: unitsangspeed,
            unitsdist: unitSel,
            direction: direction,
            angle: angle,
            rad: rad
        },
        correct_answers: {
            vel: vmag
        },
        correct_answers_labels: {
            vel: "Velocity",
            unitsvel: unitsvel
        },
        nDigits: 2,
        sigfigs: 2
    }
    
    console.log('DATA is: ',data);

    return data;

    

    


    
    // v1 = 2; v2 = 2;

    // while ( v1 == v2 ) {

    // v1 =ch.step*math.randomInt(0, math.round( (ch.v1r[1]-ch.v1r[0])/ch.step));
    // v2 =ch.step*math.randomInt(0, math.round( (ch.v2r[1]-ch.v2r[0])/ch.step));
    // }
    

    // console.log(`v1 = ${v1}`);
    // minTime = 3; maxTime = 8;
    // time = math.randomInt(minTime, maxTime);

    // acc = (v2-v1)/time;

    // //acc = math.randomInt(ch.acc[0], ch.acc[1]);
    
    // x = v1*time + 0.5*acc*time^2;

    

    // unitSel = ch.units[math.randomInt(0, ch.units.length)];
    // console.log(`acc is ${acc}: time is ${time} : v2 is ${v2} and x is ${x} and unitSel = ${unitSel}`);
    // switch(unitSel) {
    //     case 'm/s':
    //         unitsacc = 'm/s^2';
    //         unitsdist = 'm';
    //         break;
    //     case 'kmph':
    //         unitsacc = 'm/s^2';
    //         unitsdist = 'm';
    //         v1 = math.round(v1*3600/1000);
    //         v2 = math.round(v2*3600/1000);
    //         break;
    //     case 'mph':
    //         unitsacc = 'ft/s^2';
    //         unitsdist = 'ft';
    //         v1 = math.round(v1*2.236936);
    //         v2 = math.round(v2*2.236936);
    //         x = 3.28084*x;
    //         break;
    //     case 'ft/s':
    //         unitsacc = 'ft/s^2';
    //         unitsdist = 'ft';
    //         v1 = math.round(v1*3.28084);
    //         v2 = math.round(v2*3.28084);
    //         x = 3.28084*x;
    //         break;
    // }
    // let speedlabs;
    // if (acc < 0 ){
    //     speedslab = "slows down ";
    // } else {
    //     speedslab = "speeds up";
    // }

    // console.log(`acc = ${acc}: time = ${time} : v1 = ${v1} ; v2 = ${v2} and x is ${x}`);

    // data = {
    //     params: {
    //         vehicle: veh,
    //         v1: v1,
    //         v2: v2,
    //         time: time,
    //         speedslab: speedslab
    //     },
    //     param_labels:{
    //         unitsv1: unitSel,
    //         unitsv2: unitSel,

    //     },
    //     correct_answers: {
    //         acc: acc,
    //         dist: x
    //     },
    //     correct_answers_labels: {
    //         acc: "Acceleration",
    //         dist: "Distance",
    //         unitsacc: unitsacc,
    //         unitsdist: unitsdist
    //     },
    //     nDigits: 2,
    //     sigFigs: 2
    // }

    // return data;

   // console.log('DATA IS ', data);

}


generate();

module.exports = {
    generate
}