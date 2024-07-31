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
            "springLength": "cm",
            "energy": "J"
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
            "springLength": "in",
            "energy": "ft-lb"
        }
    }
    
    unitSel = math.randomInt(0,2);
    unitsDist = units[unitSystems[unitSel]].dist;
    unitsSpeed = units[unitSystems[unitSel]].speed;
    unitsMass = units[unitSystems[unitSel]].mass;
    unitsForce = units[unitSystems[unitSel]].force;
    unitsAngle = units[unitSystems[unitSel]].angle;
    unitsWork = units[unitSystems[unitSel]].work;
    unitsEnergy = units[unitSystems[unitSel]].energy;
    masslabel = units[unitSystems[unitSel]].masslabel;
    unitsSpringConst = units[unitSystems[unitSel]].springConst;
    unitsSpringLength = units[unitSystems[unitSel]].springLength;

    l0d = math.randomInt(10,30);
    lid = math.random(0.2*l0d, 0.9*l0d);
    lid = math.round(lid*10)/10;
    lfd = math.random(0.2*l0d, 0.9*l0d);
    lfd = math.round(lfd*10)/10;
    md = 0.25*math.randomInt(1,8);
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



    
    l0 = l0d/convSprLength;
    li = lid/convSprLength;
    lf= lfd/convSprLength;
    k = kd*convSprLength;

    di= li - l0;
    df =lf - l0;

    E = 0.5*k*(df*df - di*di)

data = {
    params: { 
        l0d: l0d,
        lid: lid,
        lfd: lfd,
        k : kd,
        unitsDist: unitsDist,
        unitsEnergy: unitsEnergy,
        unitsSpringConst: unitsSpringConst,
        unitsSpringLength: unitsSpringLength,
        unitsMass: unitsMass,
        masslabel:masslabel
    },
    correct_answers: {
        E: E
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