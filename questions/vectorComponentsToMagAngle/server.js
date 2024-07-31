const math = require('mathjs');
const mathhelper = require('../../helpers/mathhelper.js');
//const mathhelper = require('../../mathhelper.js');

const generate = () => {
	
unitSystems = ['si', "uscs"];


units = { 
    "si": { 
        "masslabel": "mass",
        "mass": "kg",
        "speed": "kmph",
        "dist": "m",
        "force": "N",
        "angle": "degrees"
    },
    "uscs": {
        "masslabel": "weight",
        "mass": "lb",
        "speed": "mph",
        "dist": "ft",
        "force": "lb",
        "angle": "degrees"
    }
}

unitSel = math.randomInt(0,2);
unitsForce = units[unitSystems[unitSel]].force;
unitsAngle = units[unitSystems[unitSel]].angle;


fx = 10*math.randomInt(1,50);
fy = 10*math.randomInt(0,50);

signx = math.randomInt(0,2);
signy = math.randomInt(0,2);

if (signx === 1) {
    fx = -fx;
}
if (signy === 1) {
    fy = -fy;
}

ang = (180/math.pi)*math.atan2(fy,fx);

if ( ang < 0) {
    ang = 360 + ang;
}

Fmag = math.sqrt( fx*fx + fy*fy);

data = {
    params: {
	    fx :fx,
        fy: fy,
		unitsForce: unitsForce,
		unitsAngle: unitsAngle
    },
    correct_answers: {
        forcemag: Fmag,
        angle: ang
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