const math = require('mathjs');

class SpeedConverter {
    /**
     * Converts speed from miles per hour to feet per second.
     * 
     * @param {number} speedMPH - The speed in miles per hour.
     * @return {number} The speed in feet per second.
     */
    static mphToFts(speedMPH) {
        return speedMPH * (5280 / 3600);
    }

    /**
     * Converts speed from feet per second to miles per hour.
     * 
     * @param {number} speedFts - The speed in feet per second.
     * @return {number} The speed in miles per hour.
     */
    static ftsToMPH(speedFts) {
        return speedFts * (3600 / 5280);
    }

    static msTokmh(speed){
        return speed*3600/1000
    }
    static kmhToms(speed){
        return speed*1000/3600
    }
}

function convertDegreestoRad(angleDegrees) {
    return angleDegrees * Math.PI / 180;
}

const generate = () => {
    const unitSystems = {
        si: {
            speed: 'km/h',
            distance: 'm',
            acceleration: 'm/s^2 '
        },
        uscs: {
            speed: 'mph',
            distance: 'ft',
            acceleration: 'ft/s^2'
        }
    };

    // 1. Dynamic Parameter Selection
    const selectedSystem = math.randomInt(0, 2) === 0 ? 'si' : 'uscs';
    const units = unitSystems[selectedSystem];

    // 3. Value Generation
    const Vc = math.randomInt(200, 601); // Initial velocity of the plane (200-600 mph or equivalent)
    const theta = math.randomInt(5, 16); // Angle of ascent (5-15 degrees)
    const h0 = math.randomInt(1000, 2001); // Initial height of the plane (1000-2000 ft or equivalent)
    const g = selectedSystem === 'si' ? 9.81 : 32.2; // Acceleration due to gravity

    // Conversion based on unit system
    let Vc_converted;
    let acc;
    if (units.speed === 'km/h') {
        Vc_converted = SpeedConverter.kmhToms(Vc); // Convert mph to m/s
        acc = 0.25*math.randomInt(4,11);
    } else {
        Vc_converted = SpeedConverter.mphToFts(Vc); // Convert mph to ft/s
        acc = 0.5*math.randomInt(4,11);
    }

    // 4. Solution Synthesis
    const theta_rad = convertDegreestoRad(theta);
    const Vcy = Vc_converted * math.sin(theta_rad);
    const deltaY = Vcy * Vcy / (2 * g); // Using kinematic equation to find change in height
    const Vcx = Vc_converted*math.cos(theta_rad)

    // Calculate the maximum height by adding deltaY to the initial height
    const maxH = deltaY;

    t = (Vcy + math.sqrt(Vcy*Vcy + 2*math.abs(g)*h0))/g;
   
   
    range = Vcx*t;
    Vcyfinal = Vcy -g*t;
    Vcfinal = math.sqrt(Vcyfinal*Vcyfinal + Vcx*Vcx);
    Vcfinal = selectedSystem === 'si'? Vcfinal*18/5: Vcfinal*3600/5280;
    fangle = math.abs(math.atan(Vcyfinal/Vcx)*180/math.pi);
    

    dsPlane = Vc_converted*t+0.5*acc*t*t;
    dxPlane = dsPlane*math.cos(theta_rad);
    H2 = h0+ dsPlane*math.sin(theta_rad);
    xPlaneNut = dxPlane - range;


    // Return the structured data
    return {
        params: {
            v: Vc,
            theta: theta,
            H: h0,
            Vc_converted: Vc_converted,
            Vcx: Vcx,
            Vcy: Vcy,
            acc: acc,
            unitsSpeed: units.speed,
            unitsDist: units.distance,
            unitsAcc: units.acceleration
        },
        correct_answers: {
            h: maxH,
            Vy: Vcyfinal,
            Vfinal: Vcfinal,
            fangle: fangle,
            H2: H2,
            range: range,
            t:t,
            xPlaneNut: xPlaneNut
        },
        nDigits: 2,
        sigfigs: 2
    };
};

module.exports = {
    generate
};

// Example usage:
//console.log(generate());