const math = require('mathjs');

/**
 * The TemperatureConverter class provides static methods to convert temperatures between
 * Celsius and Fahrenheit.
 */
class TemperatureConverter {
    /**
     * Converts temperature from Celsius to Fahrenheit.
     * 
     * @param {number} tempC - The temperature in Celsius.
     * @return {number} The temperature in Fahrenheit.
     */
    static celsiusToFahrenheit(tempC) {
        return (tempC * (9 / 5)) + 32;
    }

    /**
     * Converts temperature from Fahrenheit to Celsius.
     * 
     * @param {number} tempF - The temperature in Fahrenheit.
     * @return {number} The temperature in Celsius.
     */
    static fahrenheitToCelsius(tempF) {
        return (tempF - 32) * (5 / 9);
    }
}

const generate = () => {
    // Value Generation
    const tempC = math.randomInt(-30, 101); // Temperature in Celsius

    // 3. Calculating Equivalent in Fahrenheit
    const tempF = TemperatureConverter.celsiusToFahrenheit(tempC);

    // 4. Rounding off the final value
    const tempF_rounded = math.round(tempF, 3); // rounding to 3 decimal places

    // Return the structured data
    return {
        params: {
            tempC: tempC
        },
        correct_answers: {
            tempF: tempF_rounded
        },
        nDigits: 3,
        sigfigs: 3
    };
};

console.log(generate())

module.exports = {
    TemperatureConverter,
    generate
};
