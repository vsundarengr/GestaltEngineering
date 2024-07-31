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
            "speed": "m/s",
            "time": "s",
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
            "speed": "ft/s",
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

    omegarpm = math.randomInt(30,61);
    omega = omegarpm*2*math.pi/60;
    d1 = math.round(math.randomInt(30,51)/100,2);
    d2 = math.round(math.randomInt(5,25)*d1,2);

    v1 = d1/2*omega;
    v2 = d2/2*omega;
    data = {
        params: {
            omegarpm: omegarpm,
            d1: d1,
            d2: d2,
            unitsAngSpeed: unitsAngSpeed,
            unitsDist: unitsDist,
            unitsTime: unitsTime,
            unitsSpeed: unitsSpeed

        },
        correct_answers: {
            v1: v1,
            v2: v2
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