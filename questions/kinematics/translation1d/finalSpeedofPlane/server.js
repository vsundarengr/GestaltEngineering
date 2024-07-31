const math = require('mathjs');
const {UnitConverter} = require("./UnitConverter")


const generate = () => {

    const converter = new UnitConverter();
    // External Data Integration:
    // Placeholder values for units and categories
    const units = {
        speed: ['km/h', 'mph'],
        distance: ['km', 'miles'],
        time:  ['minutes']
    };
    n = math.randomInt(units.speed.length)
    // 1. Dynamic Parameter Selection:
    const selectedSpeedUnit = units.speed[n];
    const selectedDistanceUnit = units.distance[n];
    const selectedTimeUnit = units.time[math.randomInt(units.time.length)];


    // 3. Value Generation:
    let initialSpeed = math.round(converter.generateRandomValueForUnit(selectedSpeedUnit)); // Random initial speed in selected speed
    let distance = math.round(converter.generateRandomValueForUnit(selectedDistanceUnit)); // Random distance in selected distance
    let time = math.round(converter.generateRandomValueForUnit(selectedTimeUnit)); // Random time in selected time

    // Apply conversion
    time_converted = converter.convert(time, selectedTimeUnit, 'hours')
    
    // 4. Solution Synthesis:
    let finalSpeed = (2 * distance) / time_converted - initialSpeed;


    // Return the structured data
    return {
        params: {
            v0: math.round(initialSpeed,3),
            delta_x: math.round(distance,3),
            t: math.round(time,3),
            unitsSpeed: selectedSpeedUnit,
            unitsDistance: selectedDistanceUnit,
            unitsTime: selectedTimeUnit
        },
        correct_answers: {
            Vf: math.round(finalSpeed)
        },
        nDigits: 2,
        sigfigs: 2
    };
};

module.exports = {
    generate
};

// Example usage:
const results = generate();
//console.log(results);