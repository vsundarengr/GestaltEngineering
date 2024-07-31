const math = require('mathjs')
const temperatureConverter = {
    /**
     * Converts temperature from Kelvin to Celsius.
     * 
     * @param {number} temperatureK - The temperature in Kelvin.
     * @return {number} The temperature in Celsius.
     */
    kelvinToCelsius(temperatureK) {
        return temperatureK - 273.15;
    },

    /**
     * Converts temperature from Celsius to Kelvin.
     * 
     * @param {number} temperatureC - The temperature in Celsius.
     * @return {number} The temperature in Kelvin.
     */
    celsiusToKelvin(temperatureC) {
        return temperatureC + 273.15;
    }
};

const generate = () => {
    // Dynamic Parameter Selection
    // For simplicity, we'll consider the conversion from Kelvin to Celsius in this example.
    const unitsTemperature = 'K';
    const unitsTemperatureC = 'C';

    // Value Generation
    // Generate a random temperature in Kelvin between 200K and 373K (approximately the liquid phase of water under 1 atm pressure)
    const T = math.randomInt(200,400);

    // Solution Synthesis
    // Convert the temperature from Kelvin to Celsius
    const Tc = temperatureConverter.kelvinToCelsius(T);

    // Return the structured data
    return {
        params: {
            T: T, // Keeping two decimal places for temperature in Kelvin
            unitsTemperature: unitsTemperature,
            unitsTemperatureC: unitsTemperatureC
        },
        correct_answers: {
            Tc: Tc // Keeping three decimal places for the converted temperature
        },
        nDigits: 3,
        sigfigs: 3
    };
};

module.exports = {
    generate
};

// Example usage:
console.log(generate());
