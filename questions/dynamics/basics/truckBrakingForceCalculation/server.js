const math = require('mathjs');
const UnitConverter = {
    MsToKmh: (ms) => ms *3600/1000,
    FtsToMph: (fts) => fts * 3600/5280
};

const generate = () => {
    const unitSystems = {
        si: {
            masslabel: "mass",
            weight: 'kg',
            force: 'N',
            distance: 'm',
            speed: "kmph"
        },
        uscs: {
            masslabel: "weight",
            weight: 'lbs',
            force: 'lbf',
            distance: 'ft',
            speed: "mph"
        }
    };

    // Dynamic Parameter Selection
    const selectedSystem = math.randomInt(0, 2) === 0 ? 'si' : 'uscs';
    const units = unitSystems[selectedSystem];

    // Value Generation
    const weight = math.randomInt(1000, 2001); // Weight in pounds or kilograms
    const force = math.randomInt(1000, 5001); // Force in pounds-force or newtons
    const distance = math.randomInt(10, 201); // Distance in feet or meters

    const gc = selectedSystem === "si" ? 1 : 32.2;
    const wt = weight/gc;
    // Calculating Initial Speed using the work-energy principle
    // Work done by the force = Change in kinetic energy
    // force * distance = 0.5 * mass * velocity^2
    // velocity = sqrt((2 * force * distance) / mass)
    let initialSpeed = Math.sqrt((2 * force * distance) / wt);
    console.log("Initial speed = ", initialSpeed, ' Wt = ', wt);

   
    let speed_converted;
    if (selectedSystem == "si"){
        speed_converted = UnitConverter.MsToKmh(initialSpeed)
    }
    else{
        speed_converted = UnitConverter.FtsToMph(initialSpeed)
    }
    

    // Return the structured data
    return {
        params: {
            masslabel: units.masslabel,
            weight: weight,
            force: force,
            distance: distance,
            unitsWeight: units.weight,
            unitsForce: units.force,
            unitsDistance: units.distance,
            unitsSpeed: units.speed
        },
        correct_answers: {
            v: math.round(speed_converted,3)
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