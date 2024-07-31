//const { data } = require('cheerio/lib/api/attributes.js');
const math = require('mathjs');
// const mathhelper = require('../../mathhelper.js');
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
            "stress": "MPa"
        },
        "uscs": {
            "masslabel": "weight",
            "mass": "lb",
            "speed": "mph",
            "dist": "ft",
            "force": "lb",
            "angle": "degrees",
            "stress": "ksi"
        }
    }
    

    unitSel = math.randomInt(0,2);
    unitsDist = units[unitSystems[unitSel]].dist;
    unitsSpeed = units[unitSystems[unitSel]].speed;
    unitsMass = units[unitSystems[unitSel]].mass;
    unitsForce = units[unitSystems[unitSel]].force;
    unitsAngle = units[unitSystems[unitSel]].angle;
    unitsStress = units[unitSystems[unitSel]].stress;
    masslabel = units[unitSystems[unitSel]].masslabel;   

    sigmax = math.randomInt(-100,101);
    sigmay = math.randomInt(-100,101);
    tau = math.randomInt(-50,51);


let svgString = `<svg
xmlns="http://www.w3.org/2000/svg"
xmlns:xlink="http://www.w3.org/1999/xlink"
width = "350" height = "350">
<defs>
   <marker id="arrowhead" markerWidth="10" markerHeight="7" 
   refX="10" refY="3.5" orient="auto">
     <polygon points="0 0, 10 3.5, 0 7" style="fill: green"/>
   </marker>
 </defs> \n`;
 svgString += `<g transform = 'matrix(1 0 0 1 100 100)'> \n`;
 svgString += `<rect width="100" height="100" fill="crimson" stroke="black" stroke-width="4" opacity="0.5"/> \n`;



 if (sigmax > 0) {
    svgString += `<line x1="-15" y1 = "50" x2 = "-75" y2 = "50" marker-end="url(#arrowhead)" style = "stroke: green; stroke-width: 2; stroke-linecap: round"/> \n`;
    svgString += `<line x1="115" y1 = "50" x2 = "175" y2 = "50" marker-end="url(#arrowhead)" style = "stroke: green; stroke-width: 2; stroke-linecap: round"/> \n`;
    svgString += `<text x="60" y="-65" style="font: 14px sans-serif" > ${math.abs(sigmax)} ${unitsStress} </text> \n`; 
} else if (sigmax < 0) {
    svgString += `<line x1="-75" y1 = "50" x2 = "-15" y2 = "50" marker-end="url(#arrowhead)" style = "stroke: green; stroke-width: 2; stroke-linecap: round"/> \n`;
    svgString += `<line x1="175" y1 = "50" x2 = "115" y2 = "50" marker-end="url(#arrowhead)" style = "stroke: green; stroke-width: 2; stroke-linecap: round"/> \n`; 
    svgString += `<text x="60" y="-65" style="font: 14px sans-serif" > ${math.abs(sigmax)} ${unitsStress} </text> \n`;
}

//svgString += `<text x="60" y="-65" style="font: 14px sans-serif" > ${math.abs(sigmax)} ${unitsStress} </text> \n`;

