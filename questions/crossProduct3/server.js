const math = require('mathjs');
//const mathhelper = require('../../mathhelper.js');
const mathhelper = require('../../helpers/mathhelper.js');

const generate = () => {
	
	x1 = math.randomInt(-50,50);
	y1 = math.randomInt(-50,50);
	z1 = math.randomInt(-50,50);
	
	x2 = math.randomInt(-50,50);
	y2 = math.randomInt(-50,50);
	z2 = math.randomInt(-50,50);
	
	v1 = [x1,y1,z1];
	v2 = [x2,y2,z2];
	v = math.cross(v1,v2);

	F = math.norm(v);


data = {
    params: {
		x1: x1, 
		y1: y1,
		z1: z1,
		x2: x2,
		y2: y2,
		z2: z2
    },
    correct_answers: {
		x: v[0],
		y: v[1],
		z: v[2],
		mag: F
	},

    nDigits: 2,
    sigfigs:2
}

console.log(data);
return data;
}

module.exports = {
    generate
}