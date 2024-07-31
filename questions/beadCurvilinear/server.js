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
            "acc": "m/s^2"
        },
        "uscs": {
            "masslabel": "weight",
            "mass": "lb",
            "dist": "inch",
            "force": "lb",
            "angSpeed": "rpm",
            "angle": "degrees",
            "speed": "feet/s",
            "acc": "ft/s^2"
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

    rd = math.randomInt(5,12);
    angle = 5*math.randomInt(0,36);
    angrad = angle*math.pi/180;
    massd = 0.5*math.randomInt(1,10);
    T = math.randomInt(1,10);
    
    let g;
    if (unitSel === 0 ) {
        r = rd/100;
        g = 9.81;
        mass = massd;
    } else {
        r = rd/12;
        g = 32.2;
        mass = massd/g;
    }
    console.log(`r = ${r}, g = ${g}, angrad = ${angrad}`);
    vmax = math.sqrt(r*g*math.sin(angrad));
    v = 0.8*vmax;
    //v = math.sqrt( (T/mass + g*math.sin(angrad))*r);
    vd = math.round(v*100)/100;
    console.log(` Units: ${unitSel}, Rd = ${rd}, Angle = ${angle}, Mass = ${mass}, T = ${T}, v = ${v}, vd = ${vd}`);
    
    T = math.abs(mass*((-1)*vd*vd/r + g*math.sin(angrad)));
    at = math.abs(g*math.cos(angrad));
    ac = vd*vd/r;

    console.log(` Rd = ${rd}, Angle = ${angle}, Mass = ${mass}, T = ${T}, v = ${v}, vd = ${vd}, at = ${at}`);

data = {
    params: { 
        masslabel: masslabel,
        unitsDist: unitsDist,
        unitsMass: unitsMass,
        unitsSpeed: unitsSpeed,
        unitsForce: unitsForce,
        unitsAngSpeed: unitsAngSpeed,
        unitsAngle: unitsAngle,
        unitsAcc: unitsAcc,
        mass: massd,
        speed: vd,
        radius: rd,
        angle: angle
    },
    correct_answers: {
        T: T,
        at: at,
        ac: ac
    },
    correct_answers_labels: {
        T : "Normal force",
        at: "Tangential acceleration"
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