const math = require('mathjs');

function convertKmphToMs(speedKmph) {
    const conversionFactor = 5/18; // This factor converts km/h to m/s
    let speedMs = speedKmph * conversionFactor;
    return speedMs;
}

function convertMPHtoFts(speedMPH){
    const conversionFactor = 5280/3600; // This factor converts mph to ft/s
    let speedFts = speedMPH * conversionFactor;
    return speedFts;}

const generate = () => {
    // Define unit systems and their corresponding units
    const unitSystems = {
        si: {
            speed: "kmph",
            dist: "m",
            time: "s"
        },
        uscs: {
            speed: "mph",
            dist: "ft",
            time: "s"
        }
    };

    // Randomly select a unit system
    const unitSystemKeys = Object.keys(unitSystems);
    const selectedUnitSystem = unitSystems[unitSystemKeys[math.randomInt(0, unitSystemKeys.length)]];

    // Generate random values for initial speed, final speed, and distance
    const v1 = math.randomInt(20, 100); // Initial speed
    const v2 = math.randomInt(10, v1);  // Final speed (must be less than initial speed)
    const d = math.randomInt(100, 1000); // Distance

    // Unit Conversion
    // Conversion based on unit system
    let v1_converted;
    if (selectedUnitSystem.speed == "kmph"){
        v1_converted = convertKmphToMs(v1);
    } else if (selectedUnitSystem.speed == "mph"){
        v1_converted = convertMPHtoFts(v1);
    }

    // Conversion based on unit system
    let v2_converted;
    if (selectedUnitSystem.speed == "kmph"){
        v2_converted = convertKmphToMs(v2);
    } else if (selectedUnitSystem.speed == "mph"){
        v2_converted = convertMPHtoFts(v2);
    }

    // Calculate the time taken to reduce speed (assuming constant deceleration)
    // Using the formula: d = ((v1 + v2) / 2) * t
    const t = (2 * d) / (v1_converted + v2_converted);

    // Return the generated data
    return {
        params: {
            v1: v1,
            v2: v2,
            v1_converted: v1_converted,
            v2_converted: v2_converted,
            d: d,
            unitsSpeed: selectedUnitSystem.speed,
            unitsDist: selectedUnitSystem.dist,
            unitsTime: selectedUnitSystem.time
        },
        correct_answers: {
            t: t
        },
        nDigits: 3,
        sigfigs: 2
    };
};` `

module.exports = {
    generate
};