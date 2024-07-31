//const { data } = require('cheerio/lib/api/attributes.js');
const math = require('mathjs');
//const mathhelper = require('../../mathhelper.js');
const mathhelper = require('../../helpers/mathhelper.js');

const constructPost = (L,baseprops, postLabels)=> {
    H = math.randomInt(-80,80);

    if ( math.abs(H) < 10) {
        H = 0;
    }

    Fmag = 10*math.randomInt(5,100);
    ang = 5*math.randomInt(1,72);
    angrad = ang*math.pi/180;
  
    
    rF = [math.round(60*math.cos(angrad)), math.round(60*math.sin(angrad)),0]; // some arbitrary scaling for force vectors
    
    ang = 360 -ang;
    angradF = ang*math.pi/180;
    F = [Fmag*math.cos(angradF), Fmag*math.sin(angradF),0];
    r = [L,-H,0];
    let moment = math.cross(r,F);
    console.log(`H = ${H} angle = ${ang} angrad = ${angrad} angradF = ${angradF} r = ${r} RF = ${rF}`);
    wd = baseprops.wd;
    ht = baseprops.ht;
    thin = baseprops.thin;

    let svgString = '';
    
    xr = 0; yr = 0; wr = 0; hr = 0;
    if ( H >= 0) {
        xr = L - thin/2;
        yr = ht/2;
        yrtA = ht/2 -2*thin;
        wr = thin;
        hr = math.abs(H);
        yrtB = ht/2 + hr + 2*thin;
    } else {
        xr = L - thin/2;
        yr = ht/2 + H;
        yrtA = ht/2 + 2*thin;
        wr = thin;
        hr = math.abs(H);
        yrtB = ht/2 - hr - thin;
    }

    svgString += `<rect x = "${xr}" y="${yr}" width="${wr}" height="${hr}" style="fill:green;stroke-width: 2;stroke: black" /> \n`;
    svgString += `<text x = "${xr}" y = "${yrtA} " class="small">  ${postLabels[0]} </text> \n`;
    svgString += `<text x = "${xr}" y = "${yrtB}"  class="small">  ${postLabels[1]}  </text> \n`;
    let forceString;
    if (Fmag > 0) {
        forceString = `<line x1="${L}" y1="${ht/2+H}" x2="${L+rF[0]}" y2="${ht/2+H+rF[1]}" marker-end="url(#arrowhead)"
        style = "stroke: red;
                    stroke-width: 2;
                    stroke-linecap: butt"/>`;
    }
    else {
        forceString = `<line x2="${L}" y2="${ht/2+H}" x1="${L+rF[0]}" y1="${ht/2+H+rF[1]}" marker-end="url(#arrowhead)"
        style = "stroke: red;
                    stroke-width: 2;
                    stroke-linecap: butt"/>`;
    }

    svgString += forceString + '\n';

    return {
        Fmag: Fmag,
        angle: ang,
        L: L,
        H: H,
        moment: moment,
        svgString: svgString
    };
}


