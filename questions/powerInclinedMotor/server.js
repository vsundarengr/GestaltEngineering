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
            "speed": "m/s",
            "dist": "m",
            "force": "N",
            "angle": "degrees",
            "work": "J",
            "power": "kW"
        },
        "uscs": {
            "masslabel": "weight",
            "mass": "lb",
            "speed": "ft/s",
            "dist": "ft",
            "force": "lb",
            "angle": "degrees",
            "work": "ft-lb",
            "power": "hp"
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


m = 10*math.randomInt(5,20);
d = math.round(10*math.random(-1,1))/10;
muk = math.round(100*math.random(0.2,0.7))/100;
mus = math.round(100*1.2*muk)/100;
theta = 5*math.randomInt(2,10);
thetarad = theta*math.pi/180;
phi = 5*math.randomInt(1,5);
phirad = phi*math.pi/180;
acc = math.randomInt(0,3);
vd = math.randomInt(1,20)/10;
let g;
if ( unitSel === 0) {
    g = 9.81;
    gc = 1;
}
else {
    g = 1;
    gc = 32.2;
    
}

W = m*g;

T = (W*(math.sin(phirad) + muk*math.cos(phirad)) + m/gc*acc)/( math.cos(thetarad + phirad) + muk*math.sin(thetarad + phirad));
console.log(` Term 1 = ${W*(math.sin(phirad) + muk*math.cos(phirad))}`);
console.log(` Term 2 = ${m/gc*acc}`);
console.log(`Numerator = ${W*(math.sin(phirad) + muk*math.cos(phirad)) + m/gc*acc}`);
console.log(`Denominator = ${math.cos(thetarad + phirad) + muk*math.sin(thetarad + phirad)}`);
N = W*math.cos(phirad) - T*math.sin(phirad + thetarad);
P = T*vd;
Pw = (W*math.sin(phirad))*vd;
Pf =  muk*N*vd;

console.log(`T = ${T}, N = ${N}, W = ${W}, phi = ${phirad}, theta = ${thetarad}`);

if ( acc > 0 ) {
    accString = `with constant acceleration of ${acc}`;
}
else if (acc < 0 ) {
    accString = `with constant deceleration of ${acc}`;
} else if (acc === 0) {
    accString = `at constant speed`;
}



data = {
    params: { 
        m: m,
        theta: theta,
        phi: phi,
        muk: muk,
        mus: mus,
        vd: vd,
        acc: acc,
        unitsForce: unitsForce,
        unitsDist: unitsDist,
        unitsWork: unitsWork,
        unitsMass: unitsMass,
        masslabel: masslabel,
        accString: accString
    },
    correct_answers: {
        P: P,
        Pw: Pw,
        Pf: Pf

    },
    nDigits: 2,
    sigfigs:2
}

console.log(data);
return data;
}

generate();

module.exports = {
    generate
}