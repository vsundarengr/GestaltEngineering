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
            "acc": "\\( m/s^2 \\)"
        },
        "uscs": {
            "masslabel": "weight",
            "mass": "lb",
            "speed": "mph",
            "dist": "ft",
            "force": "lb",
            "angle": "degrees",
            "work": "ft-lb",
            "acc": "\\( ft/s^2 \\)"
        }
    }
    
    unitSel = math.randomInt(0,2);
    unitsDist = units[unitSystems[unitSel]].dist;
    unitsSpeed = units[unitSystems[unitSel]].speed;
    unitsMass = units[unitSystems[unitSel]].mass;
    unitsForce = units[unitSystems[unitSel]].force;
    unitsAngle = units[unitSystems[unitSel]].angle;
    unitsWork = units[unitSystems[unitSel]].work;
    unitsAcc = units[unitSystems[unitSel]].acc;
    masslabel = units[unitSystems[unitSel]].masslabel;


m = math.randomInt(1,20);
d = math.round(10*math.random(-1,1))/10;
muk = 0;
mus = 0;
// muk = math.round(100*math.random(0.2,0.7))/100;
// mus = math.round(100*1.2*muk)/100;
theta = 5*math.randomInt(2,14);
thetarad = theta*math.pi/180;
let g;
if ( unitSel === 0) {
    g = 9.81;
    gc = 1;
}
else {
    g = 32.2;
    gc = 32.2;
}

W = m/gc*g;
Pmin = 0;
Pmax = W/math.sin(thetarad);

P = math.randomInt(0.2*Pmax, 0.9*Pmax);
a = P/(m/gc)*(math.cos(thetarad) + muk*math.sin(thetarad)) - muk*g;
N = W - P*math.sin(thetarad);

WP = P*math.cos(thetarad)*d;
WW = 0;
WN = 0;
Wf = (-1)*muk*(W-P*math.sin(thetarad) )*math.abs(d);

if ( d< 0 ){
    direction = 'left';
}
else {
    direction = "right";
}


data = {
    params: { 
        P: P,
        m: m,
        theta: theta,
        muk: muk,
        mus: mus,
        distance: math.abs(d),
        direction: direction,
        unitsForce: unitsForce,
        unitsDist: unitsDist,
        unitsWork: unitsWork,
        unitsMass: unitsMass,
        unitsAcc: unitsAcc,
        masslabel: masslabel,
    },
    correct_answers: {
        WP: WP,
        WW: WW,
        WN: WN,
        Wf: Wf,
        Pmin: Pmin,
        Pmax: Pmax,
        a: a,
        N: N

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