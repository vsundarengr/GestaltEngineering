const { unit } = require("mathjs");

const generate = () => {
    // External Data Integration:
    // Placeholder values for the example, in a real scenario these would be imported or dynamically generated.

    // 1. Dynamic Parameter Selection:
    // Randomly select units for speed, distance, and time.
    const unitsSpeed = ['mph', 'kmph'];
    const unitsDist = ['feet', 'meters'];
    const unitsTime = ['seconds'];

    // Randomly select a unit system for the problem.
    const selectedSpeedUnit = unitsSpeed[Math.floor(Math.random() * unitsSpeed.length)];
    const selectedDistUnit = unitsDist[Math.floor(Math.random() * unitsDist.length)];
    const selectedTimeUnit = unitsTime[Math.floor(Math.random() * unitsTime.length)];

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

    // 3. Value Generation:
    // Generate random values for initial speed and braking distance
    const initialSpeed = Math.round((Math.random() * (100 - 20) + 20),3); // Random speed between 20 and 100
    const brakingDistance = Math.round(Math.random() * (500 - 100) + 100,3); // Random distance between 100 and 500
    const time = Math.round((Math.random() * 2 + 1) * 100) / 100; // Given time in seconds between 1-3 and up to 3 decimals

    // 4. Solution Synthesis:
    // Unit Conversion to Appropriate Units 
    const converted_speed = convertSpeed(initialSpeed, selectedSpeedUnit,selectedDistUnit);

    // Calculate deceleration using the formula a = -(V_0^2) / (2 * Δx)
    const deceleration = -(converted_speed ** 2) / (2 * brakingDistance);

    // Calculate the distance traveled in 1.5 seconds using Δx = V_0 * t + (1/2) * a * t^2
    const distanceTraveled = converted_speed * time + 0.5 * deceleration * time ** 2;

    // Return the result
    data = {
        params: {
            v1: initialSpeed,
            d1: brakingDistance,
            t1: time,
            unitsSpeed: selectedSpeedUnit,
            unitsDist: selectedDistUnit,
            unitsTime: selectedTimeUnit
        },
        correct_answers: {
            d: distanceTraveled
        },
        nDigits: 3,
        sigfigs: 3
    };
    return data
};

module.exports = {
    generate
};