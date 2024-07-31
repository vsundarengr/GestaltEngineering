//const { data } = require('cheerio/lib/api/attributes.js');
const math = require('mathjs');
//const mathhelper = require('../../mathhelper.js');
//const mathhelper = require('../../helpers/mathhelper.js');

const generate = () =>{

    unitSystems = ['si', "uscs"];
    masslabels = ["mass", "weight"];
    
    units = { 
        "si": { 
            "masslabel": "mass",
            "angspeed": "rpm",
            "angacc": "\\( rad/s^2 \\)",
            "mass": "kg",
            "speed": "kmph",
            "time": "s",
            "distdiv": "cm",
            "dist": "m",
            "force": "N",
            "angle": "degrees",
            "work": "J",
            "acc": "\\( m/s^2 \\)"
        },
        "uscs": {
            "masslabel": "weight",
            "angspeed": "rpm",
            "angacc": "\\( rad/s^2 \\)",
            "mass": "lb",
            "time": "s",
            "speed": "mph",
            "distdiv": "in",
            "dist": "ft",
            "force": "lb",
            "angle": "degrees",
            "work": "ft-lb",
            "acc": "\\( ft/s^2 \\)"
        }
    }
    
    unitSel = math.randomInt(0,2);
    uts = units[unitSystems[unitSel]];
    unitsAngSpeed = uts.angspeed;
    unitsTime = uts.time;
    unitsAngAcc = uts.angacc;
    unitsDist = uts.dist;
    unitsSpeed = uts.speed;
    unitsDistDiv = uts.distdiv;

    const acc = math.randomInt(0,2);

    const time = 0.5*math.round(6,12);

    if (unitSel === 0) {
        vd = math.randomInt(30,140);
        v = vd*1000/3600;
        d = math.randomInt(28,38);
        r = d/(2*100);
        vdf = acc === 0 ? math.round(v*math.random(1.05, 1.2)) : math.round(vdf*math.random(0.6, 0.9));
       // vdf = acc === 0 ? math.round(math.random(1.05, 1.2)) : math.round(math.random(0.6, 0.9));
        vf = vdf*1000/3600;
        atemp = (vf-v)/time;
        distance = math.round((v + vf)/2*time);
        a = (vf**2 - v**2)/(2*distance);
    } else {
        vd = math.randomInt(20,100);
        v = vd*5280/3600;
        d = math.randomInt(18,25);
        r = d/2*1/12;
        vdf = acc === 0 ? math.round(v*math.random(1.05, 1.2)) : math.round(vdf*math.random(0.6, 0.9));
        vf = vdf*5280/3600;
        atemp = (vf-v)/time;
        distance = math.round((v + vf)/2*time);
        a = (vf**2 - v**2)/(2*distance);
    }
    

   w = v/r;
   alpha = a/r;
   


    data = {
        params: {
            vd: vd,
            vdf: vdf,
            time: time,
            d: d,
            w: w,
            v: v,
            distance: distance,
            unitsDistDiv: unitsDistDiv,
            unitsAngSpeed: unitsAngSpeed,
            unitsDist: unitsDist,
            unitsTime: unitsTime,
            unitsSpeed: unitsSpeed,
            unitsAngAcc: unitsAngAcc
        },
        correct_answers: {
            alpha: alpha
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