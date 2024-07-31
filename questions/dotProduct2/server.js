const math = require('mathjs');
//const mathhelper = require('../../mathhelper.js');
const mathhelper = require('../../helpers/mathhelper.js');

const generate = () => {
	
	x1 = math.randomInt(-50,50);
	y1 = math.randomInt(-50,50);
	
	x2 = math.randomInt(-50,50);
	y2 = math.randomInt(-50,50);
	
	v1 = [x1,y1];
	v2 = [x2,y2];
	d = math.dot(v1,v2);
	ang = math.acos(d/(math.norm(v1)*math.norm(v2)))*180/math.pi;



data = {
    params: {
		x1: x1, 
		y1: y1,
		x2: x2,
		y2: y2
    },
    correct_answers: {
		dotp: d,
        angle: ang
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