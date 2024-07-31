//const { data } = require('cheerio/lib/api/attributes.js');
const math = require('mathjs');
//const mathhelper = require('../../mathhelper.js');
const props = require('./properties.js');

//const mathhelper = require('../../helpers/mathhelper.js');

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
            "temperature": "degree C",
            "heat": "kJ",
            "Cp": "kJ/kg C",
            "flowRate": "\\( m^3/s \\)",
            "heatRate": "kW",
            "massRate": "kg/s",
            "pressure": "kPa"
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
            "temperature": "degree F",
            "heat": "BTU",
            "Cp": "BTU/ lb F",
            "flowRate": "\\( ft^3/s \\)",
            "heatRate": "BTU/s",
            "massRate": "lb/s",
            "pressure": "psi"
        }
    }
    unitSel = 0;
    //unitSel = math.randomInt(0,2); //SI
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
    unitsDiameter = units[unitSystems[unitSel]].diameter;
    unitsDDiameter = units[unitSystems[unitSel]].dDiameter;
    unitsTemperature = units[unitSystems[unitSel]].temperature;
    unitsCp = units[unitSystems[unitSel]].Cp;
    unitsHeat = units[unitSystems[unitSel]].heat;
    unitsFlowRate = units[unitSystems[unitSel]].flowRate;
    unitsHeatRate = units[unitSystems[unitSel]].heatRate;
    unitsMassRate = units[unitSystems[unitSel]].massRate;
    unitsPressure = units[unitSystems[unitSel]].pressure;
    

convToMega = 1e-6;
convToGiga = 1e-9;
convToKilo = 1e-3;
convToCenti = 1e2;
convToMilli = 1e3;
convToMicro = 1e6;


fluidProperties = props.gasProperties;
fluidKeys = Object.keys(fluidProperties);
numFluids = fluidKeys.length;
fluidIndex = math.randomInt(0,numFluids);
fluidName = fluidKeys[fluidIndex];
fluidprop= props.getGasProperties(fluidName, unitSel);
Cp = fluidprop.Cp;

mw = fluidprop.mw;


if (unitSel === 0 ){
    Rbar = 8.314;
    p1 = 4*math.randomInt(24,48);
    T = 300;
    Rg = Rbar/mw;
    rho = p1/(Rg*T);
    sg = rho/1000;
    V1 = 2*math.randomInt(10,50); 
    Dd1 = 2*math.randomInt(8, 26);
    Dd2 = math.round(Dd1*math.random(0.4, 0.7));

    D1 = Dd1/1000;
    D2 = Dd2/1000;
    A1 = math.pi/4*D1*D1;
    A2 = math.pi/4*D2*D2;

   
    V2 = V1*(D1/D2)**2;
    rho = sg*1000;
   
    p2 = p1 + rho/(2*1000)*(V1*V1 - V2*V2);
    vdot = A1*V1;
    mdot = rho*vdot;
    rhog = rho;
    vdot = A1*A2*math.sqrt( 2*(p1-p2)*1000/(rhog*(A1*A1 - A2*A2)));
    V1calc = vdot/A1;
} else {
    Rbar = 1545.264;
    p1 = 14.7 + 0.2*math.randomInt(-10,20);

    T = 535;
    Rg = Rbar/mw;
    rho = (p1*144)/(Rg*T);
    sg = rho/62.4;

    V1 = 2*math.randomInt(10,50); 
    Dd1 = 0.25*math.randomInt(1,16);
    Dd2 = math.round(100*Dd1*math.random(0.35, 0.7))/100;

    D1 = Dd1/12;
    D2 = Dd2/12;

    A1 = math.pi/4*D1*D1;
    A2 = math.pi/4*D2*D2;
   
    V2 = V1*(D1/D2)**2;
   
    p2 = p1 + rho/(2*32.2*144)*(V1*V1 - V2*V2);
    p2 = math.round(p2*100)/100;
    rhog = rho/32.2;
    vdot = A1*A2*math.sqrt( 2*(p1-p2)*144/(rhog*(A1*A1 - A2*A2)));
    // vdot = A1*V1;
    mdot = rho*vdot;
    V1calc = vdot/A1;
    

}

sg = math.round(1e6*sg)/1e6;






data = {
    params: { 
        D1: Dd1,
        D2: Dd2,
        V1: V1,
        p1: p1,
        p2: p2,
        sg: sg,
        rho: rho,
        fluidName: fluidName,
        masslabel: masslabel,
        unitsMass: unitsMass,
        unitsTemperature: unitsTemperature,
        unitsCp: unitsCp,
        unitsHeat: unitsHeat,
        unitsSpeed: unitsSpeed,
        unitsFlowRate: unitsFlowRate,
        unitsHeatRate: unitsHeatRate,
        unitsMassRate: unitsMassRate,
        unitsPressure: unitsPressure,
        unitsDiameter: unitsDiameter
    },
    correct_answers: {
        vdot: vdot,
        mdot: mdot,
        V1calc: V1calc
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