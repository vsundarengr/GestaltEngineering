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
            "speed": "kmph",
            "dist": "m",
            "force": "N",
            "angle": "degrees",
            "work": "J",
            "time": "seconds"
        },
        "uscs": {
            "masslabel": "weight",
            "mass": "lb",
            "speed": "mph",
            "dist": "ft",
            "force": "lb",
            "angle": "degrees",
            "work": "ft-lb",
            "time": "seconds"
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

    
    v1d = 2*math.randomInt(2,20);
    v2d = 5*math.randomInt(2,20);
    t1 = 2*math.randomInt(5,10);
    t2 = 2*math.randomInt(4,8);
    t3 = 5*math.randomInt(5,15);

    if (unitSel === 0) {
        v1 = v1d*1000/3600;
        v2 = v2d*1000/3600;
    } else {
        v1 = v1d*5280/3600;
        v2 = v2d*5280/3600;
    }


    x1 = v1/2*t1;
    x2 = (v1 + v2)/2*t2;
    x3 = v2*t3;

    va = (x1+x2+x3)/(t1+t2+t3);

    if (unitSel === 0 ){
        vad = va*3600/1000;
    } else {
        vad = va*3600/5280;
    }


data = {
    params: { 
        v1: v1d,
        v2: v2d,
        t1 : t1,
        t2: t2,
        t3: t3,
        unitsSpeed: unitsSpeed,
        unitsTime: unitsTime
    },
    correct_answers: {
        va: vad
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