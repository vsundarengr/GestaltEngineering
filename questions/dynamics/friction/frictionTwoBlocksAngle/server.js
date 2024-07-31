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
    unitSel = 0;
    uts = units[unitSystems[unitSel]];
  //  unitSel = math.randomInt(0,2);
    unitsDist = units[unitSystems[unitSel]].dist;
    unitsSpeed = units[unitSystems[unitSel]].speed;
    unitsMass = units[unitSystems[unitSel]].mass;
    unitsForce = units[unitSystems[unitSel]].force;
    unitsAngle = units[unitSystems[unitSel]].angle;
    unitsWork = units[unitSystems[unitSel]].work;
    masslabel = units[unitSystems[unitSel]].masslabel;
    unitsTime = units[unitSystems[unitSel]].time;
    unitsAcceleration = units[unitSystems[unitSel]].acceleration;
    gc = uts.gc;
    g = uts.g;

    // let mA = 16, mB = 4, muA = 0.25, muB = 0.5, theta = 10;
    // let P = 70;
  
    mA = math.randomInt(15,25);
    mB = 0.5*math.randomInt(6,12);
    muA = math.round(0.01*math.randomInt(15,30),2);
    muB = math.round(0.01*math.randomInt(35,60),2);
    wA = mA/gc*g;
    wB = mB/gc*g;
    P = math.randomInt(10, 31) + math.round(muA*wA);
    theta = math.randomInt(5,20);
    thetarad = theta*math.pi/180;

    den = mA/gc*(math.cos(thetarad) + muB*math.sin(thetarad)) + mB/gc*(math.cos(thetarad) + muA*math.sin(thetarad));
    Tnum = mA/gc*muB*wB + mB/gc*(P-muA*wA);
    anum = (P-muA*wA)*(math.cos(thetarad) + muB*math.sin(thetarad)) + muB*wB*(math.cos(thetarad) + muA*math.sin(thetarad));
    T = Tnum/den;
    a = anum/den;
    Na = T*math.sin(thetarad) + wA;
    Nb = wB - T*math.sin(thetarad);
    Fa = muA*Na;
    Fb = muB*Nb;

data = {
    params: { 
        masslabel: masslabel,
        mA: mA,
        mB: mB,
        theta: theta,
        muA: muA,
        muB: muB,
        P: P,
        unitsMass: unitsMass,
        unitsSpeed: unitsSpeed,
        unitsTime: unitsTime,
        unitsAcceleration: unitsAcceleration,
        unitsForce: unitsForce
    },
    correct_answers: {
       T: T,
       a: a,
       Na: Na,
       Nb: Nb,
       Fa: Fa,
       Fb: Fb
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