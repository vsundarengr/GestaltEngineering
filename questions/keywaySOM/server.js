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
            "torque": "N-m"
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
            "torque": "lb-ft"
        }
    }
    
    //unitSel = 1; //SI
    unitSel = math.randomInt(0,2);
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
    unitsDDiameter = units[unitSystems[unitSel]].dDiameter;
    unitsDiameter = units[unitSystems[unitSel]].diameter;
    unitsTorque = units[unitSystems[unitSel]].torque;

convToMega = 1e-6;
convToGiga = 1e-9;
convToKilo = 1e-3;
convToCenti = 1e2;
convToMilli = 1e3;
convToMicro = 1e6;


materialProperties = props.materialProperties;
matKeys = Object.keys(materialProperties);
numMats = matKeys.length;
matIndex = math.randomInt(0,numMats);
materialName = matKeys[matIndex];
matprop = props.getMaterialProperties(materialName, unitSel);

E = matprop.E;
nud = matprop.nud;
G = matprop.G;
sultd = matprop.sult;
tultd = matprop.tult;
console.log(`materialName = ${materialName}, E = ${E}, nud = ${nud}, G = ${G} tult = ${tult}\n`);




Fd = math.randomInt(20,150); // Force in kN or lb

if (unitSel === 0){
    R = math.randomInt(10,25); // shaft radius in mm
    D = 2*R;
    ad = math.round(10*0.4*R)/10;
    bd = math.round(10*0.6*R)/10;
    a = ad/convToMilli;
    b = bd/convToMilli;
    F = Fd*100;
    Td = F*R*1e-3;
    G = G/convToGiga;
    sult = sultd/convToMega;
    tult = tultd/convToMega;
} else {
    R = 0.125*math.randomInt(3,16);
    D = 2*R;
    ad = math.round(100*0.3*R)/100;
    bd = math.round(100*0.4*R)/100;
    a = ad;
    b = bd;
    F = Fd;
    Td = math.round(10*Fd*(R/12))/10;
    F = Td/(R/12);
    G = G/convToMega;
    sult = sultd/convToKilo;
    tult = tultd/convToKilo;
}

tau = F/(a*b);
fs = tult/tau;
console.log(`Fd = ${Fd}, tau = ${tau}, fs = ${fs}`);
if (unitSel === 0) {
    tau = tau*convToMega;

} else {
    tau = tau*convToKilo;
}

data = {
    params: { 
        Td: Td,
        a: ad,
        b: bd,
        R: R,
        D: D,
        E: E,
        nud: nud,
        sult: sultd,
        tult: tultd,
        materialName: materialName,
        masslabel: masslabel,
        unitsMass: unitsMass,
        unitsModulusElasticity: unitsModulusElasticity,
        unitsStress: unitsStress,
        unitsDLength: unitsDLength,
        unitsDDiameter: unitsDDiameter,
        unitsDiameter: unitsDiameter,
        unitsDist: unitsDist,
        unitsTorque: unitsTorque
    },
    correct_answers: {
        tau: tau,
        fs: fs
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