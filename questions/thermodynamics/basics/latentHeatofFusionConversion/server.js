const math = require('mathjs');
const { getSubstanceThermalProperties,substanceThermalProperties } = require('./fluid_and_mechanical_properties');
/**
 * The HeatConverter class provides static methods to convert heat energy units
 * between joules (J) and calories (cal).
 */
class HeatConverter {
    /**
     * Converts energy from joules to calories.
     * 
     * @param {number} energyJoules - The energy in joules.
     * @return {number} The energy in calories.
     */
    static joulesToCalories(energyJoules) {
        return energyJoules / 4.184;
    }

    /**
     * Converts energy from calories to joules.
     * 
     * @param {number} energyCalories - The energy in calories.
     * @return {number} The energy in joules.
     */
    static JoulesToBTU(energyCalories) {
        return energyCalories * 4.184;
    }
    /**
     * Converts energy from Joules to BTU.
     * 
     * @param {number} energyJoules - The energy in Joules.
     * @return {number} The energy in joules.
     */
    static JoulesToBTU(energyCalories) {
        return energyCalories * 0.000429922614;
    }
    /**
     * Converts energy from BTU to Joules.
     * 
     * @param {number} energyJoules - The energy in Joules.
     * @return {number} The energy in joules.
     */
    static BTUToJoules(energyCalories) {
        return energyCalories * 1/0.000429922614;
    }
}

const generate = () => {
    const unitSystems = {
        si: {
            heat: 'J'
        },
        uscs: {
            heat: 'BTU'
        }
    };

    // Dynamic Parameter Selection
    const selectedSystem = math.randomInt(0, 2) === 0 ? 'si' : 'uscs';
    const units = unitSystems[selectedSystem];

    // Retrieve Fluid Property
    const length_material = Object.keys(substanceThermalProperties).length
    const material_selection = math.randomInt(0,length_material)
    const selectedMaterial = Object.keys(substanceThermalProperties)[material_selection]
    console.log(selectedMaterial)

    // Value Generation
    const material_properties = getSubstanceThermalProperties(selectedMaterial,selectedSystem) // Latent heat value of material

    let L = material_properties["specificLatentHeatOfFusion"]
    let L_converted;

    // Applying the necessary conversion
    switch (selectedSystem) {
        case "si":
            L_converted = HeatConverter.JoulesToBTU(L); // Convert J to cal
            break;
        case "uscs":
            L_converted = HeatConverter.BTUToJoules(L); // Convert cal to J
            break;
    }

    // Rounding off the final value
    L_converted = math.round(L_converted, 5); // rounding to 3 decimal places

    // Return the structured data
    return {
        params: {
            material: selectedMaterial,
            L: math.round(L,3),
            unitsHeat: units.heat,
            unitsHeat2: selectedSystem === 'si' ? 'BTU/lb' : 'J/kg'
        },
        correct_answers: {
            L2: L_converted
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
