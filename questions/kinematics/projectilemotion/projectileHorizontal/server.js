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


H  = 5*math.randomInt(5,15);
vx = 4*math.randomInt(2,10);
if ( unitSel === 0){
    g = 9.81;
} else {
    g = 32.2;
}

t = math.sqrt(2*H/g);
R = vx*t;
vy = g*t;
v = math.sqrt(vx*vx + vy*vy);
angle = math.atan(vy/vx) * 180/math.pi;

data = {
    params: { 
        H : H,
        vx: vx,
        unitsDist: unitsDist,
        unitsSpeed: unitsSpeed
    },
    correct_answers: {
        t: t,
        R: R,
        v: v,
        angle: angle
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