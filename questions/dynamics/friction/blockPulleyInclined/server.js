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
            "acc": "\\( m/s^2\\)"
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
    masslabel = units[unitSystems[unitSel]].masslabel;
    unitsAcc = units[unitSystems[unitSel]].acc;


m1d = math.randomInt(1,20);
d = math.round(10*math.random(0.1,1))/10;
muk = math.round(100*math.random(0.2,0.7))/100;
mus = math.round(100*1.2*muk)/100;
theta = 5*math.randomInt(2,14);
thetarad = theta*math.pi/180;

m2min = m1d*(math.sin(thetarad) + mus*math.cos(thetarad));
m2d = math.round(math.random(1.2*m2min, 2.5*m2min));
let g;
if ( unitSel === 0) {
    g = 9.81;
    m1 = m1d;
    m2 = m2d;
}
else {
    g = 32.2;
    m1 = m1d/g;
    m2 = m2d/g;
}

a = (m2-m1*(math.sin(thetarad) + muk*math.cos(thetarad)))*g/(m1 + m2);
T = m2*(g -a);
console.log(`Acceleration ${a} and Tension is ${T}`);
WT1 = T*d;
WW1 = -m1*g*math.sin(thetarad)*d;
WT2 = -1*T*d;
WW2 = m2*g*d;
WN = 0;
Wf = (-1)*muk*m1*g*math.cos(thetarad)*d;

data = {
    params: { 
        m1: m1d,
        m2: m2d, 
        muk: muk,
        mus: mus,
        theta: theta,
        distance: math.abs(d),
        unitsForce: unitsForce,
        unitsDist: unitsDist,
        unitsWork: unitsWork,
        unitsMass: unitsMass,
        masslabel: masslabel,
        unitsAcc: unitsAcc
    },
    correct_answers: {
        WT1: WT1,
        WT2: WT2,
        WW1: WW1,
        WW2: WW2,
        WN: WN,
        Wf: Wf,
        T: T,
        a: a
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