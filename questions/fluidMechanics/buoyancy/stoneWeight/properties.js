const fluidProperties = {
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


module.exports = {
    fluidProperties,
    materialProperties
}