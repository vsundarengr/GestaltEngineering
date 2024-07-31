const math = require('mathjs');

function convertMPHtoFts(speedMPH) {
    const conversionFactor = 5280 / 3600; // This factor converts mph to ft/s
    return speedMPH * conversionFactor;
}

function convertKmphToMs(speedKmph) {
    const conversionFactor = 1000 / 3600; // This factor converts km/h to m/s
    return speedKmph * conversionFactor;
}

const generate = () => {
    const unitSystems = {
        si: {
            speed: 'km/h',
            deceleration: 'm/s²',
            distance: 'm'
        },
        uscs: {
            speed: 'mph',
            deceleration: 'ft/s²',
            distance: 'ft'
        }
    };

    // 1. Dynamic Parameter Selection
    const selectedSystem = math.randomInt(0, 2) === 0 ? 'si' : 'uscs';
    const units = unitSystems[selectedSystem];

    // 3. Value Generation
    const speed = math.randomInt(30, 121); // initial speed between 30 and 120 units
    const deceleration = math.randomInt(5, 16); // deceleration between 5 and 15 units

    // Conversion based on unit system
    let speed_converted;
    if (units.speed === "km/h") {
        speed_converted = convertKmphToMs(speed);
    } else if (units.speed === "mph") {
        speed_converted = convertMPHtoFts(speed);
    }

    // 4. Solution Synthesis
    // Using the kinematic equation: Δx = -(v^2) / (2 * a)
    const stoppingDistance = math.abs(-(Math.pow(speed_converted, 2)) / (2 * deceleration));

    // Return the structured data
    return {
        params: {
            speed: speed,
            deceleration: deceleration,
            unitsSpeed: units.speed,
            unitsDeceleration: units.deceleration,
            unitsDistance: units.distance
        },
        correct_answers: {
            d: math.round(stoppingDistance, 3) // Round to 3 decimal places
        },
        nDigits: 2,
        sigfigs: 2
    };
};

module.exports = {
    generate
};

const results = generate();
console.log(results);