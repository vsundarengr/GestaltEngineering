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

if ( unitSel === 0){
    g = 9.81;
} else {
    g = 32.2;
}

umin = math.sqrt(2*H*g);
ut = math.random(1.25,2.5)*umin;
dt1 = 2*math.sqrt((ut*ut)/(g*g) - (2*H/g));
dt = math.round(dt1*10)/10;

u = math.sqrt(g*g*(dt/2)*(dt/2) + 2*g*H);
console.log(`g = ${g} : H = ${H} : ut = ${ut}: dt = ${dt}`);

data = {
    params: { 
        H: H,
        dt: dt,
        unitsDist: unitsDist,
        unitsSpeed: unitsSpeed
    },
    correct_answers: {
        u : u
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