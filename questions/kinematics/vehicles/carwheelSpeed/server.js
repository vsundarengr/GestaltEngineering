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

    if (unitSel === 0) {
        vd = math.randomInt(30,140);
        v = vd*1000/3600;
        d = math.randomInt(28,38);
        r = d/2*1/100;
    } else {
        vd = math.randomInt(20,100);
        v = vd*5280/3600;
        d = math.randomInt(18,25);
        r = d/2*1/12;
    }
    

    w = v/r;
    omega = w*60/(2*math.pi); 


    data = {
        params: {
            vd: vd,
            d: d,
            w: w,
            v: v,
            unitsDistDiv: unitsDistDiv,
            unitsAngSpeed: unitsAngSpeed,
            unitsDist: unitsDist,
            unitsTime: unitsTime,
            unitsSpeed: unitsSpeed
        },
        correct_answers: {
            omega: omega
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