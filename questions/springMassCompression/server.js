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
            "springConst": "N/cm",
            "springLength": "cm"
        },
        "uscs": {
            "masslabel": "weight",
            "mass": "lb",
            "speed": "ft/s",
            "dist": "ft",
            "force": "lb",
            "angle": "degrees",
            "work": "ft-lb",
            "springConst": "lb/in",
            "springLength": "in"
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
    unitsSpringConst = units[unitSystems[unitSel]].springConst;
    unitsSpringLength = units[unitSystems[unitSel]].springLength;

    H0d = math.randomInt(10,30);
    hd = math.random(0.4*H0d, 0.8*H0d);
    md = 0.25*math.randomInt(1,5);
    kd = math.randomInt(5,25);

    if (unitSel === 0) {
        convSprLength = 100;
        g = 9.81;
        m = md;
    } else {
        convSprLength = 12;
        g = 32.2;
        m = md/g;
    }

    
    H0 = H0d/convSprLength;
    h = hd/convSprLength;
    k = kd*convSprLength;

    delta = H0-h;

    H = 0.5*k*delta*delta/(m*g) + h;

data = {
    params: { 
        H0 : H0d,
        m : md,
        k : kd,
        H: math.round(H*10)/10,
        unitsDist: unitsDist,
        unitsSpringConst: unitsSpringConst,
        unitsSpringLength: unitsSpringLength,
        masslabel:masslabel,
        unitsMass: unitsMass
    },
    correct_answers: {
        h :h*convSprLength,
        delta: delta*convSprLength
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