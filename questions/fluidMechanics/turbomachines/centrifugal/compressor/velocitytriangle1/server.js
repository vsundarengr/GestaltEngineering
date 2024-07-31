//const { data } = require('cheerio/lib/api/attributes.js');
const math = require('mathjs');
//const mathhelper = require('../../mathhelper.js');
const props = require('./properties.js');

//const mathhelper = require('../../helpers/mathhelper.js');

const generate = () => {

    unitSystems = ['si', "uscs"];
    masslabels = ["mass", "weight"];
    
    units = { 
        "si": { 
            "masslabel": "mass",
            "mass": "kg",
            "speed": "m/s",
            "dim": "cm",
            "dist": "m",
            "force": "kN",
            "angle": "degrees",
            "work": "J",
            "springConst": "N/cm",
            "springLength": "cm",
            "modulusElasticity": "GPa",
            "stress": "MPa",
            "dLength": "mm",
            "dDiameter": "\\(  \\mu m \\) ",
            "diameter" : "mm",
            "energy": "J",
            "temperature": "degree C",
            "heat": "kJ",
            "Cp": "kJ/kg C",
            "flowRate": "\\( m^3/s \\)",
            "heatRate": "kW",
            "massRate": "kg/s",
            "pressure": "kPa",
            "workPerMass": "J/kg",
            "power": "W",
            "density": "\\( kg/m^3 \\)"
        },
        "uscs": {
            "masslabel": "weight",
            "mass": "lb",
            "speed": "ft/s",
            "dim": "in",
            "dist": "ft",
            "force": "lb",
            "angle": "degrees",
            "work": "ft-lb",
            "springConst": "lb/in",
            "springLength": "in",
            "modulusElasticity": "Mpsi",
            "stress": "Kpsi",
            "dLength": "inch",
            "dDiameter": "\\(\mu inch\\) ",
            "diameter" : "inch",
            "energy": "ft-lb",
            "temperature": "degree F",
            "heat": "BTU",
            "Cp": "BTU/ lb F",
            "flowRate": "cfm",
            "heatRate": "BTU/s",
            "massRate": "lb/s",
            "pressure": "psi",
            "workPerMass": "lb-ft/lb",
            "power": "hp",
            "density": "\\( lbm/ft^3 \\)"
        }
    }
    unitSel = 0;
    //unitSel = math.randomInt(0,2); //SI
    unitsDist = units[unitSystems[unitSel]].dist;
    unitsSpeed = units[unitSystems[unitSel]].speed;
    unitsMass = units[unitSystems[unitSel]].mass;
    unitsForce = units[unitSystems[unitSel]].force;
    unitsAngle = units[unitSystems[unitSel]].angle;
    unitsWork = units[unitSystems[unitSel]].work;
    masslabel = units[unitSystems[unitSel]].masslabel;
    unitsSpringConst = units[unitSystems[unitSel]].springConst;
    unitsSpringLength = units[unitSystems[unitSel]].springLength;
    unitsModulusElasticity = units[unitSystems[unitSel]].modulusElasticity;
    unitsStress = units[unitSystems[unitSel]].stress;
    unitsDLength = units[unitSystems[unitSel]].dLength;
    unitsDiameter = units[unitSystems[unitSel]].diameter;
    unitsDDiameter = units[unitSystems[unitSel]].dDiameter;
    unitsTemperature = units[unitSystems[unitSel]].temperature;
    unitsCp = units[unitSystems[unitSel]].Cp;
    unitsHeat = units[unitSystems[unitSel]].heat;
    unitsFlowRate = units[unitSystems[unitSel]].flowRate;
    unitsHeatRate = units[unitSystems[unitSel]].heatRate;
    unitsMassRate = units[unitSystems[unitSel]].massRate;
    unitsPressure = units[unitSystems[unitSel]].pressure;
    unitsWorkPerMass = units[unitSystems[unitSel]].workPerMass;
    unitsPower = units[unitSystems[unitSel]].power;
    unitsDensity = units[unitSystems[unitSel]].density;

convToMega = 1e-6;
convToGiga = 1e-9;
convToKilo = 1e-3;
convToCenti = 1e2;
convToMilli = 1e3;
convToMicro = 1e6;




if (unitSel === 0) {
    r1d = 2*math.randomInt(50,80);
    r2d= r1d + 2*math.randomInt(100,200);
    b1d = 2*math.randomInt(10,25);
    b2d = b1d - 2*math.randomInt(3,5);
    r1 = 1e-3*r1d;
    r2 = 1e-3*r2d;
    b1 = 1e-3*b1d;
    b2 = 1e-3*b2d;
    P1 = 5*math.randomInt(18,25);
    Td1 = math.randomInt(5, 45);
    T1 = Td1 + 273;
    MW = 29;
    R = 8.314;
    Rg = R/MW;
    rho = P1/(Rg*T1);
} else {

}

omegad = 50*math.randomInt(40,72);
omega = 2*math.pi*omegad/60;
u1 = r1*omega;
u2 = r2*omega;

beta1deg = math.randomInt(40,70);
beta1 = math.pi/180*beta1deg;

Vn1 = u1*math.tan(beta1);
Vdot = math.round(100*2*math.pi*r1*b1*Vn1)/100;


Vn1 = math.round(Vdot/(2*math.pi*r1*b1));
Vn2 = Vdot/(2*math.pi*r2*b2);

beta1rad = math.atan(Vn1/u1);
beta1radr = math.round(beta1rad*180/math.pi);
console.log('beta1 rad = ', beta1rad, 'beta1 deg = ', beta1radr);
beta1deg = beta1radr;
// beta1deg = beta1radr + 2*math.randomInt(1,8);
beta2deg = 2*math.randomInt(20,34);

beta1 = math.pi*beta1deg/180;
beta2 = math.pi*beta2deg/180;

Vt1 = u1 - Vn1/math.tan(beta1);
Vt2 = u2 - Vn2/math.tan(beta2);

V1 = math.sqrt(Vt1*Vt1 + Vn1*Vn1);
V2 = math.sqrt(Vt2*Vt2 + Vn2*Vn2);

alpha1deg = math.atan(Vn1/Vt1)*180/math.pi;
alpha2deg = math.atan(Vn2/Vt2)*180/math.pi;

mdot = rho*Vdot;

torque = mdot*(Vt2*r2 - Vt1*r1);
power = mdot*(Vt2*u2 - Vt1*u1);
workpermass = (Vt2*u2 - Vt1*u1);

if ( unitSel === 0) {
    Cp = 1005;
    gamma = 1.4;
    isentEff = 1;
    T01 = T1 + V1**2/(2*Cp);
    P01 = P1*math.pow(T01/T1, gamma/(gamma-1));

    T02 = T01 + workpermass/Cp;
    T02s = T01 + isentEff*workpermass/Cp;
    T2 = T02 - V2**2/(2*Cp);
    P02 = P01*math.pow(T02s/T01, gamma/(gamma-1));
    P2 = P02*math.pow(T2/T02, gamma/(gamma-1));
    T3 = T02 - V1**2/(2*Cp);
    P3 = P02*math.pow(T3/T02, gamma/(gamma-1));


} else {

}


data = {
params: { 
        Vdot: Vdot,
        r1: r1d,
        r2: r2d,
        b1: b1d,
        b2: b2d,
        pressure: P1,
        temperature: Td1,
        omegad: omegad,
        gasConstant: Rg,
        beta1deg: beta1deg,
        Vn1: Vn1,
        Vn2: Vn2,
        u1 : u1,
        u2 : u2,
        beta2deg: beta2deg,
        alpha1deg: alpha1deg,
        alpha2deg: alpha2deg,
        Vt1: Vt1,
        Vt2: Vt2,
        V1: V1,
        V2: V2,
        masslabel: masslabel,
        unitsMass: unitsMass,
        unitsTemperature: unitsTemperature,
        unitsCp: unitsCp,
        unitsDiameter: unitsDiameter,
        unitsHeat: unitsHeat,
        unitsSpeed: unitsSpeed,
        unitsFlowRate: unitsFlowRate,
        unitsHeatRate: unitsHeatRate,
        unitsMassRate: unitsMassRate,
        unitsPressure: unitsPressure,
        unitsWorkPerMass: unitsWorkPerMass,
        unitsDist: unitsDist,
        unitsPower: unitsPower,
        unitsDensity: unitsDensity
    },
    correct_answers: {
        Vn1: Vn1,
        Vn2: Vn2,
        u1 : u1,
        u2 : u2,
        beta1deg: beta1deg,
        beta2deg: beta2deg,
        alpha1deg: alpha1deg,
        alpha2deg: alpha2deg,
        Vt1: Vt1,
        Vt2: Vt2,
        V1: V1,
        V2: V2,
        mdot: mdot,
        torque: torque,
        power: power,
        workpermass: workpermass,
        P01: P01,
        T01: T01,
        T02: T02,
        T02s: T02,
        P02: P02,
        P2: P2,
        T2: T2,
        P3: P3,
        T3: T3,
        rho: rho
    },
    nDigits: 2,
    sigfigs: 2
}

console.log(data);
return data;
}

//generate();

module.exports = {
    generate
}