const generate = () => {

    let svgString = `<svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width = "400" height = "400">
    <defs>
       <marker id="arrowhead" markerWidth="10" markerHeight="7" 
       refX="10" refY="3.5" orient="auto">
         <polygon points="0 0, 10 3.5, 0 7" style="fill: red"/>
       </marker>
     </defs>`;
    let forceString = '';
    let angleString = '';
    wd = 20;
    ht = 80;
    thin = 10;
    baseprops = {
        wd : wd,
        ht: ht,
        thin: thin
    };
    Lmax = math.randomInt(150,250);
    svgString += `<g transform = 'matrix(1 0 0 1 100 200)'> `;
    svgString += `<rect x = ${-wd} y = "0" width="${wd}" height="${ht}" style="fill:rgb(242, 243, 189);stroke-width:3;stroke:rgb(0,0,0)" /> \n`;
    svgString += `<rect x = "0" y="${ht/2-thin/2}" width="${Lmax}" height="${thin}" style="fill:green;stroke-width: 2;stroke: black" /> \n`;
    svgString += `<text x = "${-wd+5}" y = "${ht/2} " class="small">  O </text> \n`;

    numForces = math.randomInt(1,4);

    f1 = math.random(0.8,1.0);
    L = math.round(f1*Lmax);


    unitsForce = 'N';
    unitsDist = 'cm';
    unitsMoment = 'N-cm';
    unitsAngle = 'degrees';

    
    
    moment = [0,0,0];
    data1 = constructPost(L,baseprops,['A','B']);
    svgString += data1.svgString;
    forceString += `${data1.Fmag} ${unitsForce}`;
    angleString += `${data1.angle} ${unitsAngle}`;
    console.log('Moment 0 is ', moment);
    moment = math.add(moment, data1.moment);
    console.log('DATA 1 = ', data1);
 
    L1 = data1.L;
    H1 = data1.H;

    let conj;
    let H2, H3;
    let L2, L3;
   console.log('Moment 1 is ', moment);
    if ( numForces > 1) {
        if (numForces === 2 ) {
            conj = ' and ';
        }
        else {
            conj = ', ';
        }
        f2 = math.random(0.5,0.7);
        L2 = math.round(f2*Lmax);
        data2 = constructPost(L2,baseprops,['C','D']);
        svgString += data2.svgString;
        forceString += `${conj} ${data2.Fmag} ${unitsForce}`;
        angleString += `${conj} ${data2.angle} ${unitsAngle}`;
        moment = math.add(moment, data2.moment);
        H2 = data2.H;
        fpt = 'posts at A and C';
        distString = `${L1} and ${L2}`;
        console.log('DATA 2 = ', data2);
    }
   console.log('Moment 2 is ', moment);
    if (numForces > 2) {
        f3 = math.random(0.2, 0.4);
        L3 = math.round(f3*Lmax);
        data3 = constructPost(L3,baseprops,['E','F']);
        svgString += data3.svgString;
        forceString += `and ${data3.Fmag} ${unitsForce}`;
        angleString += `and ${data3.angle} ${unitsAngle}`;
        moment = math.add(moment, data3.moment);
        H3 = data3.H;
        fpt = 'posts at A, C and E';
        distString = `${L1}, ${L2} and ${L3}`;
        console.log('DATA 3= ', data3);
    }
   console.log('Moment 3 is ', moment);
    let htmlString = '';
    if (numForces === 1) {
        console.log('H1 here is ', H1);
        if ( math.abs(H1) > 0 ) {
            htmlString += `The magnitude of the force at B is ${Fmag} ${unitsForce} and acts at angle ${angleString} with the positive x-axis. The distance between O and A is ${L1} ${unitsDist} and the height of the post AB is ${math.abs(H1)} ${unitsDist}. `;
        } 
        else {
            htmlString += `The magnitude of the force at A is ${Fmag} ${unitsForce} and acts at angle ${angleString} with the positive x-axis. The distance between O and A is ${L1} ${unitsDist}. `;
        }
    }
    if ( numForces > 1) {
        htmlString += `The magnitudes of the forces at ${fpt} are respectively ${forceString} and acts at an angle ${angleString} with the positive x-axis. The distances of ${fpt} from O are respectively  ${distString} ${unitsDist}. `;
        if ( math.abs(H1) > 0) {
            htmlString += `The height of the post AB is ${math.abs(H1)} ${unitsDist}. `;
        }
        if ( math.abs(H2) > 0) {
            htmlString += `The height of the post CD is ${math.abs(H2)} ${unitsDist}. `;
        }
        if ( numForces === 3 && math.abs(H3) > 0) {
            htmlString += `The height of the post EF is ${math.abs(H3)} ${unitsDist}. `;
        }
    }
    svgString += `</g>`;
    svgString += `</svg>`
    console.log('SVG STRING IS ', svgString);
    console.log(`HTMLSTRING IS ${htmlString}`);

    switch (numForces) {
    case 1: 
        numForcesString = "one force";
        break;
    case 2:
        numForcesString = "two forces";
        break;
    case 3:
        numForcesString = "three forces";
        break;
    default:
        console.log('numForces is not valid');
    }

    const data= {
        params: {
            numForces: numForces, 
            numForcesString: numForcesString,
            forceString: forceString,
            angleString: angleString,
            svgString: svgString,
            htmlString: htmlString,
            unitsMoment: unitsMoment
        },
        correct_answers: {
            moment: moment[2]
        },
        correct_answers_labels:{
            moment: "Moment"
        },
        nDigits: 2,
        sigfigs: 2
    }

    console.log('DATA IS ', data);

    return data;

}



generate();

module.exports = {
    generate
}