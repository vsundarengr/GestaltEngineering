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
            "flowRate": "liters per min",
            "heatRate": "kW",
            "massRate": "kg/s",
            "pressure": "kPa",
            "volume": "\\( m^3/s \\)"
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
            "flowRate": "gpm",
            "heatRate": "BTU/s",
            "massRate": "lb/s",
            "pressure": "psi",
            "volume": "\\( ft^3/s \\)"
        }
    }
    //unitSel = 0;
    unitSel = math.randomInt(0,2); //SI
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

fluidProperties = props.fluidProperties;
fluidKeys = Object.keys(fluidProperties);
numFluids = fluidKeys.length;
fluidIndex = math.randomInt(0,numFluids);
fluidName = fluidKeys[fluidIndex];
fluidprop = props.getFluidProperties(fluidName, unitSel);
Cp = fluidprop.Cp;
sg= fluidprop.sg;

gasProperties = props.gasProperties;
fluidKeys = Object.keys(gasProperties);
numFluids = fluidKeys.length;
fluidIndex = math.randomInt(0,numFluids);
gasName = fluidKeys[fluidIndex];
console.log("Gas name = ", gasName);
gasProp= props.getGasProperties(gasName, unitSel);

mw = gasProp.mw;

//sg = 1.000 + math.randomInt(24, 30)/1000;

if (unitSel === 0){
    g = 9.81;
    H = 0.25*math.randomInt(4,10);
    perliq = math.randomInt(30,80);
    fracliq = perliq/100;
    pliq = fracliq*H*sg*g;
    pgas = 4*math.randomInt(1,8);
    pgage = pliq + pgas;
    pabs = 101.3 + pgas;
    Td = math.randomInt(-10,120);
    T = Td + 273.15;
    Rbar = 8.314;
    Rg = Rbar/mw;
    D = 0.25*math.randomInt(2,18);
    Hgas = (1-fracliq)*H;
    V = math.pi/4*D*D*Hgas;
    console.log("D = ", D, "V = ", V, "Rg = ", Rg, "T = ", T);
    m = pabs*V/(Rg*T);
    rhog = m/V;

    ddh = 0.1*math.randomInt(5,20);
    dh = ddh*1e-3;
    vel = math.sqrt(2*pgage/sg);
    vdot = math.pi/4*dh*dh*vel;
    vdot = vdot*1000*60; // convert to lpm

    angled = 3*math.randomInt(15,23);
    angle = math.pi*angled/180;
    vx = vel*math.cos(angle);
    vy = vel*math.sin(angle);
    Htank = 0.25*math.randomInt(2,9);
    t = (vy + math.sqrt(vy*vy + 2*g*Htank))/g;
    xrange = vx*t;
} else {
    g = 1;
    H = 0.5*math.randomInt(4, 20);
    perliq = math.randomInt(30,80);
    fracliq = perliq/100;
    pliq = fracliq*H*sg*62.4/144;
    pgas = 0.5*math.randomInt(1,8);
    pgage = pliq + pgas;
    pabs = 14.7 + pgas;
    Td = math.randomInt(-10,120);
    T = Td + 460;
    Rbar = 1545.35;
    Rg = Rbar/mw;
    D = 0.25*math.randomInt(2,18);
    Hgas = (1-fracliq)*H;
    V = math.pi/4*D*D*Hgas;
    console.log("D = ", D, "V = ", V, "Rg = ", "T = ", T);
    m = (pabs*144)*V/(Rg*T);
    rhog = m/V;

    ddh = 0.01*math.randomInt(5,20);
    dh = ddh/12;
    vel = math.sqrt(2*pgage*144/(sg*62.4/32.2));
    vdot = math.pi/4*dh*dh*vel;
    vdot = vdot*7.5*60; // convert to gpm

    gc = 32.2;
    angled = 3*math.randomInt(15,22);
    angle = math.pi*angled/180;
    vx = vel*math.cos(angle);
    vy = vel*math.sin(angle);
    Htank = 0.25*math.randomInt(8,30);
    t = (vy+ math.sqrt(vy*vy + 2*gc*Htank))/gc;
    xrange = vx*t;

}


data = {
    params: {
        H: H,
        perliq: perliq,
        D: D,
        T : Td,
        sg: sg,
        pgas: pgas,
        dh: ddh,
        fluidName: fluidName,
        gasName: gasName,
        mw: mw,
        xrange: math.round(xrange*100)/100,
        Htank: Htank,
        angled: angled,
        masslabel: masslabel,
        unitsMass: unitsMass,
        unitsDiameter: unitsDiameter,
        unitsCp: unitsCp,
        unitsHeat: unitsHeat,
        unitsSpeed: unitsSpeed,
        unitsFlowRate: unitsFlowRate,
        unitsHeatRate: unitsHeatRate,
        unitsMassRate: unitsMassRate,
        unitsPressure: unitsPressure,
        unitsTemperature: unitsTemperature,
        unitsDist: unitsDist
    },
    correct_answers: {
        pgage: pgage,
        pgas: pgas,
        vel: vel,
        vdot: vdot,
        time: t
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