//const { data } = require('cheerio/lib/api/attributes.js');
const math = require('mathjs');
//const mathhelper = require('../../mathhelper.js');
const mathhelper = require('../../helpers/mathhelper.js');

const generate = () => {

    unitSystems = ['si', "uscs"];
    masslabels = ["mass", "weight"];
    
    units = { 
        "si": { 
            "masslabel": "mass",
            "mass": "kg",
            "speed": "m/s",
            "dist": "m",
            "force": "N",
            "angle": "degrees",
            "work": "J"
        },
        "uscs": {
            "masslabel": "weight",
            "mass": "lb",
            "speed": "ft/s",
            "dist": "ft",
            "force": "lb",
            "angle": "degrees",
            "work": "ft-lb"
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


md = 5*math.randomInt(2,10);
if ( unitSel === 0) {
    g = 9.81;
    m  = md;
} else {
    g = 32.2;
    m = md/g;
}

HA = math.randomInt(40,60);
HB = math.round(math.random(0.04,0.11)*HA);
HC = 0.4*HA;
R = math.round(1.5*HA)/10;
HD = math.randomInt(4,9)/10*(HA - 2.5*R); // max height to avoid loss of contact at F
HD = math.round(10*HD)/10;
HF = HD + 2*R;
HE = HD + R;
HG = HD + R;

vb = math.sqrt(2*g*(HA-HB));
vc = math.sqrt(2*g*(HA-HC));
vd = math.sqrt(2*g*(HA-HD));
vf = math.sqrt(2*g*(HA-HF));
ve = math.sqrt(2*g*(HA-HE));



Nd = m*(g + vd*vd/R);
Ne = m*ve*ve/R;
Nf = m*(vf*vf/R-g);

data = {
    params: { 
      HA: HA,
      HB: HB,
      HC: HC,
      HD: HD,
      R: R,
      mass: md,
      masslabel: masslabel,
      unitsMass: unitsMass,
      unitsDist: unitsDist,
      unitsSpeed: unitsSpeed
    },
    correct_answers: {
        vb: vb,
        vc: vc,
        vd: vd,
        ve: ve,
        vf: vf,
        Nd: Nd,
        Ne: Ne,
        Nf: Nf
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