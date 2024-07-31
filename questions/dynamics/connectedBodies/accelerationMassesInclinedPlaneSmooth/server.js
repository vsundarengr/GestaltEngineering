const math = require('mathjs');

function degToRad(degrees) {
    return degrees * (Math.PI / 180);
}

const generate = () => {
    // 1. Dynamic Parameter Selection
    // const mu_s_val = [0.2, 0.25, 0.3, 0.35, 0.4];
    // const mu_k_val = [0.15, 0.2, 0.25, 0.3];
    mu_s_val = 0;
    mu_k_val = 0;

    const params = {
        mA: math.randomInt(1, 8), // Mass of A in kg
        mB: math.randomInt(1, 9), // Mass of B in kg
        mC: math.randomInt(1, 10), // Mass of C in kg
        mu_s_val: mu_s_val,
        mu_k_val: mu_k_val,
        mu_s: 0, // Selects a random friction coefficient from mu_s_val
        mu_k: 0, // Selects a random friction coefficient from mu_k_val
        theta: math.randomInt(30, 61), // Angle in degrees
        phi: math.randomInt(15, 46), // Angle in degrees
        unitsAcc: '\\( m/s^2 \\)',
        unitsForce: "N"
    };

    // Constants
    const g = 9.81; // Acceleration due to gravity in m/s^2

    // 4. Solution Synthesis
    // Convert angles to radians for calculation
    const thetaRad = degToRad(params.theta);
    const phiRad = degToRad(params.phi);

    // Calculate the forces on each mass
    const forceA = params.mA * g * Math.sin(thetaRad);
    const forceB = params.mB * g* Math.sin(thetaRad);
    const forceC_gravity = params.mC * g * Math.sin(phiRad);
    const forceC_friction = params.mu_k * params.mC * g * Math.cos(phiRad);

    // Net force calculation
    const F_net = forceB + forceA - forceC_gravity - forceC_friction;

    // Total mass calculation
    const totalMass = params.mA + params.mB + params.mC;

    // Acceleration calculation
    const acceleration = F_net / totalMass;

    Tc = params.mC*(acceleration + g*Math.sin(phiRad));
    Ta = params.mA*(g*Math.sin(thetaRad) - acceleration);
    return {
        params,
        correct_answers: {
            acceleration: math.round(acceleration, 3), // Round to 3 decimal places
            Ta: Ta,
            Tc: Tc
        },
        nDigits: 2,
        sigfigs: 2
    };
};

module.exports = {
    generate
};

console.log(generate())