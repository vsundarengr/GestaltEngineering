//const { data } = require('cheerio/lib/api/attributes.js');
const math = require('mathjs');
//const mathhelper = require('../../mathhelper.js');
const mathhelper = require('../../helpers/mathhelper.js');

const generate = () => {

unitSystems = ['si', "uscs"];
masslabels = ["mass", "weight"];

units = { 
    "si": { 
        "masslabel": "mass",
        "mass": "tons",
        "speed": "kmph",
        "dist": "m",
        "force": "N",
        "angle": "degrees"
    },
    "uscs": {
        "masslabel": "weight",
        "mass": "tons",
        "speed": "mph",
        "dist": "ft",
        "force": "lb",
        "angle": "degrees"
    }
}

unitSel = math.randomInt(0,2);
unitsDist = units[unitSystems[unitSel]].dist;
unitsSpeed = units[unitSystems[unitSel]].speed;
unitsMass = units[unitSystems[unitSel]].mass;
unitsForce = units[unitSystems[unitSel]].force;
unitsAngle = units[unitSystems[unitSel]].angle;
masslabel = units[unitSystems[unitSel]].masslabel;


mass = math.randomInt(50,100);
vd = 10*math.randomInt(20,50)
g = 9.81;
gc = 32.2;
angle = math.randomInt(15,40);
angrad = angle*math.pi/180;

if (unitSel === 0) {
    g = 9.81;
    gc = 9.81;
    v = vd*1000/3600;
    m = 1000*mass;
} else {
    gc = 1;
    g = 32.2;
    v = vd*5280/3600;
    m = 2000*mass/g;
}

R = v*v/(g*math.tan(angrad));
Rd = math.round(R/100)*100;

angle1 = math.atan(v*v/(Rd*g));
lift = m*g/math.cos(angle1);
angle = angle1*180/math.pi;
console.log(`R = ${R}, v = ${v}`);


const data = {
    params: {
        masslabel: masslabel,
        unitsDist: unitsDist,
        unitsMass: unitsMass,
        unitsSpeed: unitsSpeed,
        unitsForce: unitsForce,
        unitsAngle: unitsAngle,
        mass : mass,
        radius: Rd,
        speed: vd
    },
    correct_answers: {
        angle: angle,
        lift: lift
    },
    correct_answers_labels: {
        angle: "Angle",
        lift: "Lift"
    },
    nDigits: 2,
    sigfigs: 2
}

console.log('DATA IS ', data);
return data;

}

//generate();

module.exports = {
    generate
}