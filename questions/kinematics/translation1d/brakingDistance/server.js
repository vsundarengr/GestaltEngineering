const { unit } = require("mathjs");

const generate = () => {
    const randomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    // Generate random values for initial speed (v1) and braking distance (d)
    const v1 = randomInt(50, 80); // Initial speed in selected unit
    const d = randomInt(50, 200); // Braking distance in selected unit

    // 1. Dynamic Parameter Selection:
    // Randomly select units for speed, distance, and time.
    const unitsSpeed = ['mph', 'kmph'];
    const unitsDist = ['feet', 'meters'];
    const unitsTime = ['seconds'];
    const unitsAcc = ['\( ft/s^2 \)', '\( m/s^2 \)'];

    // Randomly select a unit system for the problem.
    const speedSel = Math.floor(Math.random() * unitsSpeed.length)
    const selectedSpeedUnit = unitsSpeed[speedSel];
    const selectedDistUnit = unitsDist[Math.floor(Math.random() * unitsDist.length)];
    const selectedTimeUnit = unitsTime[0]; // Only one option available
    const selectedAcclUnit = unitsAcc[speedSel];

    // Conversion factors
    const mphToFeetPerSec = 5280 / 3600;
    const mphToMeterPerSec = 1609.344 / 3600;
    const kmhToMeterPerSec = 1000 / 3600;
    const kmhToFeetPerSec = 3280.8399 / 3600;

    // Convert speed to the appropriate unit
    const convertSpeed = (speed, unit_speed, unit_distance) => {
        let speed_converted;

        if (unit_speed === "mph" && unit_distance === "feet") {
            speed_converted = speed * mphToFeetPerSec;
        } else if (unit_speed === "mph" && unit_distance === "meters") {
            speed_converted = speed * mphToMeterPerSec;
        } else if (unit_speed === "kmph" && unit_distance === "feet") {
            speed_converted = speed * kmhToFeetPerSec;
        } else if (unit_speed === "kmph" && unit_distance === "meters") {
            speed_converted = speed * kmhToMeterPerSec;
        } else {
            speed_converted = speed;
        }

        return speed_converted;
    };

    
    let v1_converted = convertSpeed(v1, selectedSpeedUnit, selectedDistUnit);

    // Calculate the acceleration (a) and time (t)
    const a = -(v1_converted ** 2) / (2 * d); // Acceleration in m/s^2 (negative for deceleration)
    const t = -v1_converted / a; // Time in seconds

    // Return the problem data
    return {
        params: {
            v1: v1,
            v2: 0, // Final speed is 0 since the car comes to rest
            d: d,
            unitsSpeed: selectedSpeedUnit,
            unitsDistance: selectedDistUnit,
            unitsTime: selectedTimeUnit,
            unitsAcc: selectedAcclUnit
        },
        correct_answers: {
            t: t,
            a: a
        },
        nDigits: 3,
        sigfigs: 3
    };
};

module.exports = {
    generate
};
