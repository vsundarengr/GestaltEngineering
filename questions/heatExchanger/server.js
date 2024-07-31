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
    

convToMega = 1e-6;
convToGiga = 1e-9;
convToKilo = 1e-3;
convToCenti = 1e2;
convToMilli = 1e3;
convToMicro = 1e6;



fluidProperties = props.fluidProperties;
fluidKeys = Object.keys(fluidProperties);
numFluids = fluidKeys.length;
fluidIndex1 = math.randomInt(0,numFluids);
fluidName1 = fluidKeys[fluidIndex1];
fluidprop1 = props.getFluidProperties(fluidName1, unitSel);
Cp1 = fluidprop1.Cp;
rho1 = fluidprop1.rho;
sg1= fluidprop1.sg;
Tboil1 = fluidprop1.Tboil;
Tfreeze1 = fluidprop1.Tfreeze;

fluidIndex2 = math.randomInt(0,numFluids);
fluidName2 = fluidKeys[fluidIndex2];
fluidprop2 = props.getFluidProperties(fluidName2, unitSel);
Cp2 = fluidprop2.Cp;
rho2 = fluidprop2.rho;
sg2= fluidprop2.sg;
Tboil2 = fluidprop2.Tboil;
Tfreeze2= fluidprop2.Tfreeze;


Tci = math.random(0.1,0.2)*(Tboil1-Tfreeze1) + Tfreeze1;
Tci = math.round(Tci);
Tco = math.random(0.25, 0.35)*(Tboil1-Tfreeze1) + Tfreeze1;
Tco = math.round(Tco);
Cpc = Cp1;
rhoc = rho1;

Thi = math.random(0.8,0.9)*(Tboil2 - Tco) + Tco;
Thi = math.round(Thi);
Tho = math.random(0.3, 0.5)*(Tboil2 - Tco) + Tco;
Tho = math.round(Tho);
Cph = Cp2;
rhoh = rho2;


mc = 0.5*math.randomInt(1,10);

Q = mc*Cpc*(Tco - Tci);
mh = Q/(Cph*(Thi-Tho));

if (unitSel === 0){

} else {
    
}



data = {
    params: { 
        mh: mh,
        mc: mc,
        Tho: Tho,
        Thi: Thi,
        Tci: Tci,
        Tco: Tco,
        Cph: Cph,
        rho1: rho1,
        sg1: sg1,
        Cpc: Cpc,
        rho2: rho2,
        sg2: sg2,
        fluidName1: fluidName1,
        fluidName2: fluidName2,
        masslabel: masslabel,
        unitsMass: unitsMass,
        unitsTemperature: unitsTemperature,
        unitsCp: unitsCp,
        unitsHeat: unitsHeat,
        unitsSpeed: unitsSpeed,
        unitsFlowRate: unitsFlowRate,
        unitsHeatRate: unitsHeatRate,
        unitsMassRate: unitsMassRate
    },
    correct_answers: {
        mh: mh,
        Q: Q
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