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
            "work": "J",
            "time": "minutes"
        },
        "uscs": {
            "masslabel": "weight",
            "mass": "lb",
            "speed": "mph",
            "dist": "ft",
            "force": "lb",
            "angle": "degrees",
            "work": "ft-lb",
            "time": "minutes"
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

    
    v1 = 4*math.randomInt(2,20);
    v2 = 2*math.randomInt(3,45);
    v3 = 3*math.randomInt(5,30);
    t1 = 2*math.randomInt(2,20);
    t2 = 3*math.randomInt(3,45);
    t3 = 5*math.randomInt(5,30);
    
    t = t1 + t2 + t3;
    va = (v1*t1 + v2*t2 + v3*t3)/t;

data = {
    params: { 
        v1: v1,
        v2: v2,
        v3: v3,
        t1 : t1,
        t2: t2,
        t3: t3,
        unitsSpeed: unitsSpeed,
        unitsTime: unitsTime
    },
    correct_answers: {
        va: va
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