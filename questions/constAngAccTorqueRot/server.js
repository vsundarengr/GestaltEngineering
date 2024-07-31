//const { data } = require('cheerio/lib/api/attributes.js');
const math = require('mathjs');
//const mathhelper = require('../../mathhelper.js');
const mathhelper = require('../../helpers/mathhelper.js');

const generate = () =>{

        // default unit for radius is cm, for mass is kg, speed is rad/s
    choices = [
        {
            article: "A",
            type: "disk",
            unitssp: ["rpm", "rad/s"],
            v1r: [0,50],
            v2r: [0,50],
            speedstep: 1,
            unitsdist:["in","cm"],
            mass: [0.25,5],
            massstep: 0.25,
            unitsmass: ["lb","kg"],
            radius: [2,20],
            radiusstep: 1,
        },
        {
            article: "A",
            type: "gear",
            unitssp: ["rpm", "rad/s"],
            v1r: [0,50],
            v2r: [0,50],
            speedstep: 1,
            unitsdist:["in","cm"],
            mass: [0.25,5],
            massstep: 0.25,
            unitsmass: ["lb","kg"],
            radius: [2,20],
            radiusstep: 1,
        },
        {
            article: "A",
            type: "wheel",
            unitssp: ["rpm", "rad/s"],
            v1r: [0,50],
            v2r: [0,50],
            speedstep: 1,
            unitsdist:["in","cm"],
            mass: [0.25,5],
            massstep: 0.25,
            unitsmass: ["lb","kg"],
            radius: [2,20],
            radiusstep: 1,
        }
    ];

    ind = math.randomInt(0,choices.length);
    ch = choices[ind];
    console.log('Choice is ', ch);

    ob = ch.type;
    article = ch.article;
    
    m = math.round(math.random(ch.mass[0],ch.mass[1])*10)/10;
    R = math.randomInt(ch.radius[0], ch.radius[1]);
    console.log(`BEfore m = ${m}, R = ${R}`);
    unitmind = math.randomInt(0, ch.unitsmass.length);
    unitm = ch.unitsmass[unitmind];
    unitR = ch.unitsdist[unitmind];
    
    if (unitm === 'lb') {
        md = math.round(m*2.204623);
        Rd = math.round(R/2.54); // in inches
        R = Rd/12; // convert to feet
        m = md/32.2; // convert to slugs
        unitstorque = 'lb-ft';
        masstag = 'weight'
    } else {
        md = m;
        Rd = R;
        R = R*0.01;
        unitstorque = 'N-m';
        masstag = 'mass';
     }
    console.log(`After m = ${m}, R = ${R}`);
    MI = 1/2*m*R*R;

    

    v1 = 2; v2 = 2;

    // Get angular velocity
    while ( v1 == v2 ) {

        // v1 =ch.speedstep*math.randomInt(0, math.round( (ch.v1r[1]-ch.v1r[0])/ch.speedstep));
        // v2 =ch.speedstep*math.randomInt(0, math.round( (ch.v2r[1]-ch.v2r[0])/ch.speedstep));

        // if ( v2 > v1 ) {
        //     temp = v1;
        //     v1 = v2;
        //     v2 = temp;
        // }

        v1 = math.randomInt(10,70);
        v2 = math.randomInt(8,150);

    }
    
    if ( v1 < v2) {
        torquelabel = 'torque';
    } else {
        torquelabel = 'braking torque';
    }

    console.log(`v1 = ${v1} and v2 = ${v2}`);
    minTime = 3; maxTime = 8;
    time = math.randomInt(minTime, maxTime);
    unitSel = ch.unitssp[math.randomInt(0, ch.unitssp.length)];
    if (unitSel === 'rpm'){
        v1d = math.round(v1*60/(2*math.pi));
        v2d= v2*60/(2*math.pi);
        v1 = 2*math.pi*v1d/60;
    } else {
        v1d = v1;
        v2d = v2;
    }
    console.log(`v1 = ${v1} and v2 = ${v2}`);
    acc = (v2-v1)/time;

    //acc = math.randomInt(ch.acc[0], ch.acc[1]);
    
    
    torque = math.round(MI*acc,2);
    acc = torque/MI;
    v2 = v1 + acc*time;
    x = (v1 + v2)/2*time;
    x = math.round(x/(2*math.pi));
    if (unitSel === 'rpm'){
        v2d = v2*60/(2*math.pi);
    }

    console.log(`acc is ${acc}: time is ${time} : v2 is ${v2} and x is ${x} and unitSel = ${unitSel} `);
    console.log(`m = ${m} ${unitm}, R = ${R} ${unitR}, MI = ${MI}, Torque = ${torque}`);

  
 
    let unitsacc = 'rad/s^2';

    let speedslabs;
    if (acc < 0 ){
        speedslab = "slows down ";
    } else {
        speedslab = "speeds up";
    }

    

    console.log(`acc = ${acc}: time = ${time} : v1 = ${v1} ; v2 = ${v2} and x is ${x}`);

    data = {
        params: {
            article: article,
            object: ob,
            masstag: masstag,
            mass: md,
            radius: Rd,
            v1: v1d,
            time: time,
            torque: math.abs(torque),
            speedslab: speedslab,
            unitsmass: unitm,
            unitsdist: unitR,
            unitstorque: unitstorque,
            torquelabel: torquelabel
        },
        param_labels:{
            unitsv1: unitSel,
            unitsv2: unitSel,

        },
        correct_answers: {
            numrot: x,
            angspeed: v2d
        },
        correct_answers_labels: {
            angspeed: "Angular speed",
            numrot: "Number of rotations"
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