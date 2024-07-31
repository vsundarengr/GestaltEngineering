// This JavaScript file calculates the final temperature of water in a tank after a certain amount of heat has been supplied.
// It dynamically selects units and calculates the solution based on the problem's context.

const math = require('mathjs');

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
    const length = math.randomInt(1, 4); // length in meters
    const width = math.randomInt(1, 4); // width in meters
    const height = math.randomInt(1, 3); // height in meters

    let fill_ratio = [0.25, 0.3, 0.5, 0.75,0.9];
    let fill_selection = math.randomInt(0,(fill_ratio.length))
    const fillFraction =fill_ratio[fill_selection] ; // The tank fill ratio

    const initialTemp = math.randomInt(5,30); // temperature 
    let heatSupplied = math.randomInt(1000, 5000); // heat in

    // Constants
    const densityWater = units.densityWater; 
    const specificHeatWater = units.specificHeatWater; //

    // Calculate the volume of water in liters (since 1 m^3 = 1000 L)
    const volume = length * width * height  * fillFraction; 

    // Convert volume to mass
    const mass = volume *densityWater
    let finalTemp = 1000;
    let tempChange;
    while ((finalTemp / initialTemp < 2 && finalTemp <= 1000) || finalTemp > 100) {
        if (finalTemp / initialTemp < 2) {
            heatSupplied *= 1.25;
        } else if (finalTemp > 100) {
            heatSupplied *= 0.75;
        }
        // Calculate temperature change
        tempChange = heatSupplied / (mass * specificHeatWater);
        // Calculate new final temperature
        finalTemp = initialTemp + tempChange;
    
        // Check to avoid infinite loop in case conditions cannot be satisfied
        if (tempChange < 0.01 && tempChange > -0.01) {
            break; // Breaks the loop if changes become negligible
        }
    }
  
    // Return the structured data
    return {
        params: {
            length:length,
            width:width,
            height:height,
            fillFraction: fillFraction.toFixed(2), // Formatting to 2 decimal places for display
            initialTemp,
            densityWater,
            specificHeatWater,
            tempChange,
            mass,
            heatSupplied:math.round(heatSupplied),
            unitsLength: units.length,
            unitsWidth: units.width,
            unitsHeight: units.height,
            unitsTemp: units.temp,
            unitsHeat: units.heat,
            fluid: "water"
        },
        correct_answers: {
            finalTemp: math.round(finalTemp,3) // Rounding to 3 decimal places for the answer
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