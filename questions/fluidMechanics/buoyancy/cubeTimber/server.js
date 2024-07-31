const math = require('mathjs');
//const mathhelper = require('../../helpers/mathhelper.js');
//const mathhelper = require('../../mathhelper.js');
const props  = require('./properties.js');

const generate = () => {
	
	unitSystems = ['si', "uscs"];
	masslabels = ["mass", "weight"];
	densitylabels = ['density', 'specific weight'];
	
	units = { 
		"si": { 
			"masslabel": "mass",
			"mass": "kg",
			"speed": "kmph",
			"dist": "m",
			"force": "N",
			"angle": "degrees",
			"density": "$kg/m^3$",
			"volume": "$m^3/s$"
		},
		"uscs": {
			"masslabel": "weight",
			"mass": "lb",
			"speed": "mph",
			"dist": "ft",
			"force": "lb",
			"angle": "degrees",
			"density": "$lb/ft^3$",
			"volume": "$ ft^3/s $"
		}
	}
	


	fluidProperties = props.fluidProperties;
	
	fluidKeys = Object.keys(fluidProperties);
	numFluids = fluidKeys.length;
	
	console.log(`Fluid keys = ${fluidKeys}`);

	fluidIndex = math.randomInt(0,numFluids);
	fluid = fluidKeys[fluidIndex];
	sg = fluidProperties[fluid].sg;


	console.log(`Index = ${fluidIndex}: Fluid = ${fluid}, Specific Gravity = ${sg} `);

	unitSel = math.randomInt(0,2);
	unitsDist = units[unitSystems[unitSel]].dist;
	unitsSpeed = units[unitSystems[unitSel]].speed;
	unitsMass = units[unitSystems[unitSel]].mass;
	unitsForce = units[unitSystems[unitSel]].force;
	unitsAngle = units[unitSystems[unitSel]].angle;
	unitsVolume = units[unitSystems[unitSel]].volume;
	unitsDensity = units[unitSystems[unitSel]].density;

	masslabel = units[unitSystems[unitSel]].masslabel;
	densitylabel = units[unitSystems[unitSel]].densitylabel;

	a = 0.25*math.randomInt(1,5);
	sg1 = math.round(100*math.random(0.4,0.9)*sg)/100;
	submergedDepth = a*sg1/sg;



data = {
    params: {
		a: a,
		sg1: sg1,
		sg: sg,
		fluid: fluid,
		unitsDist: unitsDist,
		unitsMass: unitsMass,
		unitsVolume: unitsVolume,
		masslabel: masslabel
    },
    correct_answers: {
		submergedDepth: submergedDepth	
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