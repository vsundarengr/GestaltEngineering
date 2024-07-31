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


	Fmag = 10*math.randomInt(10,50);
	ang = 5*math.randomInt(1,72);
	angrad = ang*math.pi/180;

	fx = Fmag*math.cos(angrad);
	fy = Fmag*math.sin(angrad);

data = {
    params: {
		Fmag: Fmag,
		angle: ang,
		unitsForce: unitsForce,
		unitsAngle: unitsAngle
    },
    correct_answers: {
		fx: fx,
		fy: fy
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