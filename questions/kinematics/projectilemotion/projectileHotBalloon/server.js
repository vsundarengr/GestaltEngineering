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

    if ( unitSel === 0){
        g = 9.81;
    } else {
        g = 32.2;
    }

H = 5*math.randomInt(6,25);
vy = 0.5*math.randomInt(2,12);
vx = 2*math.randomInt(5,16);


t = (math.sqrt(vy**2 + 2*g*H) - vy)/g;
vyf = -vy - g*t;
vf = math.sqrt(vx**2 + vyf**2);

L = vx*t;

data = {
    params: { 
        vx : vx,
        vy: vy,
        H: H,
        unitsDist: unitsDist,
        unitsSpeed: unitsSpeed
    },
    correct_answers: {
        t: t,
        L: L,
        vf: vf
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