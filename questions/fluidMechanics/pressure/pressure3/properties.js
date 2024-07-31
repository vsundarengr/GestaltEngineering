const math = require('mathjs');

const gasProperties = {
    "air": {
        "sg": 0.00125,
        "mu": 18.1e-6,
        "Cp": 1.005,
        "mw": 29
    },
    "nitrogen": {
        "sg": 0.001164,
        "mu": 17.2e-6,
        "Cp": 1.040,
        "mw": 28
    },
    "helium": {
        "sg": 0.000178,
        "mu": 1.96e-5,
        "Cp": 5.193,
        "mw": 4
    },
    "methane": {
        "sg": 0.000657,
        "mu": 1.10e-5,
        "Cp": 2.254,
        "mw": 16
    },
    "carbon dioxide": {
        "sg": 0.00187,
        "mu": 1.47e-5,
        "Cp": 0.00120,
        "mw": 44
    },
    "oxygen": {
        "sg": 0.00143,
        "mu": 20.65e-6,
        "Cp": 0.92,
        "mw": 32
    }
}

const fluidProperties = {
    "water": {
        "sg": 1,
        "mu": 0.001,
        "Cp": 1,
        "Tfreeze": 0,
        "Tboil": 100
    },
    "gasoline": {
        "sg": 0.72,
        "mu": 0.00029,
        "Cp": 2.22,
        "Tfreeze": -50,
        "Tboil": 150
    },
    "diesel": {
        "sg": 0.8,
        "mu": 0.0022,
        "Cp": 2.05,
        "Tfreeze": -60,
        "Tboil": 300
    },
    "benzene": {
        "sg": 0.88,
        "mu": 0.0006,
        "Cp": 1.19,
        "Tfreeze": 5.5,
        "Tboil": 80
    },
    "ethanol": {
        "sg": 0.79,
        "mu": 0.0012,
        "Cp": 2.4,
        "Tfreeze": -114,
        "Tboil": 78.4
    }, 
    "acetone": {
        "sg": 0.78,
        "mu": 0.003,
        "Cp": 2.15,
        "Tfreeze": -95,
        "Tboil": 56
    },
    "corn oil": {
        "sg": 0.92,
        "mu": 0.02,
        "Cp": 1.9,
    "Tfreeze": -11,
    "Tboil": 245
        
    },
    "gylcerine": {
        "sg": 1.26,
        "mu": 0.95,
        "Cp": 2.43,
        "Tfreeze": 17.8,
        "Tboil": 290
    },
    "honey": {
        "sg": 1.4,
        "mu": 10,
        "Cp": 2.52,
        "Tfreeze": -10,
        "Tboil": 80
    },
    "bromine":{
        "sg": 3.1,
        "mu": 0.00095,
        "Cp": 0.5,
        "Tfreeze": -7.2,
        "Tboil": 59
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

const getGasProperties = (material, unitSel) =>{
    let mat = gasProperties[material];

    if (unitSel === 0) {
        mat.rho = mat.sg*1000;

    } else {
        mat.rho = mat.sg*62.4;
        mat.mu = mat.mu*0.672;
        mat.Cp = math.round(100*mat.Cp*0.239)/100;
    }

    return mat;

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
    gasProperties,
    getMaterialProperties,
    getFluidProperties,
    getGasProperties
}