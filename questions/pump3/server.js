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
            "flowRate": "lpm",
            "heatRate": "kW",
            "massRate": "kg/s",
            "pressure": "kPa",
            "workPerMass": "J/kg",
            "power": "W"
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
            "massRate": "lb/s",
            "pressure": "psi",
            "workPerMass": "lb-ft/lb",
            "power": "hp"
        }
    }
    //unitSel = 1;
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
    unitsPressure = units[unitSystems[unitSel]].pressure;
    unitsWorkPerMass = units[unitSystems[unitSel]].workPerMass;
    unitsPower = units[unitSystems[unitSel]].power;
    

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
    H1 = math.randomInt(1,5);
    H2 = math.randomInt(10,20);
    Qd = math.randomInt(2,12);
    Q = Qd/(60*1000); 
    mdot = rho*Q;
    Dd = 2*math.randomInt(6,12);
    D = Dd/1000;
    A = math.pi/4*D*D;
    V = Q/A;
    g = 9.81;
    wpm = g*(H2+H1);
    powerw= mdot*wpm;
    effd = math.randomInt(60,80);
    eff = effd/100;
    powerin = powerw/eff;
    P3 = -rho*(V*V/2 + g*H1);
    P4 = P3 + rho*wpm;
    P5 = P4 - rho*g*H2;
    P3 = P3/1000;
    P4 = P4/1000;
    P5 = P5/1000;

} else {
    H1 = math.randomInt(1,5);
    H2 = math.randomInt(10,20);
    Qd = math.randomInt(2,12);
    Q = Qd/(60*7.5); 
    mdot = rho*Q;
    Dd = 0.125*math.randomInt(3,13);
    D = Dd/12;
    A = math.pi/4*D*D;
    V = Q/A;
    g = 32.2;
    wpm = g*(H2+H1);
    powerw= mdot/g*wpm*1/550;
    effd = math.randomInt(60,80);
    eff = effd/100;
    powerin = powerw/eff;
    rhoslug = rho/32.2;
    P3 = rhoslug*(-V*V/2 -g*H1);
    P4 = P3 + rhoslug*wpm;
    P5 = P4 - rhoslug*g*H2;
    P3 = P3/144;
    P4 = P4/144;
    P5 = P5/144;
}



data = {
    params: { 
        H1: H1,
        H2: H2,
        Qd: Qd,
        sg: sg,
        rho: rho,
        eff: effd,
        mdot: mdot,
        D: Dd,
        fluidName: fluidName,
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
        unitsPower: unitsPower
    },
    correct_answers: {
        V: V,
        P3: P3,
        P4: P4,
        P5: P5,
        wpm: wpm,
        powerw: powerw,
        powerin: powerin
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