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
            "acceleration": "\\( m/s^2 \\)",
            "g": 9.81,
            "gc": 1
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
            "acceleration": "\\( ft/s^2 \\)",
            "g": 32.2,
            "gc": 32.2
        }
    }
    
    unitSel = math.randomInt(0,2);
    uts = units[unitSystems[unitSel]];
    unitsDist = units[unitSystems[unitSel]].dist;
    unitsSpeed = units[unitSystems[unitSel]].speed;
    unitsMass = units[unitSystems[unitSel]].mass;
    unitsForce = units[unitSystems[unitSel]].force;
    unitsAngle = units[unitSystems[unitSel]].angle;
    unitsWork = units[unitSystems[unitSel]].work;
    masslabel = units[unitSystems[unitSel]].masslabel;
    unitsTime = units[unitSystems[unitSel]].time;
    unitsAcc = units[unitSystems[unitSel]].acceleration;
    g = uts.g;
    gc = uts.gc;

    mA = 0.25*math.randomInt(4,12);
    mB = 0.5*math.randomInt(3,8);

    mus = math.round(0.01*math.randomInt(20,75),2);
    muk = math.round( mus*math.random(0.7,0.9),2);

    WA = mA/gc*g;
    WB = mB/gc*g;

    Pmin = mus*(WA + WB);
    
    P = math.round(math.random(1.1, 1.75)*Pmin);
    a = P/(mA/gc + mB/gc) - muk*g;

    F = mB/gc*(a + muk*g);

data = {
    params: { 
        P: P,
        mA: mA,
        mB: mB,
        mus: mus,
        muk: muk,
        masslabel: masslabel,
        unitsMass: unitsMass,
        unitsSpeed: unitsSpeed,
        unitsTime: unitsTime,
        unitsAcc: unitsAcc,
        unitsForce: unitsForce
    },
    correct_answers: {
        a: a,
        Pmin: Pmin,
        F: F
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