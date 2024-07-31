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
            angaccrange: [-3,3],
            unitsangspeed: ['rpm','rad/s'],
            step: 2
        },
        {
            type: "A wheel",
            units: ["in","cm"],
            radius: [2, 40],
            rpmrange: [-1200, 1200],
            angaccrange: [-3,3],
            unitsangspeed: ['rpm'],
            unitsangacc:['rad/s^2'],
            step: 2
        },
        {
            type: "A flywheel",
            units: ["in","cm"],
            radius: [2, 40],
            rpmrange: [-1200, 1200],
            angaccrange: [-3,3],
            unitsangspeed: ['rpm'],
            unitsangacc:['rad/s^2'],
            step: 2
        },
        {
            type: "A gear",
            units: ["in","cm"],
            radius: [2,20],
            rpmrange: [-1200, 1200],
            angaccrange: [-3,3],
            unitsangspeed: ['rpm'],
            unitsangacc:['rad/s^2'],
            step: 2
        }
    ];

    ind = math.randomInt(0,choices.length);
    ch = choices[ind];
   

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
    //console.log(`Radius = ${radius} ${unitSel} and RPM = ${rpm}`);
    if (unitSel === 'ft') {
     //   radius = 0.032808*radius;
        radius = math.round(10*radius)/10;
        unitsacc = 'ft/s^2';
    } else if (unitSel === 'in') {
        radius = math.round(10*radius)/10;
        unitsacc = 'ft/s^2';
    } else if (unitSel === 'cm') {
        unitsacc = 'm/s^2';
    }

    frac = math.pickRandom([0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9]);
    rad = math.round(100*frac*radius)/100;

    angleStep = 5;
    angle = angleStep*math.randomInt(1,72);
    angrad = angle*math.pi/180;

    console.log(`Rpm = ${rpm}, Radpers = ${radps}, Radius = ${radius}, Rad = ${rad} and Angle = ${angle}`);

    ur = [math.cos(angrad), math.sin(angrad),0];
    r = [rad*math.cos(angrad), rad*math.sin(angrad),0];
    omega = [0,0,radps];

    centacc = radps*radps*rad;
    an = math.multiply(ur,(-1)*centacc);
    // v = math.cross(omega,r);
    // vmag= math.norm(v);

    if ( unitSel === 'cm') {
        centacc = centacc/100;
        an = math.multiply(an,1/100);
    } else if (unitSel === 'in') {
        centacc = 1/12*centacc;
        an = math.multiply(an,1/12);
    }

   console.log(`Radius = ${r}, Omega = ${omega} and Centripetal = ${centacc},  Cent Acc is ${an}`);

    data = {
        params: {
            object: ob,
            radius: radius,
            angspeed: angspeed,
            unitsangspeed: unitsangspeed,
            unitsdist: unitSel,
            direction: direction,
            angle: angle,
            rad: rad,
            unitsacc: unitsacc
        },
        correct_answers: {
            centax: an[0],
            centay: an[1]
        },
        correct_answers_labels: {
            centax: 'x-component',
            centay: 'y-component'
        },
        nDigits: 2,
        sigfigs: 2
    }
    
    console.log('DATA is: ',data);

    return data;

}


//generate();

module.exports = {
    generate
}