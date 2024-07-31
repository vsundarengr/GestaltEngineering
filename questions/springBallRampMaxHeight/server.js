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
            "springConst": "N/mm",
            "springLength": "mm"
        },
        "uscs": {
            "masslabel": "weight",
            "mass": "lb",
            "speed": "ft/s",
            "dist": "ft",
            "force": "lb",
            "angle": "degrees",
            "work": "ft-lb",
            "springConst": "lb/in",
            "springLength": "in"
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
H = math.randomInt(5,20);
md = 0.5*math.randomInt(2,10);
R = 0.5*math.randomInt(4,16);

if ( unitSel === 0 ) {
    convSpringLength = 1000;
    k = kd*1000;
    g = 9.81;
    m = md;
}
else {
    convSpringLength = 12;
    k = kd*12;
    g = 32.2;
    m = md/32.2;
}

delta1 = math.sqrt(2*m*g*H/k);
delta2 = math.sqrt(2/k*(m*g*H + 0.5*m*g*R));

defld = 10*math.round(100*math.random(0.25*delta1, 0.9*delta2)); // not enough velocity to go up the ramp

if (unitSel === 0) {
    defl = defld/1000; // convert to m
}
else {
    defld = math.round(10*defld/25.4)/10;
    defl = defld/12;
}

L0 = math.round(math.random(defld*1.2, defld*1.5));
Lf = math.round(10*(L0 - defld))/10;

h = 0.5*k*defl*defl/(m*g);




data = {
    params: { 
        k: kd,
        H: H,
        R: R,
        mass: md,
        defl: defld,
        L0: L0,
        Lf: Lf,
        unitsSpringLength: unitsSpringLength,
        unitsSpringConst: unitsSpringConst,
        unitsDist: unitsDist,
        unitsMass: unitsMass,
        masslabel: masslabel
    },
    correct_answers: {
        delta1: delta1*convSpringLength,
        delta2: delta2*convSpringLength,
        h: h
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