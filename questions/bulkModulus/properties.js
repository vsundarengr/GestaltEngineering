const fluidProperties = {
    "water": {
        "sg": 1,
        "mu": 0.001,
        "Cp": 1,
        "K": 2
    },
    "gasoline": {
        "sg": 0.72,
        "mu": 0.00029,
        "Cp": 2.22,
        "K": 1.3
    },
    "diesel": {
        "sg": 0.8,
        "mu": 0.0022,
        "Cp": 2.05,
        "K": 1.3
    },
    "benzene": {
        "sg": 0.88,
        "mu": 0.0006,
        "Cp": 1.19,
        "K": 1.05
    },
    "ethanol": {
        "sg": 0.79,
        "mu": 0.0012,
        "Cp": 2.4,
        "K": 1.06
    }, 
    "acetone": {
        "sg": 0.78,
        "mu": 0.003,
        "Cp": 2.15,
        "K": 0.92
    },
    "corn oil": {
        "sg": 0.92,
        "mu": 0.02,
        "Cp": 1.9,
        "K": 1.66
    },
    "glycerine": {
        "sg": 1.26,
        "mu": 0.95,
        "Cp": 2.43,
        "K": 4.35
    },
    "honey": {
        "sg": 1.4,
        "mu": 10,
        "Cp": 2.52,
        "K": 3

    },
    "bromine":{
        "sg": 3.1,
        "mu": 0.00095,
        "Cp": 0.5,
        "K": 1.9
    }
}

const materialProperties = {
    "aluminum alloy": {
        "sg": 2.7,
        "E": [70,80],
        "sult": [310, 550],
        "linexp": 23,
        "nud": 0.33
    },
    "steel alloy": {
        "sg": 7.7,
        "E": [195,210],
        "sult": [550, 1400],
        "linexp": 12,
        "nud": 0.30
    },
    "copper": {
        "sg": 7.7,
        "E": [195,210],
        "sult": [550, 1400],
        "linexp": 12,
        "nud": 0.30
    },
    "brass": {
        "sg": 8.4,
        "E": [96,110],
        "sult": [300, 590],
        "linexp": 20,
        "nud": 0.34
    }
    
}

const getFluidProperties = (fluidName, unitSel) => {
    let fluid = fluidProperties[fluidName];

    if (unitSel === 0){
        rho = fluid.sg*1000;
        mud = fluid.mu;
    } else {
        rho = fluid.sg*62.4;
        mud = fluid.mu*0.020885;
    }

    fluid.mud = mud;
    fluid.rho = rho;

    return fluid;
}

module.exports = {
    fluidProperties,
    materialProperties,
    getFluidProperties
}