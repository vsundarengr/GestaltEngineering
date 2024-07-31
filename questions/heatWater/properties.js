const math = require('mathjs');

const fluidProperties = {
    "water": {
        "sg": 1,
        "mu": 0.001,
        "Cp": 4.2
    },
    "gasoline": {
        "sg": 0.72,
        "mu": 0.00029,
        "Cp": 2.22
    },
    "diesel": {
        "sg": 0.8,
        "mu": 0.0022,
        "Cp": 2.05
    },
    "benzene": {
        "sg": 0.88,
        "mu": 0.0006,
        "Cp": 1.19
    },
    "ethanol": {
        "sg": 0.79,
        "mu": 0.0012,
        "Cp": 2.4
    }, 
    "acetone": {
        "sg": 0.78,
        "mu": 0.003,
        "Cp": 2.15
    },
    "corn oil": {
        "sg": 0.92,
        "mu": 0.02,
        "Cp": 1.9
    },
    "glycerine": {
        "sg": 1.26,
        "mu": 0.95,
        "Cp": 2.43
    },
    "honey": {
        "sg": 1.4,
        "mu": 10,
        "Cp": 2.52
    },
    "bromine":{
        "sg": 3.1,
        "mu": 0.00095,
        "Cp": 0.5
    }
}

let materialProperties = {
    "aluminum alloy": {
        "sg": 2.7,
        "Es": [70,80],
        "sults": [310, 550],
        "linexp": 23,
        "nud": 0.33,
        "Cp": 0.9
    },
    "steel alloy": {
        "sg": 7.7,
        "Es": [195,210],
        "sults": [550, 1400],
        "linexp": 12,
        "nud": 0.30,
        "Cp": 0.42
    },
    "copper": {
        "sg": 7.7,
        "Es": [195,210],
        "sults": [550, 1400],
        "linexp": 12,
        "nud": 0.30,
        "Cp": 0.386
    },
    "brass": {
        "sg": 8.4,
        "Es": [96,110],
        "sults": [300, 590],
        "linexp": 20,
        "nud": 0.34,
        "Cp": 0.380
    }
}

const getFluidProperties = (material, unitSel) =>{
    let mat = fluidProperties[material];

    if (unitSel === 0) {
        mat.rho = mat.sg*1000;

    } else {
        mat.rho = mat.sg*62.4;
        mat.mu = mat.mu*0.672;
        mat.Cp = math.round(100*mat.Cp*0.239)/100;
    }

    return mat;

}

const getMaterialProperties = (material, unitSel)=> {
    let mat = materialProperties[material];
    E = math.randomInt(mat.Es[0],mat.Es[1]);
    sult = math.randomInt(mat.sults[0], mat.sults[1]);
    nud = mat.nud;
    Cp = mat.Cp;
    G = E/(2*(1+nud));

    if (unitSel === 0) {

    }
    else {
       E = E*145037.737734*1e-6;
       G = G*145037.737734*1e-6;
       sult = sult*145.037738*1e-3;
       Cp = math.round(100*Cp*0.239)/100;
    }

    materialProperties[material].E = E;
    materialProperties[material].G = G;
    materialProperties[material].sult = sult;
    materialProperties[material].Cp = Cp;
    return mat;
}


module.exports = {
    fluidProperties,
    materialProperties,
    getMaterialProperties,
    getFluidProperties
}