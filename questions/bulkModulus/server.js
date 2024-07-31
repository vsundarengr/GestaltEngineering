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
			"speed": "cm/s",
			"dist": "cm",
			"force": "N",
			"angle": "degrees",
			"density": " \\( kg/m^3 \\)",
			"volume": " \\( m^3 \\)",
			"power": "W",
			"gap": "mm",
			"viscosity": "Pa s",
			"bulkModulus": "GPa",
			"pressure": "kPa"
		},
		"uscs": {
			"masslabel": "weight",
			"mass": "lb",
			"speed": "inch/s",
			"dist": "in",
			"force": "lb",
			"angle": "degrees",
			"density": "\\( lb/ft^3 \\)",
			"volume": "\\( ft^3 \\)",
			"power": "hp",
			"gap": "inch",
			"viscosity": " \\( lb s /ft^2 \\)",
			"bulkModulus": "Mpsi",
			"pressure": "psi"
		}
	}
	


	fluidProperties = props.fluidProperties;
	fluidKeys = Object.keys(fluidProperties);
	numFluids = fluidKeys.length;
	console.log(`Fluid keys = ${fluidKeys}`);
	fluidIndex = math.randomInt(0,numFluids);
	fluid = fluidKeys[fluidIndex];
	

	

	unitSel = 0
	//unitSel = math.randomInt(0,2);
	unitsDist = units[unitSystems[unitSel]].dist;
	unitsSpeed = units[unitSystems[unitSel]].speed;
	unitsMass = units[unitSystems[unitSel]].mass;
	unitsForce = units[unitSystems[unitSel]].force;
	unitsAngle = units[unitSystems[unitSel]].angle;
	unitsVolume = units[unitSystems[unitSel]].volume;
	unitsDensity = units[unitSystems[unitSel]].density;
	unitsGap = units[unitSystems[unitSel]].gap;
	unitsPower = units[unitSystems[unitSel]].power;
	unitsViscosity = units[unitSystems[unitSel]].viscosity;
	unitsBulkModulus= units[unitSystems[unitSel]].bulkModulus;
	masslabel = units[unitSystems[unitSel]].masslabel;
	densitylabel = units[unitSystems[unitSel]].densitylabel;
	unitsPressure = units[unitSystems[unitSel]].pressure;

	fluidProperties = props.fluidProperties;
	fluidKeys = Object.keys(fluidProperties);
	numFluids = fluidKeys.length;
	console.log(`Fluid keys = ${fluidKeys}`);
	fluidIndex = math.randomInt(0,numFluids);
	fluidName = fluidKeys[fluidIndex];

	Kd = props.fluidProperties[fluidName].K;

	V = math.randomInt(5, 26);
	Pd = 100*math.randomInt(1,12);
	P = Pd*1e3;
	K = Kd*1e9;
	
	delV = P*V/K;
	Vnew = V - delV;


if (unitSel === 0) {

}
else {
	
}



data = {
    params: {
		P: Pd,
		K: Kd,
		V: V,
		fluidName: fluidName,
		unitsDist: unitsDist,
		unitsMass: unitsMass,
		unitsVolume: unitsVolume,
		masslabel: masslabel,
		unitsForce: unitsForce,
		unitsSpeed: unitsSpeed,
		unitsGap: unitsGap,
		unitsPower: unitsPower,
		unitsViscosity: unitsViscosity,
		unitsBulkModulus: unitsBulkModulus,
		unitsPressure: unitsPressure
    },
    correct_answers: {
		delV: delV,
		Vnew: Vnew
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