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
            "angle": "degrees"
        },
        "uscs": {
            "masslabel": "weight",
            "mass": "lb",
            "dist": "inches",
            "force": "lb",
            "angSpeed": "rpm",
            "angle": "degrees"
        }
    }
    
    unitSel = math.randomInt(0,2);
    unitsDist = units[unitSystems[unitSel]].dist;
    unitsSpeed = units[unitSystems[unitSel]].speed;
    unitsMass = units[unitSystems[unitSel]].mass;
    unitsForce = units[unitSystems[unitSel]].force;
    unitsAngSpeed = units[unitSystems[unitSel]].angSpeed;
    unitsAngle = units[unitSystems[unitSel]].angle;
    masslabel = units[unitSystems[unitSel]].masslabel;


    mass = 0.5*math.randomInt(1,10);
    Ld = math.randomInt(60,120);
    angle = 5*math.randomInt(2,15);
    angrad = angle*math.pi/180;
   
   
    
    if (unitSel === 0 ){
        g = 9.81;
        gc = 9.81;
        L = 0.01*Ld;
        omega = math.sqrt(g/(L*math.cos(angrad)));
        console.log(`Omega = ${omega} Angle = ${angle} Angrad = ${angrad}`);
        angSpeed = math.ceil(omega);
        omega = angSpeed;
    } else{
        g = 32.2;
        gc = 1;
        L = Ld/12; // convert to feet
        omega = math.sqrt(g/(L*math.cos(angrad)));
        console.log(`Omega = ${omega} Angle = ${angle} Angrad = ${angrad}`);
        rpm = omega*60/(2*math.pi);
        angSpeed = math.ceil(rpm);
        omega = angSpeed*2*math.pi/60;
    }
    
    angrad = math.acos(g/(omega*omega*L));
    angle = angrad*180/math.pi;
    T = (mass*gc)/math.cos(angrad);

    console.log(`Omega = ${omega}, L = ${L}, angrad = ${angrad} angle = ${angle}`);

data = {
    params: { 
        masslabel: masslabel,
        unitsDist: unitsDist,
        unitsMass: unitsMass,
        unitsSpeed: unitsSpeed,
        unitsForce: unitsForce,
        unitsAngSpeed: unitsAngSpeed,
        unitsAngle: unitsAngle,
        mass: mass,
        angSpeed: angSpeed,
        Ld: Ld
    },
    correct_answers: {
        angle: angle,
        tension: T
    },
    correct_answers_label: {
        angle: "Angle"
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