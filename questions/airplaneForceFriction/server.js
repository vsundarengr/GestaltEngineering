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
            "mass": "tons",
            "speed": "kmph",
            "dist": "m",
            "force": "kN",
            "angle": "degrees",
            "work": "J"
        },
        "uscs": {
            "masslabel": "weight",
            "mass": "tons",
            "speed": "mph",
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

    t = math.randomInt(38,50);
    mur = 0.005*math.randomInt(2,10);

    if ( unitSel === 0){
        md = 5*math.randomInt(10,40);
        m = md*1000;
        g = 9.81;
        vd = 8*math.randomInt(28, 34);
        v = vd*5/18;
        a = v/t;
        Ff = mur*m*g;
        F = (m*a+mur*m*g)/1000;
    } else {
        md = 12*math.randomInt(10,40);
        g = 32.2;
        m = md*2000/g;
        vd = 5*math.randomInt(28, 34);
        v = vd*5280/3600;
        a = v/t;
        Ff = mur*m*g;
        F = m*a + Ff;
    }


data = {
    params: { 
        md: md,
        vd: vd,
        t: t,
        a: a,
        mur: mur,
        unitsMass: unitsMass,
        unitsSpeed: unitsSpeed,
        unitsForce: unitsForce,
        masslabel: masslabel
    },
    correct_answers: {
        F: F
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