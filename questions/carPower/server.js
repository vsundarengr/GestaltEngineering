//const { data } = require('cheerio/lib/api/attributes.js');
const { cos } = require('mathjs');
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
        "b": "\( N s^2/m^2 \)",
        "work": "kJ",
        "power": "kW",
        "HV": "MJ/kg"
    },
    "uscs": {
        "masslabel": "weight",
        "mass": "lb",
        "speed": "mph",
        "dist": "ft",
        "force": "lb",
        "b": "\( lb s^2/ ft^2 \)",
        "work": "ft-lb",
        "power": "hp",
        "HV": "BTU/lb"
    }
}

unitSel = math.randomInt(0,2);
unitsDist = units[unitSystems[unitSel]].dist;
unitsSpeed = units[unitSystems[unitSel]].speed;
unitsMass = units[unitSystems[unitSel]].mass;
unitsForce = units[unitSystems[unitSel]].force;
unitsHV = units[unitSystems[unitSel]].HV;
unitsWork = units[unitSystems[unitSel]].work;
unitsPower = units[unitSystems[unitSel]].power;
masslabel = units[unitSystems[unitSel]].masslabel;


m = 10*math.randomInt(100,150);
v = math.randomInt(30, 120);
mur = math.randomInt(10,25)/1000;

rho = math.random(1.2, 1.3);
Cd = math.random(0.27, 0.35);
A = math.random(2.2*1.3, 2.7*1.5);
theta = math.randomInt(-10,10);
thetarad = theta*math.pi/180;
hvd = math.randomInt(45, 50);
hv = hvd*1000000;
g = 9.81;
gc = 32.2;

if (unitSel === 0) {
    g = 9.81;
    gc = 1;
    vd = v;
    v = v*1000/3600;
    b = 1/2*rho*Cd*A;
    W = m*g;
  
} else {
    gc = 32.2;
    g = 1;
    vd = math.round(v/1.6);
    rho = rho*62.4/1000;
    A = A*3.3*3.3; // convert meter square to feet
    v = vd*5280/3600;
    m = math.round(2.205*m);
    b = 1/2*rho*Cd*A;
    W = m*g;
    hv = (1.005*hv/1000)*1/2.2045;
    hvd = math.round(hv);
    hv = hv*778;
}

console.log(`Cd = ${Cd}, rho = ${rho}, A = ${A}, v = ${v}`);
b = math.round(100*b)/100;
N = W*math.cos(thetarad);
Fr = mur*N;
Fd = b*v*v;
Fw = W*math.sin(thetarad);
F = Fr + Fd + Fw;

Pr = Fr*v; // Power to overcome rolling resistance
Pd = Fd*v; // power to overcome drag
Pw = Fw*v; // power to overcome gravity
P = F*v;
effp = math.round(100*math.random(0.2,0.3));
eff = effp/100;
Pin = P/eff;
mf = Pin/hv;
mf60 = mf*60;
if (unitSel === 1) {
    Pr = Pr/550;
    Pd = Pd/550;
    Pw = Pw/550;
    P = P/550;
    Pin = Pin/550;
    
}

console.log(`eff = ${eff} P = ${Pin} mf60 = ${mf60}`);

if ( theta > 0 ){
    slopephrase = `up a sloped road of angle ${theta}`;
} else if (theta < 0) {
    slopephrase = `down an inclined road of angle ${math.abs(theta)}`;
} else {
    slopephrase = `on a level road`;
}

const data = {
    params: {
        masslabel: masslabel,
        unitsDist: unitsDist,
        unitsMass: unitsMass,
        unitsSpeed: unitsSpeed,
        unitsForce: unitsForce,
        unitsHV: unitsHV,
        unitsPower: unitsPower,
        unitsWork: unitsWork,
        mass : m,
        speed: vd,
        mur: mur,
        hv: hvd,
        effp: effp,
        b : b,
        theta: theta,
        slopephrase: slopephrase
    },
    correct_answers: {
        Pr: Pr,
        Pd: Pd,
        Pw: Pw,
        P: P,
        Pin: Pin,
        mf: mf,
        mf60: mf60
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