const math = require('mathjs');

function convertKmphToMs(speedKmph) {
    const conversionFactor = 0.277778; // This factor converts km/h to m/s
    let speedMs = speedKmph * conversionFactor;
    return speedMs;
}

function convertMPHtoFts(speedMPH){
    const conversionFactor = 1.46667; // This factor converts mph to ft/s
    let speedFts = speedMPH * conversionFactor;
    return speedFts;
}
const generate = () => {
    const unitSystems = {
        si: {
            speed: 'kmph',
            distance: 'm',
            time: 's'
        },
        uscs: {
            speed: 'mph',
            distance: 'ft',
            time: 's'
        }
    };

    // 1. Dynamic Parameter Selection
    const selectedSystem = math.randomInt(0, 2) === 0 ? 'si' : 'uscs';
    const units = unitSystems[selectedSystem];

    // 3. Value Generation
    const v = math.randomInt(10, 31); // velocity between 10 and 30 units
    const t = math.randomInt(1, 11); // time between 1 and 10 units

    // Conversion based on unit system
    let v_converted;
    if (units.speed == "kmph"){
        v_converted = convertKmphToMs(v);
    } else if (units.speed == "mph"){
        v_converted = convertMPHtoFts(v);
    }
    // 4. Solution Synthesis
    // Using the kinematic equation: d = v * t / 2 (since initial velocity is 0 and acceleration is constant)
    let d = (v_converted * t) / 2;
    d = math.round(d,2)

    // Return the structured data
    data= {
        params: {
            v: v, // Using converted velocity
            v_converted: v_converted,
            t: t,
            unitsSpeed: units.speed,
            unitsTime: units.time,
            unitsDistance: units.distance
        },
        correct_answers: {
            d: d
        },
        nDigits: 3,
        sigfigs: 2
    };
    console.log(data)
    return data
   
};

module.exports = {
    generate
};

//generate()