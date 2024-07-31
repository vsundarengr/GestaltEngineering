const math = require('mathjs');

/**
 * The ForceConverter class provides static methods to convert forces between
 * different units: pounds (lb) and newtons (N).
 */
class ForceConverter {
    /**
     * Converts force from pounds to newtons.
     * 
     * @param {number} forceLb - The force in pounds.
     * @return {number} The force in newtons.
     */
    static lbToN(forceLb) {
        return forceLb * 4.44822;
    }

    /**
     * Converts force from newtons to pounds.
     * 
     * @param {number} forceN - The force in newtons.
     * @return {number} The force in pounds.
     */
    static nToLb(forceN) {
        return forceN / 4.44822;
    }
}

/**
 * The SpeedConverter class provides static methods to convert speeds between
 * different units: feet per second (ft/s), meters per second (m/s),
 * miles per hour (mph), and kilometers per hour (km/h).
 */
class SpeedConverter {
    /**
     * Converts speed from miles per hour to feet per second.
     * 
     * @param {number} speedMPH - The speed in miles per hour.
     * @return {number} The speed in feet per second.
     */
    static mphToFts(speedMPH) {
        return speedMPH * (5280 / 3600);
    }

    /**
     * Converts speed from feet per second to miles per hour.
     * 
     * @param {number} speedFts - The speed in feet per second.
     * @return {number} The speed in miles per hour.
     */
    static ftsToMPH(speedFts) {
        return speedFts * (3600 / 5280);
    }

    static msTokmh(speed){
        return speed*3600/1000
    }
    static kmhToms(speed){
        return speed*1000/3600
    }
}

const generate = () => {
    const unitSystems = {
        si: {
            weight: 'N',
            force: 'N',
            distance: 'm',
            speed: "kmh",
            gravity: 9.81,
            time: 's'
        },
        uscs: {
            weight: 'lbf',
            force: 'lbf',
            distance: 'ft',
            speed: "mph",
            gravity: 32.2,
            time: "s"
        }
    };
    // Dynamic Parameter Selection
    const selectedSystem = math.randomInt(0, 2) === 0 ? 'si' : 'uscs';
    const units = unitSystems[selectedSystem];
 
    const gravitationalAcceleration = units.gravity

    // Value Generation
    const weight = math.randomInt(600000, 800000); // Weight in pounds or newtons
    const thrustPerEngine = math.randomInt(45000, 55000); // Thrust per engine in pounds or newtons
    const percentage = math.randomInt(59,91); // Percentage of maximum thrust used
    const speed = math.randomInt(160, 200); // Take-off speed in mph or kmh

    // Appropriate Transformations
    const totalThrust = 4 * thrustPerEngine * (percentage / 100);

    let mass = weight/gravitationalAcceleration

    let speed_converted;
    if (selectedSystem == "si"){
        speed_converted = SpeedConverter.kmhToms(speed)
    }
    else{
        speed_converted = SpeedConverter.mphToFts(speed)}


    // Solution Synthesis
    const acceleration = totalThrust / mass;
    const time = speed_converted / acceleration; // Time in seconds

    // Return the structured data
    return {
        params: {
            weight: weight,
            thrust: thrustPerEngine,
            speed: speed,
            percentage: percentage,
            unitsWeight: units.weight,
            unitsThrust: units.weight,
            unitsSpeed: units.speed,
            unitsTime: units.time
        },
        correct_answers: {
            time: math.round(time, 3) // rounding to 3 decimal places
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