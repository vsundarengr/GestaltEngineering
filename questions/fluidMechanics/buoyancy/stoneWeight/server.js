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
			"volume": "$m^3$"
		},
		"uscs": {
			"masslabel": "weight",
			"mass": "lb",
			"speed": "mph",
			"dist": "ft",
			"force": "lb",
			"angle": "degrees",
			"density": "$lb/ft^3$",
			"volume": "$ ft^3$"
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
	b = 0.25*math.randomInt(1,5);
	c = 0.25*math.randomInt(1,5);

	pd = math.round(100*math.random(0.2,0.9));
	p = pd/100;

	if ( unitSel === 0){ 
		rho = sg*1000;
		m = math.randomInt(50,101);
		g = 9.81;
		mb = math.round(m*math.random(0.65,0.85)); 
		rho_water = 1000;

	}
	else {
		rho = sg*62.4;
		m = math.randomInt(50,150);
		g = 1;
		mb = math.round(m*math.random(0.65,0.85)); 
		rho_water = 62.4;
	}
	Wm = m*g;
	Wb = mb*g;
	Fb = Wm - Wb;
	
	volume = Fb/(rho*g);
	densitystone = Wm/(volume*g);

	sgstone = densitystone/rho_water;



data = {
    params: {
		fillFraction:pd,
		Fb: Fb,
		m: m,
		mb: mb,
		sg: sg,
		fluid: fluid,
		unitsDist: unitsDist,
		unitsMass: unitsMass,
		unitsVolume: unitsVolume,
		masslabel: masslabel
    },
    correct_answers: {
		volume: volume,
		densitystone: densitystone,
		sgstone: sgstone	
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