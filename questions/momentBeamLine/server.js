//const { data } = require('cheerio/lib/api/attributes.js');
const math = require('mathjs');
//const mathhelper = require('../../mathhelper.js');
const mathhelper = require('../../helpers/mathhelper.js');


const generate = () => {

    let svgString = `<svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width = "500" height = "500">
    <defs>
       <marker id="arrowhead" markerWidth="10" markerHeight="7" 
       refX="10" refY="3.5" orient="auto">
         <polygon points="0 0, 10 3.5, 0 7" style="fill: red"/>
       </marker>
     </defs>`;
    let forceString = '';
    let angleString = '';
    wd = 5;
    ht = 80;
    thin = 10;
    baseprops = {
        wd : wd,
        ht: ht,
        thin: thin
    };
    
    svgString += `<g transform = 'matrix(1 0 0 1 250 250)'> \n`;
    svgString += `<rect x = ${-wd} y = "0" width="${wd}" height="${ht}" style="fill:rgb(242, 243, 189);stroke-width:3;stroke:rgb(0,0,0)" /> \n`;
    svgString += `<text x = "${-wd+5}" y = "${ht/2} " class="small">  O </text> \n`;
   


    unitsForce = 'N';
    unitsDist = 'cm';
    unitsMoment = 'N-cm';
    unitsAngle = 'degrees';
    
    moment = [0,0,0];

    r = math.randomInt(50,200);
    ang = 5*math.randomInt(1,72);
    angrad = ang*math.pi/180;
    ang = 360-ang;
    R = [r*math.cos(angrad), r*math.sin(angrad),0];
    Fmag = math.randomInt(50,200);
    angForce = 5*math.randomInt(1,72);
    angForceRad = angForce*math.pi/180;
    angForce = 360-angForce;
    
    F = [Fmag*math.cos(angForceRad), Fmag*math.sin(angForceRad),0];
    rf = [100*math.cos(angForceRad), 100*math.sin(angForceRad),0];
    moment = math.cross(R,F);
    console.log(`Fmag = ${Fmag}, AngleForce  = ${angForce}, R = ${R}, r = ${r}, Angle = ${ang} `);
    console.log(`R = ${R}, F = ${F}, moment = ${moment}`);
    svgString += `<line x1="0" y1="${ht/2}" x2="${math.round(R[0])}" y2="${math.round(ht/2+ R[1])}"    
         style = "stroke: blue;
         stroke-width: 2;
         stroke-linecap: butt"/> \n`;
    svgString += `<text x="${math.round(1.1*R[0])}" y= "${math.round(ht/2+ 1.1*R[1])}"> A </text>`;
    svgString += `<line x1="${math.round(R[0])}" y1="${math.round(ht/2 + R[1])}" x2="${math.round(R[0]+rf[0])}" y2="${math.round(ht/2+ R[1]+ rf[1])}" marker-end="url(#arrowhead)"
        style = "stroke: red;
        stroke-width: 2;
        stroke-linecap: butt"/> \n`;
    svgString += `<text x="${math.round(R[0]+1.1*rf[0])}" y= "${math.round(ht/2+ R[1]+ 1.1*rf[1])}"> F </text> \n`;
    svgString += `</g>`;
    svgString += `</svg>`

    //console.log('SVG STRING IS ', svgString);

    const data= {
        params: { 
            Fmag: Fmag,
            angleForce : angForce,
            r: r,
            angle: ang,
            unitsForce: unitsForce,
            unitsDist: unitsDist,
            unitsAngle: unitsAngle,
            unitsMoment: unitsMoment,
            svgString: svgString
        },
        correct_answers: {
            moment: (-1)*moment[2]
        },
        correct_answers_labels: {
            moment: "Moment: ",
        },
        nDigits: 2,
        sigfigs: 2
    }

   console.log('DATA IS ', data);

   return data;

}



//generate();

module.exports = {
    generate
}