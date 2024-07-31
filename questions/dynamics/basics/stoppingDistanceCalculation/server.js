const UnitConverter = {
    kmhToMs: (kmh) => kmh / 3.6,
    mphToFts: (mph) => mph * 1.46667
};

const generate = () => {
    const unitSystems = {
        si: {
            weight: 'kg',
            speed: 'kmph', 
            force: 'N',
            distance: 'm',
            gravity: 9.81 // Gravity is specific to SI but not used directly here
        },
        uscs: {
            weight: 'lb',
            speed: 'mph',
            force: 'lbf',
            distance: 'ft'
        }
    };

    // Dynamic Parameter Selection
    const selectedSystem = Math.random() < 0.5 ? 'si' : 'uscs'; // Simplified random selection
    const units = unitSystems[selectedSystem];

    // Value Generation
    const weight = Math.floor(Math.random() * (50001 - 10000) + 10000); // Weight in pounds or kilograms
    const speed = Math.floor(Math.random() * (81 - 30) + 30); // Speed in mph or km/h
    const force = Math.floor(Math.random() * (10001 - 1000) + 10000); // Force in lbf or N

    let weight_converted = weight;
    let speed_converted;
    let force_converted = force;

    // Converting units based on the selected system
    if (selectedSystem === "si") {
        speed_converted = UnitConverter.kmhToMs(speed); // Convert km/h to m/s
    } else { // Assuming 'uscs'
        weight_converted = weight/32.2;
        speed_converted = UnitConverter.mphToFts(speed); // Convert mph to ft/s
    }

    const deceleration = force_converted / weight_converted; // Calculate deceleration

    // Calculating stopping distance
    let stoppingDistance = (speed_converted ** 2) / (2 * deceleration);

    // Rounding off the final value
    stoppingDistance = Math.round(stoppingDistance * 1000) / 1000; // rounding to 3 decimal places

    // Return the structured data
    return {
        params: {
            weight: weight,
            speed: speed,
            force: force,
            unitsWeight: units.weight,
            unitsSpeed: units.speed,
            unitsForce: units.force,
            unitsDistance: units.distance
        },
        correct_answers: {
            d: stoppingDistance
        },
        nDigits: 2,
        sigfigs: 2
    };
};

module.exports = {
    generate
};

// Example usage:
const result = generate();
console.log(result);
