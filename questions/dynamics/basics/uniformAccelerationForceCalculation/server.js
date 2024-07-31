const math = require('mathjs');

/**
 * The UnitConverter class provides static methods to convert units between
 * different systems: SI and USCS (United States Customary System).
 */
class UnitConverter {
    /**
     * Converts mass from kilograms to pounds.
     * 
     * @param {number} massKg - The mass in kilograms.
     * @return {number} The mass in pounds.
     */
    static kgToLbs(massKg) {
        return massKg * 2.20462;
    }

    /**
     * Converts force from newtons to pounds-force.
     * 
     * @param {number} forceN - The force in newtons.
     * @return {number} The force in pounds-force.
     */
    static nToLbf(forceN) {
        return forceN * 0.224809;
    }

    /**
     * Converts speed from kilometers per hour to meters per second.
     * 
     * @param {number} speedKMH - The speed in kilometers per hour.
     * @return {number} The speed in meters per second.
     */
    static kmHtoMs(speedKMH) {
        return speedKMH * (1000 / 3600);
    }
}

const generate = () => {
    const unitSystems = {
        si: {
            masslabel: "mass",
            mass: 'kg',
            speed: 'km/h',
            time: 's',
            force: 'N',
            gc: 1
        },
        uscs: {
            masslabel: "weight",
            mass: 'lb',
            speed: 'mph',
            time: 's',
            force: 'lbf',
            gc: 32.2
        }
    };

    // Dynamic Parameter Selection
    const selectedSystem = math.randomInt(0, 2) === 0 ? 'si' : 'uscs';
    const units = unitSystems[selectedSystem];
    let gc = units.gc;
    let mass, vd, v;
    // Value Generation
    const time = 0.5*math.randomInt(15,37);
    if (selectedSystem === 'si') {
         mass = 10*math.randomInt(100,180);
         vd = math.randomInt(45,101);
         v = vd*5/18;
    } else {
         mass = 10*math.randomInt(150,350);   
         vd = math.randomInt(30,90);
         v = vd*5280/3600;
    }

    acceleration = v/time;
    F = mass/gc*acceleration;

    // Return the structured data
    return {
        params: {
            masslabel: units.masslabel,
            md: mass,
            vd: vd,
            acceleration: acceleration,
            t: time,
            unitsMass: units.mass,
            unitsSpeed: units.speed,
            unitsTime: units.time,
            unitsForce: units.force
        },
        correct_answers: {
            F: F
        },
        nDigits: 3,
        sigfigs: 3
    };
};

module.exports = {
    generate
};

// Example usage:
const result = generate();
console.log(result);