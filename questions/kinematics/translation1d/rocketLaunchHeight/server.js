const math = require('mathjs');
const { UnitConverter } = require("./UnitConverter");

const generate = () => {
    const unitSystems = {
        si: {
            acceleration: '\\( m/s^2 \\)',
            distance: 'km',
            time: 's',
            gravity: -9.81 // Gravity in m/s²
        },
        uscs: {
            acceleration: '\\( ft/s^2 \\)',
            distance: 'miles',
            time: 's',
            gravity: -32.2 // Gravity in ft/s²
        }
    };
    const converter = new UnitConverter();

    // 1. Dynamic Parameter Selection
    const selectedSystem = math.randomInt(0, 2) === 0 ? 'si' : 'uscs';
    const units = unitSystems[selectedSystem];

    // 3. Value Generation
    const a1 = math.randomInt(20, 51); // Acceleration between 20 and 50 units
    const t1 = math.randomInt(10, 31); // Powered phase duration between 10 and 30 seconds
    const T = math.randomInt(t1 + 10, t1 + 31); // Total time between t1 + 10 and t1 + 30 seconds
    const a2 = units.gravity; // Acceleration due to gravity in system's unit

    // Conversion based on unit system

    // 4. Solution Synthesis
    // Calculate the distance traveled during the powered phase of flight.
    let deltaD1 = 0.5 * a1 * Math.pow(t1, 2);

    // Determine the final velocity of the rocket at the end of the powered phase.
    const Vf = a1 * t1;

    // Calculate the distance traveled during the next phase (T - t1 seconds).
    const t2 = T - t1;
    const deltaD2 = Vf * t2 + 0.5 * a2 * Math.pow(t2, 2);

    // Calculate the total height reached by the rocket.
    const deltaX = deltaD1 + deltaD2;

    // Convert to target distance unit if necessary
    let deltaX_converted = converter.convert(deltaX, selectedSystem === 'si' ? "m" : "ft", units.distance);

    // Return the structured data
    return {
        params: {
            a: a1,
            t1: t1,
            T: T,
            unitsAcc: units.acceleration,
            unitsDist: units.distance,
            unitsTime: units.time,
            gravity: a2
        },
        correct_answers: {
            h: math.round(deltaX_converted, 3) // Round to 3 decimal places
        },
        nDigits: 2,
        sigfigs: 2
    };
};

module.exports = {
    generate
};

console.log(generate())
