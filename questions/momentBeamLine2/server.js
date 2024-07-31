//const { data } = require('cheerio/lib/api/attributes.js');
const math = require('mathjs');
//const mathhelper = require('../../mathhelper.js');
const mathhelper = require('../../helpers/mathhelper.js');


const generate = () => {


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
    
    unitsForce = 'N';
    unitsDist = 'cm';
    unitsMoment = 'N-cm';
    unitsAngle = 'degrees';
    
    moment = [0,0,0];

    r = math.randomInt(50,150);
    ang = 5*math.randomInt(1,72);
    angrad = ang*math.pi/180;
    ang = 360-ang;
    R = [r*math.cos(angrad), r*math.sin(angrad),0];

    r1 = math.randomInt(40,100);
    ang1 = 5*math.randomInt(1,72);
    angrad1 = ang1*math.pi/180;
    ang1 = 360-ang1;
    R1 = [r1*math.cos(angrad1), r1*math.sin(angrad1),0];

    R2 = math.add(R,R1);

    Fmag = math.randomInt(50,200);
    angForce = 5*math.randomInt(1,72);
    angForceRad = angForce*math.pi/180;
    angForce = 360-angForce;

    F = [Fmag*math.cos(angForceRad), Fmag*math.sin(angForceRad),0];
    rf = [100*math.cos(angForceRad), 100*math.sin(angForceRad),0];
    moment = math.cross(R2,F);
    console.log(`Fmag = ${Fmag}, AngleForce  = ${angForce}, R = ${R}, r = ${r}, Angle = ${ang} `);
    console.log(`R = ${R}, F = ${F}, moment = ${moment}`);
    
    let textDistMult = 1.09;
    RX = [textDistMult*R[0],textDistMult*R2[0],math.round(R2[0]+rf[0])];
    RY = [ht/2+ textDistMult*R[1],math.round(ht/2+ R2[1]+ rf[1]), ht/2+ R2[1]+ textDistMult*rf[1]];

    minRX = math.min(RX);
    minRY = math.min(RY);
    maxRX = math.max(RX);
    maxRY = math.max(RY);


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

    svgString += `<g transform = 'matrix(1 0 0 1 250 250)'> \n`;
    svgString += `<rect x = ${-wd} y = "0" width="${wd}" height="${ht}" style="fill:rgb(242, 243, 189);stroke-width:3;stroke:rgb(0,0,0)" /> \n`;
    svgString += `<text x = "${-wd+5}" y = "${ht/2} " class="small">  O </text> \n`;

    svgString += `<line x1="0" y1="${ht/2}" x2="${math.round(R[0])}" y2="${math.round(ht/2+ R[1])}"    
         style = "stroke: blue;
         stroke-width: 2;
         stroke-linecap: butt"/> \n`;

    svgString += `<text x="${math.round(textDistMult*R[0])}" y= "${math.round(ht/2+ textDistMult*R[1])}"> A </text>`;
    svgString += `<text x="${math.round(textDistMult*R2[0])}" y= "${math.round(ht/2+ textDistMult*R2[1])}"> B </text>`;
    svgString += `<line x1 = "${math.round(R[0])}" y1 = "${math.round(ht/2+R[1])}" x2="${math.round(R2[0])}" y2="${math.round(ht/2+R2[1])}" style = "stroke: blue; stroke-width: 2; stroke-linecap: butt"/> `;
    svgString += `<line x1="${math.round(R2[0])}" y1="${math.round(ht/2 + R2[1])}" x2="${math.round(R2[0]+rf[0])}" y2="${math.round(ht/2+ R2[1]+ rf[1])}" marker-end="url(#arrowhead)"
        style = "stroke: red;
        stroke-width: 2;
        stroke-linecap: butt"/> \n`;
    svgString += `<text x="${math.round(R2[0]+textDistMult*rf[0])}" y= "${math.round(ht/2+ R2[1]+ textDistMult*rf[1])}"> F </text> \n`;
    svgString += `</g>`;
    svgString += `</svg>`

    //console.log('SVG STRING IS ', svgString);

    const data= {
        params: { 
            Fmag: Fmag,
            angleForce : angForce,
            r: r,
            angle: ang,
            r1: r1,
            angle1: ang1,
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