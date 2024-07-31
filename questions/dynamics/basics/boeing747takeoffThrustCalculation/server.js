const math = require('mathjs');
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
/**
 * The ThrustCalculator class provides static methods to calculate the required
 * thrust and percentage of maximum thrust for an aircraft's take-off.
 */
class ThrustCalculator {
    /**
     * Calculates the required thrust for an aircraft to reach a certain speed in a given time.
     * 
     * @param {number} weight - The weight of the aircraft in newtons.
     * @param {number} speed - The take-off speed in meters per second.
     * @param {number} time - The time in seconds to reach the take-off speed.
     * @param {number} g - gravity
     * @return {number} The required thrust in newtons.
     */
    static calculateRequiredThrust(weight, speed, time,g) {
        // Using the kinematic equation: V = U + a * t (where U is initial speed, which is 0)
        // and Newton's second law: F = m * a (where F is force, m is mass, and a is acceleration)
        // We find the required acceleration first: a = V / t
        // Then we calculate the required thrust: F = m * a
        // Note: weight is the force due to gravity, so mass m = weight / g (where g is the acceleration due to gravity)
        const acceleration = speed / time;
        const mass = weight / g; 
        return mass * acceleration;
    }

    /**
     * Calculates the percentage of maximum thrust per engine.
     * 
     * @param {number} requiredThrust - The total required thrust in newtons.
     * @param {number} maxThrustPerEngine - The maximum thrust per engine in newtons.
     * @return {number} The percentage of maximum thrust per engine.
     */
    static calculateThrustPercentage(requiredThrust, maxThrustPerEngine) {
        // The percentage is calculated by dividing the required thrust per engine
        // by the maximum thrust per engine and multiplying by 100.
        const requiredThrustPerEngine = requiredThrust / 4; // Assuming 4 engines
        return (requiredThrustPerEngine / maxThrustPerEngine) * 100;
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


    // Value Generation
    let weight = math.round(math.randomInt(500000, 800000)); // Weight in units force
    const maxThrust = math.round(math.randomInt(20000, 30000)); // Maximum thrust per engine in units force
    let speed = math.round(math.randomInt(150, 200)); // Take-off speed in units speed
    const time = math.randomInt(30, 60); // Time in seconds
    const g = units.gravity

  

    let percentageThrust= 1000;
    while (percentageThrust > 95) {
        // Convert speed once at the beginning of each loop iteration
        speed = math.round(speed,3)
        let converted_speed = selectedSystem === "si" ?
                              SpeedConverter.kmhToms(speed) :
                              SpeedConverter.mphToFts(speed);
    
        // 1. Calculating Required Thrust
        const requiredThrust = ThrustCalculator.calculateRequiredThrust(weight, converted_speed, time, g);
    
        // 2. Calculating Percentage of Maximum Thrust per Engine
        percentageThrust = ThrustCalculator.calculateThrustPercentage(requiredThrust, maxThrust);
    
        if (percentageThrust > 95) {
            speed -= (percentageThrust % 5) + 1;
            weight -= (percentageThrust % 1000) + 1;
        }
        
        // Adjust speed based on new conditions
        if (speed < 130 || percentageThrust < 60) {
            speed += (percentageThrust % 10) + 1;
        }
    }
    // 3. Rounding off the final value
    const percentageThrustRounded = math.round(percentageThrust, 3); // rounding to 3 decimal places
    // Return the structured data
    return {
        params: {
            weight: math.round(weight,3),
            maxThrust: math.round(maxThrust,3),
            speed: math.round(speed,3),
            time: math.round(time,3),
            unitsWeight: units.weight, // Newtons
            unitsSpeed: units.speed // Meters per second
        },
        correct_answers: {
            percentageThrust: percentageThrustRounded
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