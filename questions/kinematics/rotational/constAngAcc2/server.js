//const { data } = require('cheerio/lib/api/attributes.js');
const math = require('mathjs');
//const mathhelper = require('../../mathhelper.js');
//const mathhelper = require('../../helpers/mathhelper.js');

const generate = () =>{

    unitSystems = ['si', "uscs"];
    masslabels = ["mass", "weight"];
    
    units = { 
        "si": { 
            "masslabel": "mass",
            "angspeed": "rpm",
            "angacc": "\\( rad/s^2 \\)",
            "mass": "kg",
            "speed": "kmph",
            "time": "s",
            "dist": "m",
            "force": "N",
            "angle": "degrees",
            "work": "J",
            "acc": "\\( m/s^2 \\)"
        },
        "uscs": {
            "masslabel": "weight",
            "angspeed": "rpm",
            "angacc": "\\( rad/s^2 \\)",
            "mass": "lb",
            "time": "s",
            "speed": "mph",
            "dist": "ft",
            "force": "lb",
            "angle": "degrees",
            "work": "ft-lb",
            "acc": "\\( ft/s^2 \\)"
        }
    }
    
    unitSel = math.randomInt(0,2);
    uts = units[unitSystems[unitSel]];
    unitsAngSpeed = uts.angspeed;
    unitsTime = uts.time;
    unitsAngAcc = uts.angacc;

    omega1rpm = 5*math.randomInt(20,100);
    omega2rpm = 5*math.randomInt(150,250);
    time = math.randomInt(5,26);

    omega1 = omega1rpm*2*math.pi/60;
    omega2 = omega2rpm*2*math.pi/60;

    alpha = (omega2-omega1)/time;
    dtheta = (omega1+omega2)/2*time;
    angdisp = dtheta/(2*math.pi);


    data = {
        params: {
            omega1rpm: omega1rpm,
            omega2rpm: omega2rpm,
            time: time,
            unitsAngSpeed: unitsAngSpeed,
            unitsAngAcc: unitsAngAcc,
            unitsTime: unitsTime

        },
        correct_answers: {
            alpha: alpha,
            angdisp: angdisp
        },
        nDigits: 2,
        sigfigs: 2
    }

    console.log('DATA IS ', data);
    return data;

   

}

generate();

module.exports = {
    generate
}