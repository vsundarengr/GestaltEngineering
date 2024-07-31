const math = require('mathjs');

/**
 * The DensityConverter class provides static methods to convert densities between
 * pounds per cubic foot (lbm/ft^3) and kilograms per cubic meter (kg/m^3).
 */
class DensityConverter {
    /**
     * Converts density from lbm/ft^3 to kg/m^3.
     * 
     * @param {number} densityLbmFt3 - The density in lbm/ft^3.
     * @return {number} The density in kg/m^3.
     */
    static lbmFt3ToKgM3(densityLbmFt3) {
        return densityLbmFt3 * 16.0185;
    }

    /**
     * Converts density from kg/m^3 to lbm/ft^3.
     * 
     * @param {number} densityKgM3 - The density in kg/m^3.
     * @return {number} The density in lbm/ft^3.
     */
    static kgM3ToLbmFt3(densityKgM3) {
        return densityKgM3 / 16.0185;
    }
}

const generate = () => {
    const unitSystems = {
        si: {
            length: 'm',
            width: 'm',
            height: 'm',
            temp: '°C',
            heat: 'KJ',
            densityWater: 1000, //kg/m^3
            specificHeatWater: 4.182  //kj/C
        },
        uscs: {
            length: 'ft',
            width: 'ft',
            height: 'ft',
            temp: '°F',
            heat: 'BTU',
            densityWater: 62.4,
            specificHeatWater: 1

        }
    };

    //Dynamic Parameter Selection
    const selectedSystem = math.randomInt(0, 2) === 0 ? 'si' : 'uscs';
    const units = unitSystems[selectedSystem];

    // Value Generation
    const length = math.randomInt(1, 5); // Length of the tank
    const width = math.randomInt(1, 5); // Width of the tank
    const height = math.randomInt(1, 3); // Height of the tank
    let fill_ratio = [0.25, 0.3, 0.5, 0.75,0.9];
    let fill_selection = math.randomInt(0,(fill_ratio.length))
    const fillFraction =fill_ratio[fill_selection] ; // The tank fill ratio
    const initialTemp = math.randomInt(10, 30); // Initial temperature
    const finalTemp = math.randomInt(30, 100); // Final temperature

    // Constants
    const densityWater = units.densityWater; 
    const specificHeatWater = units.specificHeatWater; //
    // 1. Calculate the volume of water
    const volume = length * width * height * fillFraction;
    // 2. Convert density to the correct units if necessary
    let densityWaterConverted = densityWater;

    // 3. Calculate the mass of water
    const massWater = volume * densityWaterConverted;

    // 4. Calculate the temperature change
    const tempChange = finalTemp - initialTemp;

    // 5. Calculate the heat required
    let Q = massWater * specificHeatWater * tempChange;

    // 6. Rounding off the final value
    Q = math.round(Q, 3); // rounding to 3 decimal places

    // Return the structured data
    return {
        params: {
            mass: massWater,
            densityWater:densityWaterConverted,
            tempChange:tempChange,
            length: length,
            width: width,
            height: height,
            fillFraction: fillFraction,
            initialTemp: initialTemp,
            finalTemp: finalTemp,
            unitsLength: units.length,
            unitsWidth: units.width,
            unitsHeight: units.height,
            unitsTemp: units.temp,
            unitsHeat: units.heat
        },
        correct_answers: {
            Q: Q
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
