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
            "speed": "m/s",
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
            "speed": "ft/s",
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
    unitsDist = units[unitSystems[unitSel]].dist;
    unitsSpeed = units[unitSystems[unitSel]].speed;
    unitsMass = units[unitSystems[unitSel]].mass;
    unitsForce = units[unitSystems[unitSel]].force;
    unitsAngle = units[unitSystems[unitSel]].angle;
    unitsWork = units[unitSystems[unitSel]].work;
    masslabel = units[unitSystems[unitSel]].masslabel;
    unitsTime = units[unitSystems[unitSel]].time;
    unitsAcceleration = units[unitSystems[unitSel]].acceleration;
    g = units[unitSystems[unitSel]].g;
    gc = units[unitSystems[unitSel]].gc;

    mA = math.randomInt(15,25);
    mB = 0.5*math.randomInt(6,12);
    // muA = 0;
    // muB = 0;
    muA = math.round(0.01*math.randomInt(35,60),2);
    muB = math.round(0.01*math.randomInt(15,30),2);
   
    wA = mA/gc*g;
    wB = mB/gc*g;
    acc = 0.2*math.randomInt(3,14);
    P1 = muA*(wA+wB) + 2*muB*wB + (wA + wB)/gc*acc;
    P = math.ceil(P1);
  //  P = math.randomInt(10, 31);
    a = (P-2*muB*wB)/((mA+mB)/gc) - muA*g;
    T = mB/gc*(a + muB*g);
    

data = {
    params: { 
        mA: mA,
        mB: mB,
        muA: muA,
        muB: muB,
        P: P,
        masslabel: masslabel,
        unitsMass: unitsMass,
        unitsSpeed: unitsSpeed,
        unitsTime: unitsTime,
        unitsAcceleration: unitsAcceleration,
        unitsForce: unitsForce
    },
    correct_answers: {
        a: a,
        T: T
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