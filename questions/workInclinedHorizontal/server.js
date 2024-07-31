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


m = math.randomInt(1,20);
d = math.round(10*math.random(-1,1))/10;
theta = 5*math.randomInt(2,14);
thetarad = theta*math.pi/180;
mukmax = 1/math.tan(thetarad);
if (mukmax > 1) {
    mukmax = 1;
}
muk = math.round(100*math.random(0.4,0.8)*mukmax)/100;
//muk = math.round(100*math.random(0.2,0.7))/100;
mus = math.round(100*1.2*muk)/100;

let g;
if ( unitSel === 0) {
    g = 9.81;
}
else {
    g = 1;
}

W = m*g;

if ( d< 0 ){
    direction = 'down';
    Pmin = W*( math.sin(thetarad) -mus*math.cos(thetarad))/(math.cos(thetarad)+mus*math.sin(thetarad));
    P = math.randomInt(0.6*Pmin, 0.9*Pmin);
}
else {
    direction = "up";
    Pmin = W*(mus*math.cos(thetarad) + math.sin(thetarad))/(math.cos(thetarad)-mus*math.sin(thetarad));
    P = math.randomInt(1.2*Pmin, 2.5*Pmin);
}
console.log('Pmin = ', Pmin);
//Pmin = W*(mus*math.cos(thetarad) + math.sin(thetarad))/(math.cos(thetarad)-mus*math.sin(thetarad));

//Pmin = mus*W/(math.cos(thetarad) - mus*math.sin(thetarad));



WP = P*math.cos(thetarad)*d;
WW = (-1)*W*math.sin(thetarad)*d;
WN = 0;
Wf = (-1)*muk*(math.cos(thetarad)*W + P*math.sin(thetarad))*math.abs(d);




data = {
    params: { 
        P: P,
        m: m,
        theta: theta,
        muk: muk,
        mus: mus,
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