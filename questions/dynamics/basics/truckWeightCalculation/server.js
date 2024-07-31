const math = require('mathjs');
const UnitConverter = {
    kmhToMs: (kmh) => kmh / 3.6,
    mphToFts: (mph) => mph * 1.46667
};
const generate = () => {
    const unitSystems = {
        si: {
            masslabel: "mass",
            speed: 'kmph',
            force: 'N',
            distance: 'm',
            weight: 'kg'
        },
        uscs: {
            masslabel: "weight",
            speed: 'mph',
            force: 'lbf',
            distance: 'ft',
            weight: 'lb'
        }
    };

    // Dynamic Parameter Selection
    const selectedSystem = math.randomInt(0, 2) === 0 ? 'si' : 'uscs';
    const units = unitSystems[selectedSystem];
    const g = selectedSystem === 'si' ? 9.81 : 32.174; // Acceleration due to gravity in m/s^2 or ft/s^2

    // Value Generation
    const speed = math.randomInt(30, 80); // Speed in unit's base speed
    const force = math.randomInt(10000, 50001); // Force in unit's base force
    const distance = math.randomInt(100, 300); // Distance in unit's base distance

    if (selectedSystem == "si"){
        speed_converted = UnitConverter.kmhToMs(speed)
    }
    else{
        speed_converted = UnitConverter.mphToFts(speed)
    }

    // Solution Synthesis
    let mass = ((2 * force * distance) / (speed_converted**2));
    if (selectedSystem === "si"){
        ansMass = mass;
    }
    else {
        ansMass = mass*g;
    }
    


    // Return the structured data
    return {
        params: {
            masslabel: units.masslabel,
            speed: speed,
            force: force,
            distance: distance,
            unitsSpeed: units.speed,
            unitsForce: units.force,
            unitsDist: units.distance,
            unitsWeight: units.weight
        },
        correct_answers: {
            w: ansMass
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