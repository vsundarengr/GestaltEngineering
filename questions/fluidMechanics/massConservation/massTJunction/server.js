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
            "flowRate": "liters per min",
            "heatRate": "kW",
            "massRate": "kg/s"
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
            "heatRate": "BTU/s",
            "massRate": "lb/s"
        }
    }
    //unitSel = 0;
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
    unitsMassRate = units[unitSystems[unitSel]].massRate;
    

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
sg= fluidprop.sg;

if (unitSel === 0){
    Dd1 = 2*math.randomInt(1,17);
    D1 = Dd1/1000;
    A1 = math.pi*(D1*D1)/4;
    V1 = 0.4*math.randomInt(1,10);
    Q1 = A1*V1;

    Dd2 = 2*math.randomInt(1,17);
    D2 = Dd2/1000;
    A2 = math.pi*(D2*D2)/4;
    V2 = 0.4*math.randomInt(1,10);
    Q2 = A2*V2;

    Dd3= 2*math.randomInt(1,17);
    D3 = Dd3/1000;
    A3 = math.pi*(D3*D3)/4;

    Q = Q1 + Q2;
    V = Q/A3;
    Qd = Q*1000*60;
    m = rho*Q;
} else {
    Dd1 = 0.125*math.randomInt(1,17);
    D1 = Dd1/12;
    A1 = math.pi*(D1*D1)/4;
    V1 = 0.4*math.randomInt(1,10);
    Q1 = A1*V1;

    Dd2 = 0.125*math.randomInt(1,17);
    D2 = Dd2/12;
    A2 = math.pi*(D2*D2)/4;
    V2 = 0.4*math.randomInt(1,10);
    Q2 = A2*V2;

    Dd3 = 0.125*math.randomInt(1,17);
    D3 = Dd3/12;
    A3 = math.pi*(D3*D3)/4;

    Q = Q1 + Q2;

    V = Q/A3;
    Qd = Q*7.5*60;
    m = rho*Q;
}


data = {
    params: { 
        D1: Dd1,
        V1: V1,
        D2: Dd2,
        V2: V2,
        D3: Dd3,
        sg: sg,
        fluidName: fluidName,
        masslabel: masslabel,
        unitsMass: unitsMass,
        unitsDiameter: unitsDiameter,
        unitsCp: unitsCp,
        unitsHeat: unitsHeat,
        unitsSpeed: unitsSpeed,
        unitsFlowRate: unitsFlowRate,
        unitsHeatRate: unitsHeatRate,
        unitsMassRate: unitsMassRate
    },
    correct_answers: {
        V: V,
        Q: Qd,
        m: m
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