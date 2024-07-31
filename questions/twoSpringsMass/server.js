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
            "speed": "m/s",
            "dist": "m",
            "force": "N",
            "angle": "degrees",
            "work": "J",
            "springConst": "N/m",
            "springLength": "m"
        },
        "uscs": {
            "masslabel": "weight",
            "mass": "lb",
            "speed": "ft/s",
            "dist": "ft",
            "force": "lb",
            "angle": "degrees",
            "work": "ft-lb",
            "springConst": "lb/ft",
            "springLength": "ft"
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
    unitsSpringConst = units[unitSystems[unitSel]].springConst;
    unitsSpringLength = units[unitSystems[unitSel]].springLength;

kd = math.randomInt(5,25);
md = 0.5*math.randomInt(2,10);
b = math.randomInt(1,10)/10;
a = math.randomInt(1,10)/10;
L = math.sqrt(a*a + b*b);
L0 = math.round(10*math.random(0.6*b, 0.9*b))/10;

if (unitSel === 0) {
    m = md;
    k = kd;

} else {
    g = 32.2;
    m = md/g;
    k = kd;
}
d0 = L - L0;
db = b - L0;
v = math.sqrt(2*k/m*(d0*d0 - db*db));
console.log(`d0 = ${d0} and db = ${db} and L = ${L}`);

data = {
    params: { 
        springConst: kd,
        mass: md,
        a: a,
        b: b,
        L0: L0,
        masslabel: masslabel,
        unitsMass: unitsMass,
        unitsDist: unitsDist,
        unitsSpeed: unitsSpeed,
        unitsSpringConst: unitsSpringConst,
        unitsSpringLength: unitsSpringLength
    },
    correct_answers: {
        v: v
    },
    correct_answers_labels: {

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