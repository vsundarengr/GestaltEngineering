//const { data } = require('cheerio/lib/api/attributes.js');
const math = require('mathjs');
//const mathhelper = require('../../mathhelper.js');
const mathhelper = require('../../helpers/mathhelper.js');

const generate = () => {
    unitSystems = ['si', "uscs"];
    masslabels = ["mass", "weight"];

    units = { 
        "si": { 
            "masslabel": "mass",
            "mass": "kg",
            "dist": "m",
            "force": "N",
            "angSpeed": "rad/s",
            "angle": "degrees",
            "speed": "m/s",
            "acc": "m/s^2",
            "energy": "J"
        },
        "uscs": {
            "masslabel": "weight",
            "mass": "lb",
            "dist": "ft",
            "force": "lb",
            "angSpeed": "rpm",
            "angle": "degrees",
            "speed": "feet/s",
            "acc": "ft/s^2",
            "energy": "ft-lb"
        }
    }
    
    unitSel = math.randomInt(0,2);
    unitsDist = units[unitSystems[unitSel]].dist;
    unitsSpeed = units[unitSystems[unitSel]].speed;
    unitsMass = units[unitSystems[unitSel]].mass;
    unitsForce = units[unitSystems[unitSel]].force;
    unitsAngSpeed = units[unitSystems[unitSel]].angSpeed;
    unitsAngle = units[unitSystems[unitSel]].angle;
    unitsAcc = units[unitSystems[unitSel]].acc;
    unitsEnergy = units[unitSystems[unitSel]].energy;
    masslabel = units[unitSystems[unitSel]].masslabel;

    m = 0.25*math.randomInt(1,15);
    Hi = math.randomInt(2,50);
    Hf = math.randomInt(2,60);

    if (unitSel === 0) {
        g = 9.81;
    } else {
        g = 1;
    }

    E = m*g*(Hf-Hi);


data = {
    params: { 
        m: m,
        Hi: Hi,
        Hf: Hf,
        masslabel:masslabel,
        unitsMass: unitsMass,
        unitsDist: unitsDist,
        unitsEnergy: unitsEnergy
    },
    correct_answers: {
        E: E
    },
    nDigits: 2,
    sigfigs:2
}

console.log(data);
return data;
}

generate();

module.exports = {
    generate
}