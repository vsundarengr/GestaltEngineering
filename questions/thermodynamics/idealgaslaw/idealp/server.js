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
            "mw": "kg/kmol"
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
            "pressure": "psi",
            "mw": "lbm/kmol"
        }
    }
    unitSel = 0;
   // unitSel = math.randomInt(0,2); //SI
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
    unitsMW = units[unitSystems[unitSel]].mw;
    

convToMega = 1e-6;
convToGiga = 1e-9;
convToKilo = 1e-3;
convToCenti = 1e2;
convToMilli = 1e3;
convToMicro = 1e6;


fluidProperties = props.gasProperties;
fluidKeys = Object.keys(fluidProperties);
numFluids = fluidKeys.length;
fluidIndex = math.randomInt(0,numFluids);
fluidName = fluidKeys[fluidIndex];
fluidprop= props.getGasProperties(fluidName, unitSel);
Cp = fluidprop.Cp;
rho = fluidprop.rho;
sg= fluidprop.sg;
mw = fluidprop.mw;


if (unitSel === 0) {
    R = 8.314;
    Rg = R/mw;
    radius = 0.25*math.randomInt(2,8);
    V = 4/3*math.pi*radius**3;
    m = 0.5*math.randomInt(1,25);
    Td = math.randomInt(-5, 400)
    T = 273 + Td;
    p = m*Rg*T/V;

} else {
    radius = 0.25*math.randomInt(2,8);
    R = 1545.35;
    V = 4/3*math.pi*radius**3;
    m = math.randomInt(2,40);
    Td = math.randomInt(20, 400);
    T = 460 + Td; 
    p = m*R*T/V*(1/144);

}



data = {
    params: { 
        radius: radius,
        Td: Td,
        m: m,
        mw: mw,
        fluidName: fluidName,
        masslabel: masslabel,
        unitsMass: unitsMass,
        unitsTemperature: unitsTemperature,
        unitsCp: unitsCp,
        unitsHeat: unitsHeat,
        unitsSpeed: unitsSpeed,
        unitsFlowRate: unitsFlowRate,
        unitsHeatRate: unitsHeatRate,
        unitsMassRate: unitsMassRate,
        unitsPressure: unitsPressure,
        unitsDiameter: unitsDiameter,
        unitsMW: unitsMW,
        unitsDist: unitsDist
    },
    correct_answers: {
        p: p
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