const math = require('mathjs');
const mathhelper = require('../../helpers/mathhelper.js');

const generate = () => {
	
	radius = math.randomInt(1, 50);
	angle = 5*math.randomInt(0,71);
	anglerad = angle*math.pi/180;
	x = radius*math.cos(anglerad);
	y = radius*math.sin(anglerad);
	
	
console.log(`Radius is ${radius} and Angle is ${angle}`);
console.log(`x = ${x}: y = ${y}`);

data = {
    params: {
        radius: radius,
        angle: angle
    },
    correct_answers: {x: x, y: y},

    nDigits: 2,
    sigfigs:2
}

console.log(data);
return data;
}

module.exports = {
    generate
}