const math = require('mathjs');
const mathhelper = require('../../helpers/mathhelper.js');
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

	D = 2*math.randomInt(1,5);
	H = 5*math.randomInt(1,5);
	

	pd = math.round(100*math.random(0.2,0.9));
	p = pd/100;

	if ( unitSel === 0){ 
		rho = sg*1000;
	}
	else {
		rho = sg*62.4;
	}

	V = p*math.pi/4*D*D*H;
	m = rho*V;



data = {
    params: {
		fillFraction:pd,
		D: D,
		H: H,
		sg: sg,
		fluid: fluid,
		unitsDist: unitsDist,
		unitsMass: unitsMass,
		unitsVolume: unitsVolume,
		masslabel: masslabel
    },
    correct_answers: {
		mass: m,
		volume: V	
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