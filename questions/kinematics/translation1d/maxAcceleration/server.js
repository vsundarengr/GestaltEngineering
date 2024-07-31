const math = require('mathjs');

const generate = () => {
    // Define unit systems and their corresponding units
    const units = {
        "si": {
            "acceleration": " $m/s^2$",
            "time": "s",
            "speed": "m/s"
        },
        "uscs": {
            "acceleration": "$ft/s^2$",
            "time": "s",
            "speed": "ft/s"
        }
    };

    // Randomly select a unit system
    const unitSystems = ['si', 'uscs'];
    const unitSystem = unitSystems[math.randomInt(0, unitSystems.length)];
    const selectedUnits = units[unitSystem];

    // Generate a random acceleration value
    const a = math.round(math.random(2, 10)); // Random acceleration between 2 and 10 units

    // Convert 60 mph to the unit system's speed unit
    const targetSpeedMph = 60;
    let targetSpeed;
    if (unitSystem === 'si') {
        targetSpeed = targetSpeedMph * 0.44704; // Convert mph to m/s
    } else {
        targetSpeed = targetSpeedMph * 0.44704 * 3.28084; // Convert mph to ft/s
    }

    // Calculate the time to reach 60 mph using the formula t = v/a
    const t = targetSpeed / a;

    // Return the generated data
    return {
        params: {
            a: a, // Round to 2 decimal places for display
            unitsAcceleration: selectedUnits.acceleration
        },
        correct_answers: {
            t: t // Round to 3 decimal places for the answer
        },
        nDigits: 3,
        sigfigs: 3
    };
};

module.exports = {
    generate
};