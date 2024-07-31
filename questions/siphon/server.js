//const { data } = require('cheerio/lib/api/attributes.js');
const math = require('mathjs');
const mathhelper = require('../../mathhelper.js');
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
            "pressure": "kPa"
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
            "flowRate": "\\( ft^3/s \\)",
            "heatRate": "BTU/s",
            "massRate": "lb/s",
            "pressure": "psi"
        }
    }
    unitSel = 1;
 //   unitSel = math.randomInt(0,2); //SI
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
    

convToMega = 1e-6;
convToGiga = 1e-9;
convToKilo = 1e-3;
convToCenti = 1e2;
convToMilli = 1e3;
convToMicro = 1e6;


fluidProperties = props.fluidProperties;
fluidKeys = Object.keys(fluidProperties);
numFluids = fluidKeys.length;
fluidIndex = math.randomInt(0,numFluids);
fluidName = fluidKeys[fluidIndex];
fluidprop= props.getFluidProperties(fluidName, unitSel);
Cp = fluidprop.Cp;
rho = fluidprop.rho;
sg= fluidprop.sg;



if (unitSel === 0) {
    g = 9.81;
    h6 = 0.25*math.randomInt(1,9);
    h4 = 0.3*math.randomInt(1,7);
    h2 = 0.2*math.randomInt(1,6);
    V = math.sqrt(2*g*h6);
    p2 = h2*rho*g;
    p3 = p2 - rho*V*V/2*1e-3;
    p4 = -rho*1e-3* (h4*g +V*V/2);
    Dd = 2*math.randomInt(5, 11);
    D = Dd/1000;
    A = math.pi/4*D*D;
    vdot = A*V;
    mdot = rho*vdot;
    p2 = p2/1000;
    p3 = p3/1000;
    p4 = p4/1000;
} else {
    g = 32.2;
    h6 = 0.5*math.randomInt(1,9);
    h4 = 0.5*math.randomInt(1,7);
    h2 = 0.2*math.randomInt(1,6);
    V = math.sqrt(2*g*h6);
    rhoslug = rho/32.2;
    p2 = h2*rhoslug*g;
    p3 = p2 - rhoslug*V*V/2;
    p4 = -(h4*rhoslug*g)-rhoslug*V*V/2;
    Dd = 0.25*math.randomInt(2, 10);
    D = Dd/12;
    A = math.pi/4*D*D;
    vdot = A*V;
    mdot = rho*vdot;
    p2 = p2/144;
    p3 = p3/144;
    p4 = p4/144;
}



data = {
    params: { 
        h6: h6,
        h2: h2,
        h4: h4,
        sg: sg,
        rho: rho,
        D: Dd,
        fluidName: fluidName,
        masslabel: masslabel,
        unitsMass: unitsMass,
        unitsTemperature: unitsTemperature,
        unitsCp: unitsCp,
        unitsHeat: unitsHeat,
        unitsSpeed: unitsSpeed,
        unitsDiameter: unitsDiameter,
        unitsFlowRate: unitsFlowRate,
        unitsHeatRate: unitsHeatRate,
        unitsMassRate: unitsMassRate,
        unitsPressure: unitsPressure,
        unitsDist: unitsDist
    },
    correct_answers: {
        V: V,
        p2: p2,
        p3: p3,
        p4: p4,
        vdot: vdot,
        mdot: mdot
    },
    nDigits: 2,
    sigfigs: 2
}

console.log(data);
return data;
}

generate();

module.exports = {
    generate
}