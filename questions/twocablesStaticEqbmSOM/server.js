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
tultd = matprop.tult;
console.log(`materialName = ${materialName}, E = ${E}, nud = ${nud}, G = ${G} tult = ${tult}\n`);

ang1 = 5*math.randomInt(4,15);
ang2 = 180 - 5*math.randomInt(21,30);

ang1rad = ang1*math.pi/180;
ang2rad = ang2*math.pi/180;

// for display
ang1d = 2*math.pi - ang1rad;
ang2d = 2*math.pi - ang2rad;


if (unitSel === 0 ) {
    m = 20*math.randomInt(1,20);
    g = 9.81;
    W = m*g;
    diam = 2*math.randomInt(2,10);
    d = diam/convToMilli;
    sult = sultd/convToMega;
    tult = tultd/convToMega;
    E = Ed/convToGiga;
    AB = 0.25*math.randomInt(3,17)
}
else {
    m = 20*math.randomInt(10,40);
    W = m;
    diam = math.randomInt(2,10)/20;
    d = diam;
    sult = sultd/convToKilo;
    tult = tultd/convToKilo;
    E = Ed/convToMega;
    AB = 0.5*math.randomInt(3,17);
}

A = math.pi/4*d*d;

TA = W*math.cos(ang2rad)/math.sin(ang1rad + ang2rad);
TB = W*math.cos(ang1rad)/math.sin(ang1rad + ang2rad);

sigA = TA/A;
sigB = TB/A;
fsA = sult/sigA;
fsB = sult/sigB;

epsa = sigA/E;
epsb = sigB/E;

epsla = nud*epsa;
epslb = nud*epsb;

OA = AB*math.sin(ang2rad)/(math.sin(ang1rad + ang2rad));
OB = AB*math.sin(ang1rad)/(math.sin(ang1rad + ang2rad));

console.log(`OA = ${OA}, OB = ${OB} AB = ${AB}`);

dloa = epsa*OA;
dlob = epsb*OB;

ddoa = epsla*d;
ddob = epslb*d;

if (unitSel === 0) {
    sigA = sigA*convToMega;
    sigB = sigB*convToMega;
    dloa = dloa*convToMilli;
    dlob = dlob*convToMilli;
    ddoa = ddoa*convToMicro;
    ddob= ddob*convToMicro;
    TA = TA/convToMilli;
    TB = TB/convToMilli;
} else {
    sigA = sigA*convToKilo;
    sigB = sigB*convToKilo;
    ddoa = ddoa*convToMicro;
    ddob = ddob*convToMicro;
    dloa = dloa*convToInch;
    dlob = dlob*convToInch;
}

data = {
    params: { 
        mass: m,
        angleA: ang1,
        angleB: ang2,
        diam:diam,
        nud: nud,
        E: Ed,
        sult: sultd,
        tult: tultd,
        AB: AB,
        materialName: materialName,
        unitsMass: unitsMass,
        unitsForce: unitsForce,
        unitsDiameter: unitsDiameter,
        masslabel: masslabel,
        unitsModulusElasticity: unitsModulusElasticity,
        unitsStress: unitsStress,
        unitsDLength: unitsDLength,
        unitsDDiameter: unitsDDiameter,
        unitsDiameter: unitsDiameter,
        unitsDist: unitsDist
    },
    correct_answers: {
        TA: TA,
        TB: TB,
        sigA: sigA,
        sigB: sigB,
        fsA: fsA,
        fsB: fsB,
        dloa: dloa,
        dlob: dlob,
        ddoa: ddoa,
        ddob: ddob,
        epsa: epsa,
        epsb: epsb

    },
    correct_answers_labels: {
        TA : "Tension in cable A",
        TB : "Tension in cable B",
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