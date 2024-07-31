/**
 * UnitConverter Class Documentation
 * 
 * The UnitConverter class provides functionality for converting units across various measurement systems including length, weight, speed, and time. It also supports generating random values within specified ranges for these units.
 * 
 * Constructor:
 * Initializes the class with predefined conversion rates and ranges for supported units in the following categories:
 * - Length (meters, kilometers, miles, feet)
 * - Weight (kilograms, grams, pounds)
 * - Speed (meters per second, kilometers per hour, miles per hour, feet per second)
 * - Time (seconds, minutes, hours)
 * 
 * Methods:
 * generateRandomValueForUnit(unit)
 *   Generates a random value for the specified unit within its predefined range.
 *   - Parameters:
 *     - unit (string): The unit for which to generate a random value.
 *   - Returns:
 *     - A random value within the specified unit's range.
 *   - Throws:
 *     - Error if the specified unit is not supported.
 * 
 * convert(value, fromUnit, toUnit)
 *   Converts a given value from one unit to another. Note that this class is optimized for conversions within the standard metric system, specifically to meters per second (m/s) for speed, meters (m) for distance, and seconds for time.
 *   - Parameters:
 *     - value (number): The value to convert.
 *     - fromUnit (string): The unit of the given value.
 *     - toUnit (string): The target unit for conversion.
 *   - Returns:
 *     - The converted value in the target unit.
 *   - Throws:
 *     - Error if the conversion between the specified units is not supported.
 * 
 * Usage:
 * To use the UnitConverter class for conversions, always convert to the standard metric system units (m/s for speed, m for distance, and seconds for time). For example:
 * 
 * const converter = new UnitConverter();
 * const initialSpeed_converted = converter.convert(initialSpeed, selectedSpeedUnit, 'm/s');
 * const distance_converted = converter.convert(distance, selectedDistanceUnit, 'm');
 * const time_converted = converter.convert(time, selectedTimeUnit, 'seconds');
 * 
 * This ensures consistency across conversions and leverages the class's design to operate within the standard metric system.
 * Note: The conversion rates are based on the assumption that all rates are correctly defined relative to the metric system, with meters per second (m/s) serving as the standard unit for speed, meters (m) for distance, and seconds for time.
 */


class UnitConverter {
    constructor() {
        this.conversionRates = {
            length: {
                'm': { rate: 1, range: [1, 1000] },
                'km': { rate: 1000, range: [10, 15] }, // Kilometers
                'miles': { rate: 1609.34, range: [10, 15] }, // Miles
                'ft': { rate: 0.3048, range: [1, 5280] }, // Feet
                'inches': { rate: 0.0254, range: [0.0254, 2.54] }, // Inches
                'cm': { rate: 0.01, range: [0.01, 1] }, // Centimeters
                'mm': { rate: 0.001, range: [0.001, 0.1] }, // Millimeters
                'µm': { rate: 1e-6, range: [1e-6, 1e-4] }, // Micrometers (Microns)
                'nm': { rate: 1e-9, range: [1e-9, 1e-7] }, // Nanometers
            },
            weight: {
                kilograms: { rate: 1, range: [1, 100] },
                grams: { rate: 1000, range: [100, 100000] },
                pounds: { rate: 2.20462, range: [0.2, 220.462] }
            },
            speed: {
                'm/s': { rate: 1, range: [1, 40] },
                'km/h': { rate: 3.6, range: [650, 800] },
                'mph': { rate: 2.23694, range: [500, 600] },
                'ft/s': { rate: 3.28084, range: [1, 145] } // ft/s, assuming range
            },
            time: {
                'seconds': { rate: 1, range: [1, 360] },
                'minutes': { rate: 60, range: [0.8,1.2] },
                'hours': { rate: 3600, range: [0.1, 1] } // Equivalent to 1 to 2 minutes
            },
            pressure: {
                'Pa': { rate: 1, range: [100, 100000] }, // Pascal, base unit for pressure
                'kPa': {rate:1000,range:[100, 100000] },
                'MPa': {rate:100000,range:[100, 100000] },
                'GPa': {rate:100000000,range:[100, 100000] },
                'psi': { rate: 6894.76, range: [0.145038, 14503.8] }, // Pounds per square inch
                'bar': { rate: 100000, range: [1, 1000] }, // Bar, commonly used in atmospheric pressure readings
                'atm': { rate: 101325, range: [0.986923, 986.923] }, // Standard atmosphere, average sea-level pressure
                'Torr': { rate: 133.322, range: [1, 760] }, // Torr, nearly equivalent to the millimeter of mercury (mmHg)
                'mmHg': { rate: 133.322, range: [1, 760] } // Millimeters of mercury, commonly used in medical and meteorological fields
            },
            force: {
                "N": { rate: 1, range: [100, 100000] },
                'kN': { rate: 1000, range: [100, 100000] },
            }
            }
        };
    

    generateRandomValueForUnit(unit) {
        const categories = Object.keys(this.conversionRates);
        for (let category of categories) {
            const units = this.conversionRates[category];
            if (units[unit]) {
                const range = units[unit].range;
                return Math.random() * (range[1] - range[0]) + range[0];
            }
        }
        throw new Error(`Unit ${unit} is not supported.`);
    }

    convert(value, fromUnit, toUnit) {
        let fromRate = null;
        let toRate = null;
        let standard_rate = null;
    
        // Iterate through the categories to find the units
        for (const category in this.conversionRates) {
            standard_rate = this.conversionRates[category][fromUnit]
            if (this.conversionRates[category][fromUnit]) {
                fromRate = this.conversionRates[category][fromUnit].rate; // Corrected to fetch fromUnit's rate
            }
            if (this.conversionRates[category][toUnit]) {
                toRate = this.conversionRates[category][toUnit].rate;
            }
        }
        // If both rates are found, perform the conversion
        if (fromRate !== null && toRate !== null) {
            return value * fromRate / toRate;
        } else {
            // If we can't find the units, throw an error
            throw new Error(`Conversion from ${fromUnit} to ${toUnit} is not supported.`);
        }
    }
}
module.exports = {
    UnitConverter
};

// converter = new UnitConverter()
// console.log(converter.convert(5,"km","ft"))