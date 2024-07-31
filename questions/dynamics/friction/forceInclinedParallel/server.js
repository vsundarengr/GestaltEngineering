//const { data } = require('cheerio/lib/api/attributes.js');
const math = require('mathjs');
//const mathhelper = require('../../mathhelper.js');
//const mathhelper = require('../../helpers/mathhelper.js');

const generate = () => {

    unitSystems = ['si', "uscs"];
    masslabels = ["mass", "weight"];
    
    units = { 
        "si": { 
            "masslabel": "mass",
            "mass": "kg",
            "speed": "kmph",
            "dist": "m",
            "force": "N",
            "angle": "degrees",
            "work": "J",
            "acc": "\\( m/s^2 \\)"
        },
        "uscs": {
            "masslabel": "weight",
            "mass": "lb",
            "speed": "mph",
            "dist": "ft",
            "force": "lb",
            "angle": "degrees",
            "work": "ft-lb",
            "acc": "\\( ft/s^2 \\)"
        }
    }
    
    unitSel = math.randomInt(0,2);
    unitsDist = units[unitSystems[unitSel]].dist;
    unitsSpeed = units[unitSystems[unitSel]].speed;
    unitsMass = units[unitSystems[unitSel]].mass;
    unitsForce = units[unitSystems[unitSel]].force;
    unitsAngle = units[unitSystems[unitSel]].angle;
    unitsWork = units[unitSystems[unitSel]].work;
    unitsAcc = units[unitSystems[unitSel]].acc;
    masslabel = units[unitSystems[unitSel]].masslabel;


m = math.randomInt(10,31);
d = math.round(10*math.random(-1,1))/10;
theta = 5*math.randomInt(2,10);
thetarad = theta*math.pi/180;
musmax = math.tan(thetarad);
mus = math.round(math.random(0.8,0.9)*musmax,2);
muk = math.round(math.random(0.8,0.9)*mus,2);


let g;
if ( unitSel === 0) {
    g = 9.81;
    gc = 1;
}
else {
    g = 32.2;
    gc = 32.2;
}

W = m/gc*g;
Pmax = W*(math.sin(thetarad)+mus*math.cos(thetarad)  );
Pmin = W*(math.sin(thetarad)-mus*math.cos(thetarad) );
//Pmin = mus*W/(math.cos(thetarad) - mus*math.sin(thetarad));

if ( d< 0 ){
    direction = 'down';
    P = math.round(math.random(0.5*Pmin, 0.85*Pmin),1);
    a = P/(m/gc) - g*(math.sin(thetarad) - muk*math.cos(thetarad));
}
else {
    direction = "up";
    P = math.round(math.random(1.1*Pmax, 1.6*Pmax));
    a = P/(m/gc) - g*(math.sin(thetarad) + muk*math.cos(thetarad));
}

WP = P*d;
WW = (-1)*W*math.sin(thetarad)*d;
WN = 0;
Wf = (-1)*(muk*math.cos(thetarad))*W*d;

data = {
    params: { 
        P: P,
        m: m,
        theta: theta,
        muk: muk,
        mus: mus,
        distance: math.abs(d),
        direction: direction,
        unitsForce: unitsForce,
        unitsDist: unitsDist,
        unitsWork: unitsWork,
        unitsMass: unitsMass,
        unitsAcc: unitsAcc,
        masslabel: masslabel,
    },
    correct_answers: {
        WP: WP,
        WW: WW,
        WN: WN,
        Wf: Wf,
        a:a, 
        Pmin: Pmin,
        Pmax: Pmax

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