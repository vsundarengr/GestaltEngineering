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
            "angle": "degrees",
            "work": "J"
        },
        "uscs": {
            "masslabel": "weight",
            "mass": "lb",
            "speed": "mph",
            "dist": "ft",
            "force": "lb",
            "angle": "degrees",
            "work": "ft-lb"
        }
    }
    
    unitSel = math.randomInt(0,2);
    unitsDist = units[unitSystems[unitSel]].dist;
    unitsSpeed = units[unitSystems[unitSel]].speed;
    unitsMass = units[unitSystems[unitSel]].mass;
    unitsForce = units[unitSystems[unitSel]].force;
    unitsAngle = units[unitSystems[unitSel]].angle;
    unitsWork = units[unitSystems[unitSel]].work;
    masslabel = units[unitSystems[unitSel]].masslabel;

P = 5*math.randomInt(1,20);
m = math.randomInt(1,20);
d = math.round(10*math.random(-1,1))/10;
muk = math.round(100*math.random(0.2,0.7))/100;
theta = 5*math.randomInt(2,14);
thetarad = theta*math.pi/180;
let g;
if ( unitSel === 0) {
    g = 9.81;
}
else {
    g = 1;
}

W = m*g;

WP = P*math.cos(thetarad)*d;
WW = 0;
WN = 0;
Wf = (-1)*muk*(P*math.sin(thetarad) + W)*math.abs(d);

if ( d< 0 ){
    direction = 'left';
}
else {
    direction = "right";
}


data = {
    params: { 
        P: P,
        m: m,
        theta: theta,
        muk: muk,
        distance: math.abs(d),
        direction: direction,
        unitsForce: unitsForce,
        unitsDist: unitsDist,
        unitsWork: unitsWork,
        unitsMass: unitsMass,
        masslabel: masslabel,
    },
    correct_answers: {
        WP: WP,
        WW: WW,
        WN: WN,
        Wf: Wf

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