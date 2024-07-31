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
            "dist": "cm",
            "force": "N",
            "angSpeed": "rad/s",
            "angle": "degrees",
            "speed": "m/s",
            "acc": "m/s^2",
            "moment": "N-cm"
        },
        "uscs": {
            "masslabel": "weight",
            "mass": "lb",
            "dist": "inch",
            "force": "lb",
            "angSpeed": "rpm",
            "angle": "degrees",
            "speed": "feet/s",
            "acc": "ft/s^2",
            "moment": "lb-in"
        }
    }
    
    unitSel = math.randomInt(0,2);
    unitsDist = units[unitSystems[unitSel]].dist;
    unitsSpeed = units[unitSystems[unitSel]].speed;
    unitsMass = units[unitSystems[unitSel]].mass;
    unitsForce = units[unitSystems[unitSel]].force;
    unitsAngSpeed = units[unitSystems[unitSel]].angSpeed;
    unitsAngle = units[unitSystems[unitSel]].angle;
    unitsAcc = units[unitSystems[unitSel]].acc;
    masslabel = units[unitSystems[unitSel]].masslabel;
    unitsMoment = units[unitSystems[unitSel]].moment;

let x1 = 0;
let x2 = 0;
let y1 = 0;
let y2 = 0;
let z1 = 0;
let z2 = 0;

Fmag = 5*math.randomInt(10,50);


while (x1 === 0 && x2 === 0 && y1 === 0 && y2 === 0 && z1 === 0 && z2 === 0) {
    x1 = math.randomInt(-10,10);
    y1 = math.randomInt(-10,10);
    x2 = math.randomInt(-10,10);
    y2 = math.randomInt(-10,10);
    z1 = math.randomInt(-10,10);
    z2 = math.randomInt(-10,10);
}

z1 = 0;
z2 = 0;

x = x2 - x1;
y = y2 - y1;
z = z2 - z1;
len = math.sqrt(x*x + y*y + z*z);

ux = x/len;
uy = y/len;
uz = z/len;

unitVec = [ux,uy,uz];
F = math.multiply(Fmag, unitVec);

r = [x1,y1,z1];

M = math.cross(r,F);



data = {
    params: { 
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        z1: z1,
        z2: z2,
        Fmag: Fmag,
        unitsForce: unitsForce,
        unitsMoment: unitsMoment,
        unitsDist: unitsDist
    },
    correct_answers: {
        Fx: F[0],
        Fy: F[1],
        Fz: F[2],
        Mx: M[0],
        My: M[1],
        Mz: M[2]
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