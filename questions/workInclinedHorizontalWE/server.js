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
            "work": "J"
        },
        "uscs": {
            "masslabel": "weight",
            "mass": "lb",
            "speed": "ft/s",
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


md = math.randomInt(1,20);
d = math.round(10*math.random(-1,1))/10;
theta = 5*math.randomInt(2,14);
thetarad = theta*math.pi/180;

if ( d < 0 ) {
    musmax = math.tan(thetarad);
} else {
    musmax = 1/math.tan(thetarad); 
}

if (musmax > 1) {
    musmax = 1;
}

mus = math.random(0.75*musmax, 0.9*musmax);
muk = math.round(100*math.random(0.5*mus, 0.9*mus))/100;
// muk = math.round(100*math.random(0.4,0.8)*mukmax)/100;
// //muk = math.round(100*math.random(0.2,0.7))/100;
// mus = math.round(100*1.2*muk)/100;


let g;
if ( unitSel === 0) {
    g = 9.81;
    m = md;
}
else {
    g = 32.2;
    m = md/g;

}

W = m*g;

if ( d< 0 ){
    direction = 'down';
    Pmin = W*( math.sin(thetarad) -mus*math.cos(thetarad))/(math.cos(thetarad)+mus*math.sin(thetarad));
    P = math.round(10*math.random(0.6*Pmin, 0.9*Pmin))/10;
}
else {
    direction = "up";
    Pmin = W*(mus*math.cos(thetarad) + math.sin(thetarad))/(math.cos(thetarad)-mus*math.sin(thetarad));
    P = math.round(10*math.random(1.2*Pmin, 2.5*Pmin))/10;
}
console.log('Pmin = ', Pmin);
//Pmin = W*(mus*math.cos(thetarad) + math.sin(thetarad))/(math.cos(thetarad)-mus*math.sin(thetarad));

//Pmin = mus*W/(math.cos(thetarad) - mus*math.sin(thetarad));

//P = math.randomInt(1.2*Pmin, 2.5*Pmin);
console.log(`Pmin = ${Pmin} and P = ${P}`);
WP = P*math.cos(thetarad)*d;
WW = (-1)*W*math.sin(thetarad)*d;
WN = 0;
Wf = (-1)*muk*(math.cos(thetarad)*W + P*math.sin(thetarad))*math.abs(d);
Wnet = WP + WW + WN + Wf;

if ( Wnet > 0) {
    v1 = 0.5*math.randomInt(1,8);
    v2 = math.sqrt(v1*v1 + 2*Wnet/m);
    console.log(`v1 = ${v1}, v2 = ${v2}`);
} else {
    v2i= 0.5*math.randomInt(1,8);   
    v1 = math.round(math.sqrt(v2i*v2i - 2*Wnet/m));
    v2 = math.sqrt(v1*v1 + 2*Wnet/m);
    console.log(`v2i = ${v2i}, v1 = ${v1}, v2 = ${v2}`);
}



data = {
    params: { 
        P: P,
        m: md,
        theta: theta,
        muk: muk,
        mus: mus,
        v1: v1,
        distance: math.abs(d),
        direction: direction,
        unitsForce: unitsForce,
        unitsSpeed: unitsSpeed,
        unitsDist: unitsDist,
        unitsWork: unitsWork,
        unitsMass: unitsMass,
        masslabel: masslabel,
    },
    correct_answers: {
        WP: WP,
        WW: WW,
        WN: WN,
        Wf: Wf,
        Wnet: Wnet,
        v2: v2
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