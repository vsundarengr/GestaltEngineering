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
	
	//unitSel = 0;
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
	sgs = math.randomInt(20,80)/10;
	angled = math.randomInt(15,45);
	angle = angled*math.pi/180;

	if ( unitSel === 0){ 
		dd = 0.25*math.randomInt(6,16);
		Hd = 0.5*math.randomInt(6,20);
		d = dd/100; // convert from cm
		H = Hd/100;
		vol = math.pi/4*d*d*H;
		rho = sg*1000;
		rhos = sgs*1000;
		m = rhos*vol;
		
		g = 9.81;
		deltad = math.randomInt(1,10)/10;
		delta = deltad*1e-3;
		area = math.pi*d*H;
		mu = 5/100*math.randomInt(1,20);
		V = m*g*delta/(mu*area);
		V = V*100;
		Fb = rho*vol*g;
		Vb = (m*g-Fb)*delta/(mu*area);
		Vb = Vb*100;
	}
	else {
		dd = 0.25*math.randomInt(2,11);
		Hd = 0.5*math.randomInt(6,20);
		d = dd/12;
		H = Hd/12;
		vol = math.pi/4*d*d*H;
		rho = sg*62.4;
		rhos = sgs*62.4;
		m = rhos*vol;
		g = 1;
		deltad = math.randomInt(1,20)/200;
		delta = deltad/12;
		area = math.pi*d*H;;
		mu = 0.05*math.round(math.randomInt(1,20))*2e-2; 
		V = m*g*delta/(mu*area)*12;
		Fb = rho*vol*g;
		Vb = (m*g-Fb)*delta/(mu*area);
		Vb = Vb*12;
	}

data = {
    params: {
		mu: mu,
		d:dd,
		H: Hd,
		area: area,
		vol: vol,
		deltad: deltad,
		sg: sg,
		sgs: sgs,
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
		V: V,
		Vb: Vb
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