if (sigmay > 0) {
    svgString += `<line x1="50" y1 = "-15" x2 = "50" y2 = "-75" marker-end="url(#arrowhead)" style = "stroke: green; stroke-width: 2; stroke-linecap: round"/> \n`;
    svgString += `<line x1="50" y1 = "115" x2 = "50" y2 = "175" marker-end="url(#arrowhead)" style = "stroke: green; stroke-width: 2; stroke-linecap: round"/> \n`;
    svgString += `<text x="160" y="40" style="font: 14px sans-serif" > ${math.abs(sigmay)} ${unitsStress} </text> \n`; 
} else if (sigmay < 0) {
    svgString += `<line x1="50" y1 = "-75" x2 = "50" y2 = "-15" marker-end="url(#arrowhead)" style = "stroke: green; stroke-width: 2; stroke-linecap: round"/> \n`;
    svgString += `<line x1="50" y1 = "175" x2 = "50" y2 = "115" marker-end="url(#arrowhead)" style = "stroke: green; stroke-width: 2; stroke-linecap: round"/> \n`;
    svgString += `<text x="160" y="40" style="font: 14px sans-serif" > ${math.abs(sigmay)} ${unitsStress} </text> \n`; 
}

 


 if (tau > 0) {
    svgString += `<line x1="-10" y1 = "10" x2 = "-10" y2 = "90" marker-end="url(#arrowhead)" style = "stroke: green; stroke-width: 2; stroke-linecap: round"/> \n`;
    svgString += `<line x1="110" y1 = "90" x2 = "110" y2 = "10" marker-end="url(#arrowhead)" style = "stroke: green; stroke-width: 2; stroke-linecap: round"/> \n`;
    svgString += `<line x1="10" y1 = "-10" x2 = "90" y2 = "-10" marker-end="url(#arrowhead)" style = "stroke: green; stroke-width: 2; stroke-linecap: round"/> \n`;
    svgString += `<line x1="90" y1 = "110" x2 = "10" y2 = "110" marker-end="url(#arrowhead)" style = "stroke: green; stroke-width: 2; stroke-linecap: round"/> \n`; 
    svgString += `<text x="100" y="-8" style="font: 14px sans-serif" > ${math.abs(tau)} ${unitsStress} </text> \n`;
} else if (tau < 0) {
    svgString += `<line x1="-10" y1 = "90" x2 = "-10" y2 = "10" marker-end="url(#arrowhead)" style = "stroke: green; stroke-width: 2; stroke-linecap: round"/> \n`;
    svgString += `<line x1="110" y1 = "10" x2 = "110" y2 = "90" marker-end="url(#arrowhead)" style = "stroke: green; stroke-width: 2; stroke-linecap: round"/> \n`;
    svgString += `<line x1="90" y1 = "-10" x2 = "10" y2 = "-10" marker-end="url(#arrowhead)" style = "stroke: green; stroke-width: 2; stroke-linecap: round"/> \n`;
    svgString += `<line x1="10" y1 = "110" x2 = "90" y2 = "110" marker-end="url(#arrowhead)" style = "stroke: green; stroke-width: 2; stroke-linecap: round"/> \n`;  
    svgString += `<text x="100" y="-8" style="font: 14px sans-serif" > ${math.abs(tau)} ${unitsStress} </text> \n`;
}

//svgString += `<text x="100" y="-8" style="font: 14px sans-serif" > ${math.abs(tau)} ${unitsStress} </text> \n`;

svgString += `</g> \n`;
svgString += `</svg> \n`;

sigmaavg = (sigmax + sigmay)/2;
R = math.sqrt( ((sigmax-sigmay)/2)**2 + tau**2);

sigmamax = sigmaavg + R;
sigmamin = sigmaavg - R;
taumax = R;

twothetas = math.atan( - (sigmax - sigmay)/(2*tau))*180/math.pi;
thetas = twothetas/2;
 
twothetap = math.atan( (2*tau)/(sigmax - sigmay))*180/math.pi;
thetap1 = twothetap/2;
thetap2 = thetap1 + 90; 

//console.log('SVG STRING IS ', svgString);

data = {
    params: { 
        sigmax: sigmax,
        sigmay: sigmay,
        tau: tau,

        masslabel: masslabel,
        unitsMass: unitsMass,
        unitsDist: unitsDist,
        unitsForce: unitsForce,
        unitsStress: unitsStress,
        svgString: svgString
    },
    correct_answers: {
        sigmaavg: sigmaavg,
        R: R,
        sigmamax : sigmamax,
        sigmamin:  sigmamin,
        taumax: taumax,
        thetap1: thetap1,
        thetap2: thetap2,
        thetas: thetas,
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