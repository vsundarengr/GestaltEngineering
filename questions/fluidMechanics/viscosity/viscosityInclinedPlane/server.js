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
			"viscosity": "Pa s",
			"area": "\\( m^2 \\)"
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
			"viscosity": " \\( lb-s /ft^2 \\)",
			"area": " \\( ft^2 \\)"
		}
	}
	
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
	unitsArea = units[unitSystems[unitSel]].area;


	sg = math.randomInt(70,85)/100;
	angled = math.randomInt(15,45);
	angle = angled*math.pi/180;

	if ( unitSel === 0){ 
		m = math.randomInt(10, 40);
		g = 9.81;
		deltad = math.randomInt(1,10)/10;
		delta = deltad*1e-3;
		area = 5/100*math.randomInt(1,15);
		mu = 5/100*math.randomInt(1,20);
		V = m*g*math.sin(angle)*delta/(mu*area);
		V = V*100;
	}
	else {
		m = math.randomInt(10,40);
		g = 1;
		deltad = math.randomInt(1,20)/200;
		delta = deltad/12;
		area = 0.05*math.randomInt(1,15);
		mu = 0.05*math.randomInt(1,20)*2e-2; 
		V = m*g*math.sin(angle)*delta/(mu*area)*12;
	}

data = {
    params: {
		mu: mu,
		area: area,
		m: m,
		angled: angled,
		deltad: deltad,
		fluid: "lubricant",
		unitsDist: unitsDist,
		unitsMass: unitsMass,
		unitsVolume: unitsVolume,
		masslabel: masslabel,
		unitsForce: unitsForce,
		unitsSpeed: unitsSpeed,
		unitsGap: unitsGap,
		unitsPower: unitsPower,
		unitsViscosity: unitsViscosity,
		unitsArea: unitsArea
    },
    correct_answers: {
		V: V
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