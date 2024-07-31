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
mu = math.round(100*math.random(0.3,0.9))/100;
m = math.randomInt(5,50);
if (unitSel === 0 ) {
g = 9.81;
}
else {
    g = 1;
}
W = m*g;
thetarad = math.atan(1/(2*mu));
thetarad1 = 1.25*thetarad;
H = math.round(L*math.sin(thetarad1)*10)/10;
thetarad2 = math.asin(H/L);

Lp = math.round(L*math.random(0.2,0.8)*10)/10;
Wp = math.random(0.2,0.8)*W;

mp = math.round(Wp/g);


NB = (Wp*Lp/L + W/2)/math.tan(thetarad2);
NA = (W + Wp);
Ff = NB;

console.log(`theta = ${180/math.pi*thetarad},  theta1 = ${180/math.pi*thetarad2} and H = ${H} `);



data = {
    params: {
        masslabel: masslabel,
        unitsMass: unitsMass,
        unitsDist: unitsDist,
        unitsForce: unitsForce,
        L : L,
        Lp: Lp,
        mu: mu,
        mass: m,
        mp: mp,
        H:  H
    },
    correct_answers: {
       NA: NA,
       NB: NB,
       Ff: Ff
    },
    nDigits: 2,
    sigfigs: 2
}

console.log(data);
return data;
}

//generate();

module.exports = {
    generate
}