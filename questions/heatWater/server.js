//const { data } = require('cheerio/lib/api/attributes.js');
const math = require('mathjs');
//const mathhelper = require('../../mathhelper.js');
const props = require('./properties.js');

const mathhelper = require('../../helpers/mathhelper.js');

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
            "flowRate": "liters per min",
            "heatRate": "kW"
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
            "flowRate": "gpm",
            "heatRate": "BTU/s"
        }
    }
    
    unitSel = math.randomInt(0,2); //SI
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
fluidprop = props.getFluidProperties(fluidName, unitSel);
Cp = fluidprop.Cp;
rho = fluidprop.rho;
sg = fluidprop.sg;


if (unitSel === 0){
    d = 2*math.randomInt(5,20);
    vdotd = math.randomInt(4,16);
    vdot = vdotd/(60*1000);
    m = rho*vdot;
    A = math.pi*d*d*1e-6/4;
    v = vdot/A; 
    Ti = math.randomInt(5,20);
    Tf = math.randomInt(40,90);
} else {
    
    vdotd = math.randomInt(2,10);
    vdot = vdotd/450;
    m = rho*vdot;
    d = 0.125*math.randomInt(1,12);
    A = math.pi*d*d/(144*4);
    v = vdot/A;
    Ti = 2*math.randomInt(20,35);
    Tf = 2*math.randomInt(45,100);
}


Q = m*Cp*(Tf-Ti);

data = {
    params: { 
        d: d,
        vdot: vdotd,
        Ti: Ti,
        Tf: Tf,
        Cp: Cp,
        rho: rho,
        sg: sg,
        fluidName: fluidName,
        masslabel: masslabel,
        unitsMass: unitsMass,
        unitsTemperature: unitsTemperature,
        unitsCp: unitsCp,
        unitsHeat: unitsHeat,
        unitsSpeed: unitsSpeed,
        unitsFlowRate: unitsFlowRate,
        unitsHeatRate: unitsHeatRate,
        unitsDiameter: unitsDiameter
    },
    correct_answers: {
        Q: Q,
        v: v
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