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
			"mass": "tons",
			"speed": "kmph",
			"dist": "m",
			"force": "N",
			"angle": "degrees",
			"density": "$kg/m^3$",
			"volume": "$m^3/s$"
		},
		"uscs": {
			"masslabel": "weight",
			"mass": "tons",
			"speed": "mph",
			"dist": "ft",
			"force": "lb",
			"angle": "degrees",
			"density": "$lb/ft^3$",
			"volume": "$ ft^3/s $"
		}
	}
	
	sg = 1.025;
	unitSel = 1;
	//unitSel = math.randomInt(0,2);
	unitsDist = units[unitSystems[unitSel]].dist;
	unitsSpeed = units[unitSystems[unitSel]].speed;
	unitsMass = units[unitSystems[unitSel]].mass;
	unitsForce = units[unitSystems[unitSel]].force;
	unitsAngle = units[unitSystems[unitSel]].angle;
	unitsVolume = units[unitSystems[unitSel]].volume;
	unitsDensity = units[unitSystems[unitSel]].density;

	masslabel = units[unitSystems[unitSel]].masslabel;
	densitylabel = units[unitSystems[unitSel]].densitylabel;

	a = math.randomInt(15, 40);
	b = math.randomInt(10, 15);
	h = math.randomInt(4,9);



	if ( unitSel === 0){ 
		rho = sg*1000;
		V = a*b*h;
		c = h*math.randomInt(15, 30)/10;
		g = 9.81;
		mdisp = rho*V;
		mbarge = math.round(mdisp*math.random(0.3,0.5)/1000);
		mcargo = mdisp - mbarge*1000;
		mcargo = mcargo/1000;
	}
	else {
		rho = sg*62.4;
		a = a*3;
		b = b*3;
		h = h*3;
		c = h*math.randomInt(15, 30)/10;
		V = a*b*h;
		g = 1;
		mdisp = rho*V*g;
		mbarge = math.round(mdisp*math.random(0.3,0.5)/2000)*2000;
		mcargo = mdisp - mbarge;
		mbarge = mbarge/2000;
		mcargo = mcargo/2000;
	}

data = {
    params: {
		mbarge: mbarge,
		a: a,
		b: b,
		c:c,
		h: h,
		sg: sg,
		fluid: "sea water",
		unitsDist: unitsDist,
		unitsMass: unitsMass,
		unitsVolume: unitsVolume,
		masslabel: masslabel
    },
    correct_answers: {
		mcargo: mcargo
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