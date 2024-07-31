const Math = require('mathjs');

function convertKmHtoMS(speedKmH) {
    return speedKmH * (1000 / 3600);
}
function convertMphtofts(speed){
    return speed*5280/3600
}

function calculateProjectileMotion(v, theta, h, g) {
    // Convert degrees to radians for trigonometric functions
    const thetaRad = Math.unit(theta, 'deg').toNumber('rad');

    // Resolve the initial velocity into horizontal and vertical components
    const vCx = v * Math.cos(thetaRad);
    const vCy = v * Math.sin(thetaRad);

    // Use the quadratic formula to solve for time (t) when the car hits the water (y = 0)
    const a = -0.5 * g;
    const b = vCy;
    const c = h;

    // Calculate the discriminant
    const discriminant = b * b - 4 * a * c;

    // Calculate the time of flight (only the positive root is physically meaningful)
    const t = (-b - Math.sqrt(discriminant)) / (2 * a);

    // Calculate the horizontal distance (Delta x)
    const deltaX = vCx * t;

    vyf = vCy - g*t;

    vf = Math.sqrt(vCx**2 + vyf**2);
    
    return { t: t, deltaX: deltaX, vf: vf};

    //return deltaX;
}

const generate = () => {
    const unitSystems = {
        si: {
            distance: 'm',
            speed: "km/h",
            gravity: 9.81, // m/s^2
            time: 's',
            acceleration: "m/s^2"
        },
        uscs: {
            distance: 'ft',
            speed: "mph",
            gravity: 32.2, // ft/s^2
            time: "s",
            acceleration: "ft/s^2"
        }
    };

    // Dynamic Parameter Selection
    const selectedSystem = Math.random() < 0.5 ? 'si' : 'uscs';
    const units = unitSystems[selectedSystem];
    const g = units.gravity;

    // Value Generation
    const v = Math.randomInt(30, 70); // Initial velocity
    const theta = Math.randomInt(5, 15); // Launch angle in degrees
    const h = Math.randomInt(40, 80); // Height of launch point

    // Convert the velocity based on the selected system
    const v_converted = selectedSystem === "si" ? 
                         convertKmHtoMS(v) : 
                         convertMphtofts(v);

    // Calculate the horizontal distance using projectile motion
    const res = calculateProjectileMotion(v_converted, theta, h, g);

    deltaX = res.deltaX;
    vf = res.vf;

    const vfc = selectedSystem === "si"? vf*3600/1000 : vf*3600/5280;

    // Return the structured data
    return {
        params: {
            v: v,
            angle: theta,
            H: h,
            unitsSpeed: units.speed,
            unitsAngle: "deg",
            unitsDist: units.distance,
            unitsTime: units.time
        },
        correct_answers: {
            d: Math.round(deltaX, 3), // Round to 3 decimal places
            vf : vf,
            vfc: vfc
        },
        nDigits: 2,
        sigfigs: 2
    };
};


module.exports = {
    generate
};

console.log(generate())