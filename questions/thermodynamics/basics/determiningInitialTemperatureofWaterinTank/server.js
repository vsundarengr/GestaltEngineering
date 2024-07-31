const math = require('mathjs');

const generate = () => {
    // Assuming units and some necessary conversion factors are provided
    const unitSystems = {
        si: {
            length: 'm',
            width: 'm',
            height: 'm',
            temp: '°C',
            heat: 'KJ',
            densityWater: 1000, //kg/m^3
            specificHeatWater: 4.182  //kj/Ckg
        },
        uscs: {
            length: 'ft',
            width: 'ft',
            height: 'ft',
            temp: '°F',
            heat: 'BTU',
            densityWater: 62.4,  // lb/ft3
            specificHeatWater: 1 //BTU/C Lb

        }
    };

    //Dynamic Parameter Selection
    const selectedSystem = math.randomInt(0, 2) === 0 ? 'si' : 'uscs';
    const units = unitSystems[selectedSystem];

    //Value Generation 
    const a = math.randomInt(1, 5); // Length of the tank
    const b = math.randomInt(1, 5); // Width of the tank
    const c = math.randomInt(1, 3); // Height of the tank
    let fill_ratio = [0.25, 0.3, 0.5, 0.75,0.9];
    let fill_selection = math.randomInt(0,(fill_ratio.length))
    const fillFraction =fill_ratio[fill_selection] ; // The tank fill ratio

    // Value Generation for demonstration purposes
    const finalTemp = math.randomInt(30, 100); // Final temperature
    const heatRequired = math.randomInt(1000, 5000); // Heat required in kJ or BTU

    const specificHeatWater = units.specificHeatWater; // Specific heat capacity of water 
    const densityWater = units.densityWater // Density of water

    const volume = a * b * c * fillFraction;
    const mass_water = volume * densityWater



    // Calculation (assuming heatRequired, c, and m are directly related to the heating process)
    // Rearranged Q = mcΔT to find initial temperature: T_initial = T_final - Q/(mc)
    let initialTemp = finalTemp - (heatRequired / (mass_water * specificHeatWater));


    // Rounding off the initial temperature
    initialTemp = math.round(initialTemp, 3); // rounding to 3 decimal places

    return {
        params: {
            mass: mass_water,
            densityWater:densityWater,
            a: a,
            b:b,
            c:c,
            fillFraction:fillFraction,
            finalTemp: finalTemp,
            heatRequired: heatRequired,
            unitsTemp: units.temp,
            unitsHeat: units.heat,
            unitsDist:units.length,
        },
        correct_answers: {
            initialTemp: initialTemp
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