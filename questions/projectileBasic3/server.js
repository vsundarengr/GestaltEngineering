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
            "work": "J"
        },
        "uscs": {
            "masslabel": "weight",
            "mass": "lb",
            "speed": "ft/s",
            "dist": "ft",
            "force": "lb",
            "angle": "degrees",
            "work": "ft-lb"
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


v = 4*math.randomInt(2,10);
thetaang = 5*math.randomInt(3,15);
H  = 5*math.randomInt(5,15);

thetarad = thetaang*math.pi/180;

if ( unitSel === 0){
    g = 9.81;
} else {
    g = 32.2;
}

vx = v*math.cos(thetarad);
vy = v*math.sin(thetarad);

t1 = vy/g;
y = vy*t1 - 0.5*g*t1*t1;

t2 = math.sqrt(2*(y+H)/g);

t = t1 + t2;

R = vx*t;

vyf = g*t2;

vf = math.sqrt(vx*vx + vyf*vyf);

ang = math.atan(vyf/vx)*180/math.pi;

console.log(`t1 = ${t1}, t2 = ${t2} vyf = ${vyf}`);

data = {
    params: { 
        v : v,
        theta: thetaang,
        H: H,
        unitsDist: unitsDist,
        unitsSpeed: unitsSpeed
    },
    correct_answers: {
        vf: vf,
        ang: ang,
        t: t,
        y: y,
        R: R
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