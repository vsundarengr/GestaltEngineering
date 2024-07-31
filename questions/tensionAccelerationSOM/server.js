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
            "acceleration": "\\(m/s^2\\)"
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
            "acceleration": "\\(ft/s^2\\)"
        }
    }
    
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
    unitsAcc = units[unitSystems[unitSel]].acceleration;

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

Ed = matprop.E;
nud = matprop.nud;
Gd = matprop.G;
sultd = matprop.sult;
tultd = matprop.tult;
console.log(`materialName = ${materialName}, E = ${E}, nud = ${nud}, G = ${G} \n`);


if (unitSel === 0){
    g = 9.81;
    md = 4*math.randomInt(20,60);
    m = md;
    diam = math.randomInt(8,16);
    d = diam*1e-3;
    W = m*g;
    sult = sultd/convToMega;
    tult = tultd/convToMega;
    E = Ed/convToGiga;
    G = G/convToGiga;
} else {
    g = 32.2;
    md = 2*math.randomInt(20,60);
    W = md;
    m = W/g;
    diam = math.randomInt(1,20)/16;
    d = diam;
    
    G = G/convToGiga;
    sult = sultd/convToKilo;
    tult = tultd/convToKilo;
    E = Ed/convToMega;
}

fs = 1.25*math.randomInt(2,6);
A = math.pi/4*d*d;
sigmax = sult/fs;
T = sigmax*A;
accfs = T/m - g;
console.log(`A = ${A}, sigmax = ${sigmax}`);

Ty = sult*A;
accmax = Ty/m-g;

data = {
    params: { 
        diam: diam,
        fs: fs,
        m: md,
        E: Ed,
        nud: nud,
        G: Gd,
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
        unitsAcc: unitsAcc
    },
    correct_answers: {
        T: T,
        accfs: accfs,
        accmax: accmax
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