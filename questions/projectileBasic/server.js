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


v = 4*math.randomInt(2,10);
thetaang = 5*math.randomInt(3,15);
thetarad = thetaang*math.pi/180;

if ( unitSel === 0){
    g = 9.81;
} else {
    g = 32.2;
}

vx = v*math.cos(thetarad);
vy = v*math.sin(thetarad);

tf = 2*vy/g;

console.log(`tf = ${tf} `);

t = math.round(10*math.random()*tf)/10;

x = vx*t;
y = vy*t - 0.5*g*t*t;

vy = vy - g*t;





data = {
    params: { 
        v : v,
        theta: thetaang,
        t: t,
        unitsDist: unitsDist,
        unitsSpeed: unitsSpeed
    },
    correct_answers: {
        x: x,
        y: y,
        vx: vx,
        vy: vy
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