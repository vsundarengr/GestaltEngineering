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
            "power": "MW",
            "heatingValue": "MJ/kg",
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
            "power": "MW",
            "heatingValue": "BTU/lb",
            "massRate": "lb/s"
        }
    }
    
    unitSel = 1;
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
    unitsPower = units[unitSystems[unitSel]].power;
    unitsHV = units[unitSystems[unitSel]].heatingValue;
    unitsMassRate = units[unitSystems[unitSel]].massRate;
    

convToMega = 1e-6;
convToGiga = 1e-9;
convToKilo = 1e-3;
convToCenti = 1e2;
convToMilli = 1e3;
convToMicro = 1e6;



if (unitSel === 0) {
    convToAbs = 273;
    Tmax = 5*math.randomInt(120,200);
    Tmin = math.randomInt(-20,40);
    hvd = math.randomInt(45, 50);
    hv = hvd;
}
else {
    convToAbs = 540;
    Tmax = 5*math.randomInt(250,400);
    Tmin = math.randomInt(-4,110);
    hvd = 1000*math.randomInt(6,22);
    hv = hvd;
}


effmax = 1 - (Tmin+convToAbs)/(Tmax+convToAbs);
effmaxd = effmax*100;

Pout = 10*math.randomInt(1,50);


fracd = 5*math.randomInt(8,18);
frac = fracd/100;
eff = frac*effmax;
if (unitSel === 0) {
    Pin = Pout/eff;
    mdot = Pin/hv;
} else {
    Pin = Pout/eff;
    Pin = Pin*1055;
    mdot = Pin/hv;

}


data = {
    params: { 
        hv: hvd,
        Tmin: Tmin,
        Tmax: Tmax,
        Pout: Pout,
        frac: fracd,
        masslabel: masslabel,
        unitsMassRate: unitsMassRate,
        unitsHV: unitsHV,
        unitsTemperature: unitsTemperature,
        unitsPower: unitsPower
    },
    correct_answers: {
        mdot: mdot,
        Pin: Pin,
        effmax: effmaxd,
        eff: eff
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