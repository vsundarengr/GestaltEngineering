//const { data } = require('cheerio/lib/api/attributes.js');
const math = require('mathjs');
const mathhelper = require('../../mathhelper.js');
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
            "angle": "degrees"
        },
        "uscs": {
            "masslabel": "weight",
            "mass": "lb",
            "speed": "mph",
            "dist": "ft",
            "force": "lb",
            "angle": "degrees"
        }
    }
    
    unitSel = math.randomInt(0,2);
    unitsDist = units[unitSystems[unitSel]].dist;
    unitsSpeed = units[unitSystems[unitSel]].speed;
    unitsMass = units[unitSystems[unitSel]].mass;
    unitsForce = units[unitSystems[unitSel]].force;
    unitsAngle = units[unitSystems[unitSel]].angle;
    masslabel = units[unitSystems[unitSel]].masslabel;    

L = math.randomInt(75,150);
H1 = math.randomInt(20,75);
Lt = math.randomInt(math.round(L/2), L);
L1 = math.randomInt(math.round(L/4), math.round(3*L/4));

M = math.randomInt(50,100);
m = math.randomInt(10,30);

if (unitSel === 0) {
    g = 9.81;
}
else {
    g = 1;
}

thetarad = math.atan(H1/Lt);
theta = thetarad*180/math.pi;

T = 1/(Lt*math.sin(thetarad))*(0.5*M*g*L + m*g*L1);
Ox = T*math.cos(thetarad);
Oy = (M+m)*g - T*math.sin(thetarad);

let svgString = `<svg
xmlns="http://www.w3.org/2000/svg"
xmlns:xlink="http://www.w3.org/1999/xlink"
width = "400" height = "400">
<defs>
   <marker id="arrowhead" markerWidth="10" markerHeight="7" 
   refX="10" refY="3.5" orient="auto">
     <polygon points="0 0, 10 3.5, 0 7" style="fill: red"/>
   </marker>
 </defs> \n`;
 svgString += `<g transform = 'matrix(1 0 0 1 100 200)'> \n`;
 svgString += `<line x1= "0" y1= "0" x2="${L}" y2="0" style = "stroke: blue;
 stroke-width: 4;
 stroke-linecap: round"/> \n`;
 svgString += `<line x1= "0" y1= "25" x2="0" y2="-100" style = "stroke: brown;
 stroke-width: 8;
 stroke-linecap: round"/> \n`;
 svgString += `<line x1= "0" y1= "${(-1)*H1}" x2="${Lt}" y2="0" style = "stroke: red;
 stroke-width: 1.5;
 stroke-linecap: round"/> \n`;
 svgString += `<line x1= "${L1}" y1= "0" x2="${L1}" y2="20" style = "stroke: green;
 stroke-width: 1.5;
 stroke-linecap: round"/> \n`;
 svgString += `<rect x = ${L1-5} y="20" width="10" height="15" style="fill: green" /> \n `;
 svgString += `<circle cx="0" cy="0" r="4" style="fill: lightgrey" /> \n`;
svgString += `<text x="-15" y="0" style="font: 11px sans-serif" > O </text> \n`;
svgString += `<text x="-15" y="${(-1)*H1}" style="font: 11px sans-serif" > A </text> \n`;
svgString += `<text x="${Lt}" y="15" style="font: 11px sans-serif" > B </text> \n`;
svgString += `<text x="${L1}" y="-10" style="font: 11px sans-serif" > D </text> \n`
 svgString += `</g> \n`;
svgString += `</svg> \n`;

console.log('SVG STRING IS ', svgString);

data = {
    params: { 
        masslabel: masslabel,
        unitsMass: unitsMass,
        unitsDist: unitsDist,
        unitsForce: unitsForce,
        M: M,
        m: m,
        L: L,
        H1: H1,
        Lt: Lt,
        L1: L1,
        svgString: svgString
    },
    correct_answers: {
        tension: T,
        Ox: Ox,
        Oy: Oy
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