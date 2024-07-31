const math = require('mathjs');

/**
 * The UnitConverter class provides static methods to convert between different units.
 */
class UnitConverter {
    // Add methods for unit conversions as needed
    static lbToKg(weightLb) {
        return weightLb * 0.453592;
    }

    static ftToMeters(distanceFt) {
        return distanceFt * 0.3048;
    }
    static meterToKm(distanceM){
        return distanceM/1000
    }
    static kmhToMs(speed){
        return speed *1000/3600
    }
    static MsToKmh(speed){
        return 3600*1000
    }
    static kmToM(distance){
        return distance*1000
    }

    static kgToNewton(weightKg) {
        const g = 9.81; // Acceleration due to gravity in m/s^2
        return weightKg * g;
    }
    static mphToFts(speed){
        return speed*5280/3600
    }
    static ftstoMPH(spped){
        return speed*1000/5800
    }
}

const generate = () => {
    const unitSystems = {
        si: {
            weight: 'kg',
            speed: 'km/h',
            distance: 'm',
            force: 'N'
        },
        uscs: {
            weight: 'lb',
            speed: 'mph',
            distance: 'ft',
            force: 'lbf'
        }
    };

    // Dynamic Parameter Selection
    const selectedSystem = math.randomInt(0, 2) === 0 ? 'si' : 'uscs';
    const units = unitSystems[selectedSystem];

    // Value Generation
    let weight = math.randomInt(10000, 40000); // Weight in unit force
    const speed = math.randomInt(30, 70); // Speed in unit speed
    const distance = math.randomInt(100, 500); // Stopping distance in unit distance

    let weight_converted, speed_converted, distance_converted;

    // Converting units based on the selected system
    if (selectedSystem === 'si') {
        weight_converted = weight 
        speed_converted = UnitConverter.kmhToMs(speed)
        distance_converted = distance
    } else {
        weight = math.round(weight*2.2);
        weight_converted = weight/32.2;
        speed_converted = UnitConverter.mphToFts(speed);
        distance_converted = distance;
    }

    // Calculating acceleration and force
    const acceleration = -(speed_converted ** 2) / (2 * distance_converted);
    let force = weight_converted * acceleration;

    // Rounding off the final value
    force = math.round(force, 3); // rounding to 3 decimal places

    // Return the structured data
    return {
        params: {
            weight: weight,
            speed: speed,
            distance: distance,
            unitsWeight: units.weight,
            unitsSpeed: units.speed,
            unitsDistance: units.distance,
            unitsForce: units.force
        },
        correct_answers: {
            F: force
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