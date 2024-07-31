const math = require('mathjs');

const generate = () => {
    // Define unit systems and their corresponding units
    const unitSystems = {
        'si': {
            'distance': 'meters',
            'speed': 'm/s',
            'time': 'seconds',
            'acceleration': '$m/s^2$'
        },
        'uscs': {
            'distance': 'feet',
            'speed': 'ft/s',
            'time': 'seconds',
            'acceleration': '$ft/s^2$'
        }
    };

    // Randomly select a unit system
    const unitSystemKeys = Object.keys(unitSystems);
    const selectedSystem = unitSystems[unitSystemKeys[math.randomInt(0, unitSystemKeys.length)]];

    // Generate random braking distance within a reasonable range
    const distance = math.randomInt(50, 200);

    // Convert 70 mph to the selected unit system's speed unit
    const initialSpeed = 70 * (selectedSystem.speed === 'm/s' ? 0.44704 : 1.46667);

    // Calculate deceleration using the formula v^2 = u^2 + 2as (where v = 0, u = initial speed, s = distance)
    const deceleration = -Math.pow(initialSpeed, 2) / (2 * distance);

    // Return the generated data
    data = {
        params: {
            distance: distance,
            unitsDistance: selectedSystem.distance,
            unitsAcceleration: selectedSystem.acceleration
        },
        correct_answers: {
            a: deceleration // Note: Rounding not yet implemented
        },
        nDigits: 2,
        sigfigs: 2
    };
    return data
};

module.exports = {
    generate
};