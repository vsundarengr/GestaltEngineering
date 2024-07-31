const math = require('mathjs');

const generate = () => {
    const unitSystems = {
        si:{
            masslabel: "mass",
            mass: 'kg',
            force: 'N',
            angle: 'degrees',
            mu_s: '', // Coefficient of static friction doesn't have units.
            mu_k: '', // Coefficient of kinetic friction doesn't have units.
            acc: '\\( m/s^2 \\)',
            gravity: 9.81,
            gc: 1
        },
        uscs:{
            masslabel: "weight",
            mass: 'lb',
            force: 'lb',
            angle: 'degrees',
            mu_s: '', // Coefficient of static friction doesn't have units.
            mu_k: '', // Coefficient of kinetic friction doesn't have units.
            acc: '\\( ft/s^2 \\)',
            gravity: 32.2,
            gc: 32.2
        }
    };
    // Dynamic Parameter Selection
    const selectedSystem = math.randomInt(0, 2) === 0 ? 'si' : 'uscs';
    const units = unitSystems[selectedSystem];

    // Value Generation
    // const friction_coeff_list = ([0.02, 0.025, 0.03])
    // let frictionCoef = friction_coeff_list[math.randomInt(friction_coeff_list.length)]
    const frictionCoef = 0.0;
    //const a = math.round(math.random(1, 3),1); // Acceleration in units.acceleration
    let a;
    let g = units.gravity;
    const angled = 0.5*math.randomInt(2,28);
    const angle = angled*math.pi/180;

    let truckWeight = 10*math.randomInt(150,250);
    let trailerWeight = 10*math.randomInt(75,120);
    let gc = units.gc;
    if (selectedSystem === "si"){
        a = 0.25*math.randomInt(2,8);
    } else {
        a = 0.5*math.randomInt(2,9);
        truckWeight = 2*truckWeight;
        trailerWeight = 2*trailerWeight;
    }

    F = trailerWeight/gc*(g*math.sin(angle) + a);
   
    return {
        params: {
            masslabel: units.masslabel,
            truckWeight: truckWeight,
            trailerWeight : trailerWeight,
            frictionCoef: frictionCoef,
            angled: angled,
            a: a,
            unitsForce: units.force,
            unitsMass: units.mass,
            unitsAcceleration: units.acc
        },
        correct_answers: {
            F: F
        },
        nDigits: 2,
        sigfigs: 2
    };
};

module.exports = {
    generate
};


// Example usage:
const result = generate();
console.log(result);