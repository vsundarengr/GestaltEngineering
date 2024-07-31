const math = require('mathjs');
// const mathhelper = require('../../helpers/mathhelper.js');
//const mathhelper = require('../../mathhelper.js');
const generate = () => {

    unitSystems = ['si', "uscs"];
    masslabels = ["mass", "weight"];

    units = { 
        "si": { 
            "massLabel": "mass",
            "mass": "kg",
            "dist": "m",
            "force": "N",
            "modulus": "Pa",
            "area":  "mm^2",
            "stress": "MPa"
        },
        "uscs": {
            "massLabel": "weight",
            "mass": "lb",
            "dist": "feet",
            "force": "lb",
            "modulus": "psi",
            "area": " in^2 ",
            "stress": "Kpsi"
        }
    }
    
    unitSel = math.randomInt(0,2);
    unitsMass = units[unitSystems[unitSel]].mass;
    unitsDist = units[unitSystems[unitSel]].dist;
    unitsForce = units[unitSystems[unitSel]].force;
    massLabel = units[unitSystems[unitSel]].massLabel;
    unitsModulus = units[unitSystems[unitSel]].modulus;
    unitsArea = units[unitSystems[unitSel]].area;
    unitsStress = units[unitSystems[unitSel]].stress;



 
//assign numerical values to variables 
    forceP = (math.randomInt(500,1000)); // vertical load P 
    massSteel = (math.randomInt(500,900)); // mass of steel bar
    massCopper = (math.randomInt(100,500)); // mass of copper bar
    // cross sectional area of steel bar
    // cross sectional area of copper bar 

// assign values for modulus of Elasticity 
if (unitSel === 0) {
    modulusElasticitySteel = 2.1; 
    modulusElasticityCopper = 1.2;
    n = 11; 
    g = 9.81;
    areaSteel = (math.randomInt(75,150)); 
    areaCopper = (math.randomInt(75,150)); 

} else {
    modulusElasticitySteel = 30;
    modulusElasticityCopper = 18;
    n = 6;
    g = 1;
    areaSteel = math.round((math.randomInt(5,21))/10); 
    areaCopper = math.round((math.randomInt(5,21))/10); 

}

    
//calculate for the sum of forces 

forceCopper = (g*massCopper) + forceP; 
forceSteel = (g*massSteel) + forceCopper;

//calculate max stress 

sigmaCopper = forceCopper/areaCopper; 
sigmaSteel = forceSteel/areaSteel; 


if (unitSel === 0) {

} else {
    sigmaCopper = sigmaCopper/1000;
    sigmaSteel = sigmaSteel/1000;
}




data = {
    params: {
        forceP:forceP,
        massSteel:massSteel,
        massCopper:massCopper,
        areaSteel:areaSteel,
        areaCopper:areaCopper,
        modulusElasticitySteel:modulusElasticitySteel,
        modulusElasticityCopper:modulusElasticityCopper,
        n:n, 
        
        unitsForce:unitsForce,
        unitsDist:unitsDist,
        unitsMass:unitsMass,
        unitsModulus:unitsModulus,
        unitsArea: unitsArea,
        unitsStress: unitsStress,
        massLabel: massLabel
        
        
},

    correct_answers: { 
    sigmaCopper:sigmaCopper,
    sigmaSteel:sigmaSteel,
},
   nDigits: 2,
   sigfigs:2
}

console.log(data);
return data;
}
generate();
module.exports = {
    generate
}