const math = require('mathjs');

/**
 * The TemperatureConverter class provides static methods to convert temperatures
 * between different units: Rankine (R) and Fahrenheit (F).
 */
class TemperatureConverter {
    /**
     * Converts temperature from Rankine to Fahrenheit.
     * 
     * @param {number} tempR - The temperature in Rankine.
     * @return {number} The temperature in Fahrenheit.
     */
    static rToF(tempR) {
        return tempR - 459.67;
    }
}

const generate = () => {
    // Value Generation
    const R = math.randomInt(460, 1000); // Generate a random temperature in Rankine

    // Solution Synthesis
    const F = TemperatureConverter.rToF(R);

    // Rounding off the final value to 3 decimal places
    const F_rounded = math.round(F, 3);

    // Return the structured data
    return {
        params: {
            R: R
        },
        correct_answers: {
            F: F_rounded
        },
        nDigits: 3,
        sigfigs: 3
    };
};

module.exports = {
    TemperatureConverter,
    generate
};

// Example usage:
const result = generate();
console.log(result);
