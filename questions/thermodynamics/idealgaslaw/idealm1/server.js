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
            "temperature": "K",
            "heat": "kJ",
            "Cp": "kJ/kg C",
            "flowRate": "\\( m^3/s \\)",
            "heatRate": "kW",
            "massRate": "kg/s",
            "pressure": "kPa",
            "volume": "\\( m^3 \\)",
            "mw": "kJ/kmol"
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
            "temperature": "degree R",
            "heat": "BTU",
            "Cp": "BTU/ lb F",
            "flowRate": "\\( ft^3/s \\)",
            "heatRate": "BTU/s",
            "massRate": "lb/s",
            "pressure": "psi",
            "volume": " \(( ft^3 \\)",
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
    unitsVolume = units[unitSystems[unitSel]].volume;
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
    height = 0.25*math.randomInt(4,20);

    V = 4/3*math.pi*radius**3 + math.pi*height*radius**2;
    p1 = 2*math.randomInt(25,300);
    p2 = p1*math.randomInt(150,500)/100;
    T1 = 273 + math.randomInt(-5, 400);
    T2 = T1*math.randomInt(90, 130)/100;
    m1 = p1*V/(Rg*T1);
    m2 = p2*V/(Rg*T2);
    deltam = m2 - m1;

    deltaV = deltam*Rg*293/101.3;


} else {
    radius = 0.25*math.randomInt(2,8);
    R = 1545.35;
    Rg = R/mw;
    V = 4/3*math.pi*radius**3 + math.pi*height*radius**2;
    p1 = 0.1*math.randomInt(100, 400);
    p2 = p1*math.randomInt(150,500)/100;
    T1 = 460 + math.randomInt(20, 400);
    T2 = T1*math.randomInt(90,130)/100;
    m1 = (p1*144)*V/(Rg*T1);
    m2 = (p2*144)*V/(Rg*T2);
    deltam = m2 - m2;
    deltaV = deltam*Rg*520/(14.7*144);
}



data = {
    params: { 
        radius: radius,
        height: height,
        V: V,
        p1 : p1,
        T1: T1,
        p2: p2,
        T2: T2,
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
        unitsVolume: unitsVolume,
        unitsMW: unitsMW,
        unitsDist: unitsDist
    },
    correct_answers: {
        deltam: deltam,
        deltaV: deltaV
    },
    nDigits: 2,
    sigfigs: 2
}

//console.log(data);
return data;
}

generate();

module.exports = {
    generate
}