const math = require('mathjs');

let  fluidProperties = {
    "water": {
        "sg": 1
    },
    "gasoline": {
        "sg": 0.72
    },
    "diesel": {
        "sg": 0.8
    },
    "benzene": {
        "sg": 0.88
    },
    "ethanol": {
        "sg": 0.79
    }, 
    "acetone": {
        "sg": 0.78
    },
    "corn oil": {
        "sg": 0.92
    },
    "gylcerine": {
        "sg": 1.26
    },
    "honey": {
        "sg": 1.4
    },
    "bromine":{
        "sg": 3.1
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

let waterProperties ={
    "si": {
        "sg": 1,
        "mu": 0.001,
        "Cp": 4.2,
        "Tfreeze": 0,
        "Tboil": 100,
        "Cpice": 2,
        "Cpsteam": 2,
        "hfus": 340,
        "hvap": 2270
    },
    "uscs": {
        "sg": 1,
        "mu": 0.00002088,
        "Cp": 1,
        "Tfreeze": 32,
        "Tboil": 212,
        "Cpice": 0.4777,
        "Cpsteam":0.4777,
        "hfus": 144,
        "hvap": 970

    }

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
    waterProperties,
    getMaterialProperties
}