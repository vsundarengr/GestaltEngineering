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

    t1 = math.randomInt(0,24);
    p1 = math.randomInt(t1+2,36);
    

    theta = 5*t1;
    phi1 = 5*p1;
    phi = phi1 - theta;

    thetarad = theta*math.pi/180;
    phirad = phi*math.pi/180;

    m =  math.randomInt(1,50);

    if (unitSel === 0 ) {
        g = 9.81;
    }
    else {
        g = 1;
    }

    
    W = m*g;

    NA = W*math.sin(thetarad + phirad)/math.sin(phirad);
    NB = W*math.sin(thetarad)/math.sin(phirad);

    d = 30;
    cent = math.round([d*math.cos(thetarad + phirad/2), -d*math.sin(thetarad + phirad/2)]);
    r = math.round(d*math.sin(phirad/2));

    rayA = math.round([2*d*math.cos(thetarad), -2*d*math.sin(thetarad)]);
    rayB = math.round([2*d*math.cos(thetarad + phirad), -2*d*math.sin(thetarad + phirad)]);

    textAloc = math.round([d*math.cos(0.8*thetarad), -d*math.sin(0.8*thetarad)]);
    textBloc = math.round([d*math.cos(1.2*(thetarad + phirad)), -d*math.sin(1.2*(thetarad + phirad))]);

    let svgString = `<svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewbox ="0 0 300 300" height="350">
    <defs>
       <marker id="arrowhead" markerWidth="10" markerHeight="7" 
       refX="10" refY="3.5" orient="auto">
         <polygon points="0 0, 10 3.5, 0 7" style="fill: red"/>
       </marker>
     </defs> \n`;
    
    svgString += `<g transform = 'matrix(1 0 0 1 50 100)'> \n`;
    svgString += `<line x1="0" y1="0" x2="${rayA[0]} " y2="${rayA[1]}" style = "stroke: red;
                    stroke-width: 0.5;
                    stroke-linecap: round"/> \n`;
    svgString += `<line x1="0" y1="0" x2="${rayB[0]} " y2="${rayB[1]}" style = "stroke: green;
    stroke-width: 0.5;
    stroke-linecap: round"/> \n`;
    svgString += `<circle cx="${cent[0]}" cy="${cent[1]}" r="${r}" style="fill: blue"/> \n`;
    svgString += `<text x="0" y="15" style="font:  11px sans-serif"> O </text> \n`;
    svgString += `<text x="${textAloc[0]}" y="${textAloc[1]}" style="font:  11px sans-serif"> A </text> \n`;
    svgString += `<text x="${textBloc[0]}" y="${textBloc[1]}" style="font:  11px sans-serif"> B </text> \n`;
    svgString += `</g> \n`;
    svgString += `</svg> \n`;

   // console.log('SVGSTRING is ', svgString);


data = {
    params: { 
        mass: m,
        theta: theta,
        phi: phi,
        svgString: svgString,
        unitsMass: unitsMass,
        unitsForce: unitsForce,
        masslabel: masslabel
    },
    correct_answers: {
        NA: NA,
        NB: NB
    },
    correct_answers_labels: {
        NA : "Normal reaction at A",
        NB : "Normal reaction at B",
    },
    nDigits: 2,
    sigfigs: 2
}

console.log(data);
return data;
}

//generate();

module.exports = {
    generate
}