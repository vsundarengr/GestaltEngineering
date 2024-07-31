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
        "force": "N"
    },
    "uscs": {
        "masslabel": "weight",
        "mass": "lb",
        "speed": "mph",
        "dist": "ft",
        "force": "lb"
    }
}

unitSel = math.randomInt(0,2);
unitsDist = units[unitSystems[unitSel]].dist;
unitsSpeed = units[unitSystems[unitSel]].speed;
unitsMass = units[unitSystems[unitSel]].mass;
unitsForce = units[unitSystems[unitSel]].force;

masslabel = units[unitSystems[unitSel]].masslabel;


m = 10*math.randomInt(100,150);
mu = math.round(100*math.random(0.5, 0.9))/100;
R = math.randomInt(50,100);
g = 9.81;
gc = 32.2;

if (unitSel === 0) {
    g = 9.81;
    gc = 1;
    v = math.sqrt(mu*R*g);
    vd = math.round(v*3600/1000);
} else {
    gc = 32.2;
    g = 1;
    m = math.round(2.205*m);
    R = math.round(R*3.2804);
    v = math.sqrt(mu*R*gc);
    vd = math.round(v*3600/5280);

}


Ff = mu*m*g;
N = m*g;
console.log(`m= ${m}, v = ${v}, mu = ${mu}, R = ${R}, Ff = ${Ff}, N = ${N} `);


const data = {
    params: {
        masslabel: masslabel,
        unitsDist: unitsDist,
        unitsMass: unitsMass,
        unitsSpeed: unitsSpeed,
        unitsForce: unitsForce,
        mass : m,
        radius: R,
        mu: mu
    },
    correct_answers: {
        Ff: Ff,
        speed: vd,
        N: N
    },
    correct_answers_labels: {
        Ff: "Friction",
        speed: "Max speed",
        N: "Normal force"
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