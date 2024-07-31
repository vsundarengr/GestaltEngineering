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
            "dim": "mm",
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
            "energy": "J"
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
            "dDiameter": "\\( \\mu \\,inch\\) ",
            "diameter" : "inch",
            "energy": "ft-lb"
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

convToMega = 1e-6;
convToGiga = 1e-9;
convToKilo = 1e-3;
convToCenti = 1e2;
convToMilli = 1e3;
convToMicro = 1e6;
convToInch = 12;


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
console.log(`materialName = ${materialName}, E = ${E}, nud = ${nud}, G = ${G} \n`);

diam = math.randomInt(12,51);



if (unitSel === 0){
    Fd = math.randomInt(10,25);
    F = Fd*1000;
    E = Ed/convToGiga
    G = Gd/convToGiga;
    sult = sultd/convToMega;
    diam = 3*math.randomInt(8,24);
    d = diam/1000;
    L = math.randomInt(4,10)*diam;
} else {
    Fd = 15*math.randomInt(10,25);
    F = Fd;
    diam = math.randomInt(25,200)/100;
    d = diam;
   // d = diam/12;
    E = Ed/convToMega;
    G = Gd/convToMega;
    sult = sultd/convToKilo;
    L = math.round(10*math.randomInt(8,16)*diam);
}

A = math.pi/4*d*d;
sigma = F/A;
eps = sigma/E;
dL = eps*L;
fs = sult/sigma;
epsl = eps*nud;
dd = epsl*d;

if (unitSel === 0){
    sigma = sigma*convToMega;
    dd = dd*convToMicro;
} else {
    sigma = sigma*convToKilo;
    dd = dd*convToMicro;
}

data = {
    params: { 
        Fd: Fd,
        diam: diam,
        E: Ed,
        L: L,
        sult: sultd,
        nud: nud,
        materialName: materialName,
        masslabel: masslabel,
        unitsMass: unitsMass,
        unitsForce: unitsForce,
        unitsModulusElasticity: unitsModulusElasticity,
        unitsStress: unitsStress,
        unitsDLength: unitsDLength,
        unitsDDiameter: unitsDDiameter,
        unitsDiameter: unitsDiameter,
        unitsDist: unitsDist
    },
    correct_answers: {
        sigma: sigma,
        eps: eps,
        fs: fs,
        dL: dL,
        dd: dd
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