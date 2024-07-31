//const { data } = require('cheerio/lib/api/attributes.js');
const math = require('mathjs');
const mathhelper = require('../../mathhelper.js');
//const mathhelper = require('../../helpers/mathhelper.js');

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

ang1 = 5*math.randomInt(4,15);
ang2 = 180 - 5*math.randomInt(21,30);

ang1rad = ang1*math.pi/180;
ang2rad = ang2*math.pi/180;

// for display
ang1d = 2*math.pi - ang1rad;
ang2d = 2*math.pi - ang2rad;
m = 5*math.randomInt(1,20);
if (unitSel === 0 ) {
    g = 9.81;
    W = m*g;
}
else {
    W = m;
}
TA = W*math.cos(ang2rad)/math.sin(ang1rad + ang2rad);
TB = W*math.cos(ang1rad)/math.sin(ang1rad + ang2rad);

data = {
    params: { 
        mass: m,
        angleA: ang1,
        angleB: ang2,
        unitsMass: unitsMass,
        unitsForce: unitsForce,
        masslabel: masslabel
    },
    correct_answers: {
        TA: TA,
        TB: TB
    },
    correct_answers_labels: {
        TA : "Tension in cable A",
        TB : "Tension in cable B",
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