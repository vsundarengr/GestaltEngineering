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
            "mass": "kg",
            "speed": "kmph",
            "dist": "m",
            "force": "N",
            "angle": "degrees"
        },
        "uscs": {
            "masslabel": "weight",
            "mass": "lb",
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


L = math.randomInt(4,10);
mu = math.round(100*math.random(0.2,0.9))/100;
m = math.randomInt(5,50);

thetarad = math.atan(1/(2*mu));
H = L*math.sin(thetarad);

console.log(`thetarad = ${thetarad} and H = ${H}`);



data = {
    params: {
        masslabel: masslabel,
        unitsMass: unitsMass,
        unitsDist: unitsDist,
        L : L,
        mu: mu,
        mass: m
    },
    correct_answers: {
       H: H
    },
    nDigits: 2,
    sigfigs: 2
}

console.log(data);
return data;
}

generate();

module.exports = {
    generate
}