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

L = math.randomInt(40,100);
H = math.randomInt(30,80);
phi= 5*math.randomInt(3,15);
phirad = phi*math.pi/180;

Ls = math.sqrt( L*L + H*H - 2*L*H*math.cos(phirad));
thetarad = math.pi/2-math.acos( (H*H + Ls*Ls -L*L)/(2*Ls*H));
theta = thetarad*180/math.pi;

console.log(`Ls = ${Ls} Theta = ${theta}`);

m = math.randomInt(1,50);

if (unitSel === 0 ) {
    g = 9.81;
} else {
    g = 1;
}

T = (m/2)*g*math.sin(phirad)/(math.cos(phirad - thetarad));
Ox = (m/2)*g*math.sin(phirad)*math.cos(thetarad)/(math.cos(phirad - thetarad));
Oy = m*g - (m/2)*g*math.sin(thetarad)*math.sin(phirad)/(math.cos(phirad - thetarad));

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

 boomVec = math.round([L*math.sin(phirad), -L*math.cos(phirad)]);
 boomVecText = math.round(math.multiply(1.1,boomVec));
 OA = [0, -H];
svgString += `<g transform = 'matrix(1 0 0 1 100 200)'> \n`;
svgString += `<line x1 = "0" y1 = "${(0.5)*H}" x2 = "0" y2 = "${-1.5*H}" style = "stroke: brown;
stroke-width: 5;
stroke-linecap: round"/> \n`;
svgString += `<line x1 = "0" y1="0" x2="${boomVec[0]}" y2="${boomVec[1]}" style = "stroke: green;
stroke-width: 2.5;
stroke-linecap: round" /> \n`;
svgString += `<line x1 = "${OA[0]}" y1="${OA[1]}" x2="${boomVec[0]}" y2="${boomVec[1]}" style = "stroke: blue;
stroke-width: 1;
stroke-linecap: round" /> \n`;
svgString += `<circle cx="0" cy="0" r="4" style="fill: lightgrey" />`;
svgString += `<text x="-15" y="0" style="font: 11px sans-serif" > O </text> `;
svgString += `<text x="-15" y="${OA[1]}" style="font: 11px sans-serif" > A </text> `;
svgString += `<text x="${boomVecText[0]}" y="${boomVecText[1]}" style="font: 11px sans-serif" > B </text> `;
svgString += `</g> \n`;
svgString += `</svg> \n`;

console.log('SVGSTRING is ', svgString);



data = {
    params: {
        masslabel:masslabel,
        unitsMass: unitsMass,
        unitsDist: unitsDist,
        unitsForce: unitsForce,
        mass: m,
        L : L,
        H : H,
        phi: phi,
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