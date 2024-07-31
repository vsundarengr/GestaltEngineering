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
            "speed": "m/s",
            "dist": "m",
            "force": "N",
            "angle": "degrees",
            "work": "J",
            "time": "seconds",
            "acceleration": "\\( m/s^2 \\)"
        },
        "uscs": {
            "masslabel": "weight",
            "mass": "lb",
            "speed": "ft/s",
            "dist": "ft",
            "force": "lb",
            "angle": "degrees",
            "work": "ft-lb",
            "time": "seconds",
            "acceleration": "\\( ft/s^2 \\)"
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
    unitsTime = units[unitSystems[unitSel]].time;
    unitsAcceleration = units[unitSystems[unitSel]].acceleration;

    angled1 = 5*math.randomInt(3,11);
    angle1 = angled1*math.pi/180;
    m = math.randomInt(5,51);

    if (unitSel === 0 ){
        g = 9.81;
    } else {
        g = 32.2;
    }

    AC = math.round(0.2*math.randomInt(4,15),2);
    BC = math.round(0.25*math.randomInt(8,15),2);
    AB = math.round(math.sqrt(AC**2 + BC**2 - 2*AC*BC*math.cos(angle1)),1);

    ang = math.acos((AC**2 + BC**2-AB**2)/(2*AC*BC));

    a = g*math.sin(ang);
    L = AC;
    v = math.sqrt(2*a*L);
    t = math.sqrt(2*L/a);

data = {
    params: { 
        AB: AB,
        BC: BC,
        AC: AC,
        m: m,
        masslabel: masslabel,
        unitsMass: unitsMass,
        unitsSpeed: unitsSpeed,
        unitsTime: unitsTime,
        unitsAcceleration: unitsAcceleration,
        unitsForce: unitsForce,
        unitsDist: unitsDist
    },
    correct_answers: {
        v: v,
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