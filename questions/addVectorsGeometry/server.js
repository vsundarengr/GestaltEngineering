const math = require('mathjs');
const mathhelper = require('../../helpers/mathhelper.js');

const generate = () => {
	
	x1 = math.randomInt(-50,50);
	y1 = math.randomInt(-50,50);
	
	x2 = math.randomInt(-50,50);
	y2 = math.randomInt(-50,50);
	
	x = x1 + x2;
	y = y1 + y2;
	
	radius = math.sqrt( math.square(x) + math.square(y));
	angle =  math.atan2(y,x);
	
	if ( angle < 0) {
		angle = 2*Math.PI + angle;
	}
		
	
	console.log(`x = ${x}: y = ${y}`);
	console.log(`Radius is ${radius} and Angle is ${angle}`);


data = {
    params: {
		x1: x1, 
		y1: y1,
		x2: x2,
		y2: y2
    },
    correct_answers: {
		radius: radius,
        angle: angle},

    nDigits: 2,
    sigfigs:2
}

console.log(data);
return data;
}

module.exports = {
    generate
}