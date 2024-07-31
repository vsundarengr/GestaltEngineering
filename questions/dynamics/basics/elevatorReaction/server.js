//const { data } = require('cheerio/lib/api/attributes.js');
const math = require('mathjs');
//const mathhelper = require('../../mathhelper.js');
//const mathhelper = require('../../helpers/mathhelper.js');

const generate = () => {

    unitSystems = ['si', "uscs"];
    masslabels = ["mass", "weight"];
    
    units = { 
        "si": { 
            "masslabel": "mass",
            "mass": "kg",
            "speed": "kmph",
            "dist": "m",
            "force": "N",
            "angle": "degrees",
            "work": "J",
            "time": "seconds",
            "acceleration": "\\( m/s^2 \\)"
        },
        "uscs": {
            "masslabel": "weight",
            "mass": "lb",
            "speed": "mph",
            "dist": "ft",
            "force": "lb",
            "angle": "degrees",
            "work": "ft-lb",
            "time": "seconds",
            "acceleration": "\\( ft/s^2 \\)"
        }
    }
    
    unitSel = math.randomInt(0,2);
    unitsDist = units[unitSystems[unitSel]].dist;
    unitsSpeed = units[unitSystems[unitSel]].speed;
    unitsMass = units[unitSystems[unitSel]].mass;
    unitsForce = units[unitSystems[unitSel]].force;
    unitsAngle = units[unitSystems[unitSel]].angle;
    unitsWork = units[unitSystems[unitSel]].work;
    masslabel = units[unitSystems[unitSel]].masslabel;
    unitsTime = units[unitSystems[unitSel]].time;
    unitsAcceleration = units[unitSystems[unitSel]].acceleration;

    if (unitSel === 0 ){
        m = 5*math.randomInt(8,17);
        md = m;
        g = 9.81;
        ad = 0.25*math.randomInt(3,20);
    } else {
        W = 5*math.randomInt(20,45);
        md = W;
        g = 32.2;
        m = W/g;
        ad = 0.5*math.randomInt(1,21);
    }

    direction = math.randomInt(0,2) ? 1: -1;
    
    if (direction === 1) {
        directionLabel = "ascends";
    }
    else {
        directionLabel = "descends";
    }

    incDecr = math.randomInt(0,2) ? 1: -1;
    if (incDecr === 1) {
        incDecrLabel = "speeds up";
    } else {
        incDecrLabel = "slows down";
    }

    if (direction*incDecr > 0) {
        a = ad;
    } else {
        a = -ad;
    }

    N = m*g + m*a;
    

data = {
    params: { 
        md : md,
        ad: ad,
        masslabel: masslabel,
        directionLabel: directionLabel,
        incDecrLabel: incDecrLabel,
        unitsMass: unitsMass,
        unitsSpeed: unitsSpeed,
        unitsTime: unitsTime,
        unitsAcceleration: unitsAcceleration,
        unitsForce: unitsForce
    },
    correct_answers: {
        N: N
    },
    nDigits: 2,
    sigfigs: 2
}

console.log(data);
return data;
}

generate();

module.exports = {
    generate
}