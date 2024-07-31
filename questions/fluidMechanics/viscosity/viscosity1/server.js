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
			"speed": "cm/s",
			"dist": "cm",
			"force": "N",
			"angle": "degrees",
			"density": " \\( kg/m^3 \\)",
			"volume": " \\( m^3/s \\)",
			"power": "W",
			"gap": "mm",
			"viscosity": "Pa s"
		},
		"uscs": {
			"masslabel": "weight",
			"mass": "lb",
			"speed": "inch/s",
			"dist": "in",
			"force": "lb",
			"angle": "degrees",
			"density": "\\( lb/ft^3 \\)",
			"volume": "\\( ft^3/s \\)",
			"power": "hp",
			"gap": "inch",
			"viscosity": " \\( lb \, s /ft^2 \\)"
		}
	}
	


	fluidProperties = props.fluidProperties;
	fluidKeys = Object.keys(fluidProperties);
	numFluids = fluidKeys.length;
	console.log(`Fluid keys = ${fluidKeys}`);
	fluidIndex = math.randomInt(0,numFluids);
	fluid = fluidKeys[fluidIndex];
	

	

	//unitSel = 1;
	unitSel = math.randomInt(0,2);
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
	masslabel = units[unitSystems[unitSel]].masslabel;
	densitylabel = units[unitSystems[unitSel]].densitylabel;


	ad = math.randomInt(5,20);
	bd = math.randomInt(5,20);
	

	if ( unitSel === 0){ 
		sg = fluidProperties[fluid].sg;
		rho = fluidProperties[fluid].rho;
		deltad = math.randomInt(3,16);
		delta = deltad/1000;
		mud = fluidProperties[fluid].mu;
		veld = 5*math.randomInt(1,25);
		vel = veld/100;
		a = ad*1e-2;
		b= bd*1e-2;
	}
	else {
		sg = fluidProperties[fluid].sg;
		rho = fluidProperties[fluid].rho;
		deltad = 1e-3*math.randomInt(3,16);
		delta = deltad/12;
		mud = fluidProperties[fluid].mu;
		veld = 5*math.randomInt(2,20);
		vel = veld/12;
		a = ad/12;
		b= bd/12;
	}
A = a*b;
F = mud*vel*A/delta;
P = F*vel;

if (unitSel === 0) {

}
else {
	P = P/550;
}

console.log(`Index = ${fluidIndex}: Fluid = ${fluid}, Specific Gravity = ${sg} `);

data = {
    params: {
		a: ad,
		b: bd,
		vel: veld,
		mud: mud,
		sg: sg,
		delta: deltad,
		fluid: fluid,
		unitsDist: unitsDist,
		unitsMass: unitsMass,
		unitsVolume: unitsVolume,
		masslabel: masslabel,
		unitsForce: unitsForce,
		unitsSpeed: unitsSpeed,
		unitsGap: unitsGap,
		unitsPower: unitsPower,
		unitsViscosity: unitsViscosity
    },
    correct_answers: {
		F : F,
		P:  P
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