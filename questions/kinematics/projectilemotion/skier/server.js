//const { data } = require('cheerio/lib/api/attributes.js');
const math = require('mathjs');
//const mathhelper = require('../../mathhelper.js');
//const mathhelper = require('../../helpers/mathhelper.js');

const generate = () => {

    unitSystems = ['si', "uscs"];
    masslabels = ["mass", "weight"];
    
    units = { 
        "si": { 
            "masslabel": "mass",
            "mass": "kg",
            "usualspeed": "kmph",
            "speed": "m/s",
            "dist": "m",
            "force": "N",
            "angle": "degrees",
            "work": "J"
        },
        "uscs": {
            "masslabel": "weight",
            "mass": "lb",
            "usualspeed": "mph",
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
    unitsUsualSpeed = units[unitSystems[unitSel]].usualspeed;
    unitsMass = units[unitSystems[unitSel]].mass;
    unitsForce = units[unitSystems[unitSel]].force;
    unitsAngle = units[unitSystems[unitSel]].angle;
    unitsWork = units[unitSystems[unitSel]].work;
    masslabel = units[unitSystems[unitSel]].masslabel;

    thetad = 5*math.randomInt(4,10);
    theta = thetad*math.pi/180;

    if ( unitSel === 0){
        H = math.randomInt(5,12);
        vd = math.randomInt(30, 65);
        v = vd*5/18;
        g = 9.81;
    } else {
        H = math.randomInt(15,51);
        vd = math.randomInt(25,45);
        v = vd*5280/3600;
        g = 32.2;
    }

    vx = v*math.cos(theta);
    vy = v*math.sin(theta);

    t = (math.sqrt( vy**2 + 2*g*H) - vy)/g;
    x = vx*t;

    L = math.round(math.random(0.4, 0.8)*x);

    xland = x - L;

data = {
    params: { 
        vd: vd,
        thetad: thetad,
        v: v,
        vx : vx,
        vy: vy,
        H: H,
        L: L, 
        unitsDist: unitsDist,
        unitsSpeed: unitsSpeed,
        unitsUsualSpeed: unitsUsualSpeed
    },
    correct_answers: {
        x: x,
        xland: xland,
        t: t
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