const math = require('mathjs');
const mathhelper = require('../../helpers/mathhelper.js');

const generate = () => {
	
	x = math.randomInt(1,50);
	y = math.randomInt(1,50);
	
	radius = math.sqrt( math.square(x) + math.square(y));
	angle =  math.atan2(y,x);
	
	if ( angle < 0) {
		angle = 2*Math.PI - angle;
	}
		
	
	console.log(`x = ${x}: y = ${y}`);
	console.log(`Radius is ${radius} and Angle is ${angle}`);


data = {
    params: {
		x: x, 
		y: y
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