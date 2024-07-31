const math = require('mathjs');

function convertKmphToMs(speedKmph) {
    const conversionFactor = 0.277778; // This factor converts km/h to m/s
    let speedMs = Math.round(100*speedKmph * conversionFactor)/100;
    return speedMs;
}

function convertMPHtoFts(speedMPH){
    const conversionFactor = 1.46667; // This factor converts mph to ft/s
    let speedFts = Math.round(100*speedMPH * conversionFactor)/100;
    return speedFts;
}

const generate = () => {
    const unitSystems = {
        si: {
            speed: 'kmph',
            time: 's',
            acceleration: '$ m/s^2 $'
        },
        uscs: {
            speed: 'mph',
            time: 's',
            acceleration: '$ ft/s^2 $'
        }
    };
    
    // Randomly select a unit system (SI or USC)
    const unitSystemKeys = Object.keys(unitSystems);
    const selectedUnitSystem = unitSystems[unitSystemKeys[math.randomInt(0, unitSystemKeys.length)]];
    
    // Generate random values for velocity (v) and time (t)
    let v = math.randomInt(10, 31); // Random velocity between 10 and 30 units
    const t = math.randomInt(1, 11);  // Random time between 1 and 10 units
    
    // Conversion based on unit system
    let v_converted;
    if (selectedUnitSystem.speed == "kmph"){
        v_converted = convertKmphToMs(v);
    } else if (selectedUnitSystem.speed == "mph"){
        v_converted = convertMPHtoFts(v);
    }

    // Calculate acceleration (a = v / t)
    const a = v_converted / t;

    // Round the acceleration to the desired number of significant figures
    const sigfigs = 2;
    const roundedAcceleration = math.round(a, sigfigs);

    data = {
        params: {
            v: v,
            t: t,
            v_converted:v_converted,
            unitsSpeed: selectedUnitSystem.speed,
            unitsTime: selectedUnitSystem.time,
            unitsAcceleration: selectedUnitSystem.acceleration
        },
        correct_answers: {
            a: roundedAcceleration
        },
        nDigits: 2,  // Define the number of digits after the decimal place.
        sigfigs: sigfigs   // Define the number of significant figures for the answer.
    };
    console.log(data)
    return data
};
module.exports = {
    generate
};

