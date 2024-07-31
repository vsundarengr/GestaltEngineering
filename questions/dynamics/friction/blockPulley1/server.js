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
            "acc": "\\( m/s^2 \\)",
            "time": "s"
        },
        "uscs": {
            "masslabel": "weight",
            "mass": "lb",
            "speed": "ft/s",
            "dist": "ft",
            "force": "lb",
            "angle": "degrees",
            "work": "ft-lb",
            "acc": "\\( ft/s^2 \\)",
            "time": "s"
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
    unitsTime = units[unitSystems[unitSel]].time;


m1d = math.randomInt(2,20);
d = math.round(10*math.random(0.1,1))/10;
muk = math.round(100*math.random(0.2,0.7))/100;
mus = math.round(100*1.2*muk)/100;
m2min = mus*m1d;
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

a = (m2-muk*m1)*g/(m1 + m2);
T = m1*(a + muk*g);
time = 0.25*math.randomInt(2,11);
v = a*time;
x = 0.5*a*time*time;

console.log(`Acceleration ${a} and Tension is ${T}`);
WT1 = T*d;
WW1 = 0;
WT2 = -1*T*d;
WW2 = m2*g*d;
WN = 0;
Wf = (-1)*muk*m1*g*d;


data = {
    params: { 
        m1: m1d,
        m2: m2d, 
        muk: muk,
        mus: mus,
        time: time,
        distance: math.abs(d),
        unitsForce: unitsForce,
        unitsDist: unitsDist,
        unitsWork: unitsWork,
        unitsMass: unitsMass,
        unitsSpeed: unitsSpeed,
        unitsAcc: unitsAcc,
        unitsTime: unitsTime,
        masslabel: masslabel,
    },
    correct_answers: {
        a: a,
        T: T,
        v: v,
        x: x,
        WT1: WT1,
        WT2: WT2,
        WW1: WW1,
        WW2: WW2,
        WN: WN,
        Wf: Wf
    },
    nDigits: 2,
    sigfigs:2
}

console.log(data);
return data;
}

//generate();

module.exports = {
    generate
}