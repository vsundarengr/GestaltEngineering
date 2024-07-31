//const { data } = require('cheerio/lib/api/attributes.js');
const math = require('mathjs');
//const mathhelper = require('../../mathhelper.js');
const mathhelper = require('../../helpers/mathhelper.js');

const generate = () =>{

    choices = [
        {
            article:"A",
            type: "ball",
            units: ["m/s","ft/s"],
            height:[5,40],
            speed: [-5,5]
        },
        {
            article:"An",
            type:"object",
            units: ["m/s","ft/s"],
            height:[5,40],
            speed: [-5,5]
        },
        {
            article:"A",
            type:"block",
            units: ["m/s","ft/s"],
            height:[5,40],
            speed: [-5,5]
        }

    ];

    ind = math.randomInt(0,choices.length);
    ch = choices[ind];
    console.log('Choice is ', ch);

    ob = ch.type;

    ht = math.randomInt(ch.height[0],ch.height[1]);
    sp = math.randomInt(ch.speed[0],ch.speed[1]);

    if ( sp> 0){
        direction = "downwards";
    }else {
        direction = "upwards";
    }

    minTime = 4;
    maxTime = 20;
    time = math.randomInt(minTime, maxTime);
    let g;
    unitSel = ch.units[math.randomInt(0, ch.units.length)];
    switch(unitSel) {
        case 'm/s':
            g = 9.81;
            unitsheight = 'm';
            break;
        case 'ft/s':
            g = 32.2;
            sp = 3.28084*sp;
            unitsheight = 'ft';
            break;
    }

    x = math.round(sp*time + 0.5*g*time*time);
    roots = math.polynomialRoot(-x,sp,0.5*g); 
    let t;
    if ( roots[0] > 0 ) {
        t = roots[0];
    }
    else {
        t = roots[1];
    }
    v2 = sp + g*t;

   
    console.log(`v1 = ${sp}, v2 = ${v2},  time is ${t},  x is ${x}, ${roots} and units = ${unitSel}`);

    
    data = {
        params: {
            article: ch.article,
            object: ch.type,
            direction: direction,
            v1: math.round(100*math.abs(sp))/100,
            height:x,
        },
        param_labels:{
            unitsv1: unitSel,
            unitsheight: unitsheight
        },
        correct_answers: {
            time: t,
            speed: v2
        },
        correct_answers_labels: {
            time: "Time",
            speed: "Speed",
            unitsspeed: unitSel
            
        },
        nDigits: 2,
        sigfigs: 2
    }

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
    //     sigfigs: 2
    // }

   // return data;

   // console.log('DATA IS ', data);

}

generate();

module.exports = {
    generate
}