const math = require('mathjs');

const generate = () => {
    // Define unit systems and their corresponding units
    const units = {
        si: {
            mass: 'kg',
            dist: 'm',
            acceleration: 9.81, // Acceleration due to gravity in m/s^2 (SI units)
            time: 's',
            force: 'N',
            gc: 1
        },
        uscs: {
            mass: 'lb',
            dist: 'ft',
            acceleration: 32.2, // Acceleration due to gravity in ft/s^2 (USCS units)
            time: 's',
            force: 'lb',
            gc: 32.2
        }
    };

    // Randomly select a unit system
    const unitSystemKeys = Object.keys(units);
    const selectedUnitSystem = units[unitSystemKeys[math.randomInt(0, unitSystemKeys.length)]];

    // Generate random mass values within a reasonable range
    const minMass = 1; // Minimum mass
    const maxMass = 10; // Maximum mass
    const m1 = math.randomInt(minMass, maxMass);
    const m2 = m1 + math.randomInt(minMass, maxMass);

    // // Ensure m2 is always heavier than m1 for the problem to make sense
    // if (m1 >= m2) {
    //     m2 = m2 +  math.randomInt(1, 5); // Adjust m2 to be heavier
    // }

    // Generate a random time within a reasonable range
    const minTime = 0.5; // Minimum time in seconds
    const maxTime = 5; // Maximum time in seconds
    const time = parseFloat(math.random(minTime, maxTime).toFixed(2));

    // Calculate the acceleration of the system using the given formula
    const a = selectedUnitSystem.acceleration * ((m2 - m1) / (m1 + m2));

    // Calculate the distance traveled by mass 1 using the kinematic equation
    const deltaY = 0.5 * a * math.pow(time, 2);
    T = (m1/selectedUnitSystem.gc)*(selectedUnitSystem.acceleration + a);
    // Return the generated data
    return {
        params: {
            m1: m1,
            m2: m2,
            unitsForce: selectedUnitSystem.force,
            unitsMass: selectedUnitSystem.mass,
            unitsDist: selectedUnitSystem.dist,
            time: time,
            timeUnit: selectedUnitSystem.time
        },
        correct_answers: {
            h: deltaY,
            T: T
        },
        nDigits: 2,  // Define the number of digits after the decimal place.
        sigfigs: 2   // Define the number of significant figures for the answer.
    };
};

module.exports = {
    generate
};

console.log(generate())