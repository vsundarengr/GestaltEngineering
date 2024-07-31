const math = require('mathjs');
const mathhelper = require('../../helpers/mathhelper.js');
//const mathhelper = require('../../mathhelper.js');

const generate = () => {
	
	unitSystems = ['si', "uscs"];
	masslabels = ["mass", "weight"];
	densitylabels = ['density', 'specific weight'];
	acclabels = ['accelerates', 'decelerates' ];
	slopelabels = ['up','down'];
	
	units = { 
		"si": { 
			"masslabel": "mass",
			"mass": "kg",
			"speed": "kmph",
			"dist": "m",
			"cardim": "m",
			"force": "N",
			"angle": "degrees",
			"density": "$kg/m^3$",
			"volume": "$m^3/s$",
			"acceleration": "$m/s^2 $"
		},
		"uscs": {
			"masslabel": "weight",
			"mass": "lb",
			"speed": "mph",
			"dist": "ft",
			"cardim": "inches",
			"force": "lb",
			"angle": "degrees",
			"density": "$lb/ft^3$",
			"volume": "$ ft^3/s $",
			"acceleration": "$ ft/s^2 $"
		}
	}
	
	cars = {
		"civic": {
			wt: 3000,
			L: 108,
			B: 60,
			H: 55.7
		},
		"accord": {
			wt: 3280,
			L: 114,
			B: 63,
			H: 57
		},
		"odyssey": {
			wt: 4600,
			L: 118,
			B: 67,
			H: 70
		},
		"pilot": {
			wt: 4200,
			L: 114,
			B: 67.5,
			H: 71
		},
		"s2000": {
			wt: 2755,
			L: 95,
			B: 58,
			H: 51
		},
		"f150": {
			wt: 4680,
			L: 145,
			B: 70,
			H: 76
		},
		"passat": {
			wt: 3379,
			L: 110,
			B: 61,
			H: 59
		}
	}

	carKeys = Object.keys(cars);
	numCars = carKeys.length;
	
	carIndex = math.randomInt(0,numCars);
	car = carKeys[carIndex];

	Ld = cars[car].L;
	Bd = cars[car].B;
	H = cars[car].H;
	wt = cars[car].wt;
	console.log(`Index = ${carIndex}: Car = ${car} `);

	unitSel = math.randomInt(0,2);
	unitsDist = units[unitSystems[unitSel]].dist;
	unitsSpeed = units[unitSystems[unitSel]].speed;
	unitsMass = units[unitSystems[unitSel]].mass;
	unitsForce = units[unitSystems[unitSel]].force;
	unitsAngle = units[unitSystems[unitSel]].angle;
	unitsVolume = units[unitSystems[unitSel]].volume;
	unitsDensity = units[unitSystems[unitSel]].density;
	unitsCarDim = units[unitSystems[unitSel]].cardim;

	masslabel = units[unitSystems[unitSel]].masslabel;

	// thetad = 2*math.randomInt(1,10);
	// thetarad = thetad*math.pi/180;
	thetad = 0;
	thetarad = 0;
	wtDist = math.randomInt(35,65);
	hd = math.round(math.random(0.25,0.35)*H*10)/10;

	wtm = math.randomInt(1,4)*math.randomInt(80,200);
	wt = wt + wtm;

	if ( unitSel === 0){ 
		g = 9.81;
		md = math.round(wt/2.205);
		m = md;
		W = m*g;
		Ld = math.round(Ld*0.0254*10)/10;
		Bd = math.round(Bd*0.0254*10)/10;
		hd = math.round(hd*0.0254*100)/100;
		Lf = wtDist/100*Ld;
		Lr = Ld - Lf;
		h  = hd;
		L = Ld;
		B = Bd;
		R = 5*math.randomInt(10,50);
	}
	else {
		W = wt;
		g = 32.2;
		m = W/g;
		md = wt;
		L = Ld/12;
		B = Bd/12;
		h = hd/12;
		Lf = wtDist/100*L;
		Lr = L - Lf;
		R = 5*math.randomInt(30,200);
	}

	
	vmax = math.sqrt(g*R*B/(2*h));
	v = math.random(0.2,0.9)*vmax;

	if (unitSel === 0) {
		vd = math.round(v*3600/1000);
		v = vd*1000/3600;
		vmax = vmax*3600/1000;

	} else {
		vd = math.round(v*3600/5280);
		v = vd*5280/3600;
		vmax = vmax*3600/5280;
	}

	N = m*g*math.cos(thetarad) + m*v*v/R*math.sin(thetarad);
	Ft = m*v*v/R*math.cos(thetarad) - m*g*math.sin(thetarad);
	console.log(`N = ${N}, Ft = ${Ft}`);

	Ni = 1/2*(N-Ft*(2*h)/B);
	No = 1/2*(N+Ft*(2*h)/B);

data = {
    params: {
		md: md,
		L : Ld,
		B: Bd,
		h: hd,
		vd: vd,
		R: R,
		thetad: thetad,
		unitsDist: unitsDist,
		unitsCarDim: unitsCarDim,
		unitsMass: unitsMass,
		unitsForce: unitsForce,
		masslabel: masslabel,
		unitsSpeed: unitsSpeed,
    },
    correct_answers: {
		vmax: vmax,
		Ni: Ni,
		No: No
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