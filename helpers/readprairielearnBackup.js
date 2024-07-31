const spawn = require('child_process').spawn;
const pythonPath = 'C:/Users/vsundar/Anaconda3/python';
const { once } = require('events');
const fs = require('fs');
const cheerio = require('cheerio');
const proc = require('process');

const plutil = require('./plutilities.js');
const { Server } = require('http');

const DEBUG = true;

const writeOutputHTML = (questionName, htmlOutput) =>{
    const qoutDir ="../questionsoutput/".concat(questionName);
    const outHTMLfname = qoutDir + '/questionoutput.html';
    console.log(outHTMLfname);

    fs.mkdir(qoutDir, (err)=>{
    console.log(`In Creating Directory: ${err}`);
    fs.writeFile(outHTMLfname, htmlOutput, errw=>{
        if (errw)
        console.log('Error writing output file', errw);
        });
    });
}

const processPrairielearnTags = (html, qdata,qdir)=>{
    const $ = cheerio.load(html, null, false);

    let h;
   
    let ans = {
        answers: []
    }


    h = $('pl-matrix-input');
    h.each( (i,el) =>{
        htmlString = plutil.pl_matrix_input($,qdata,el);
        $(el).before(htmlString);
        $(el).remove();
    });

    h = $('pl-matrix-latex');
    h.each( (i,el)=>{
    htmlString = plutil.pl_matrix_latex($, qdata, el);
    $(el).before(htmlString);
    $(el).remove();
    });

    h = $('pl-number-input');
    h.each( (i,el) =>{
    htmlString = plutil.pl_number_input($, qdata, el);
    $(el).before(htmlString);
    $(el).remove();
    });

    h = $('pl-symbolic-input');
    h.each( (i,el)=>{
    htmlString = plutil.pl_symbolic_input($, qdata, el);
    $(el).before(htmlString);
    $(el).remove();
    });

    h = $('pl-question-panel');
    h.wrapAll('<div class="wrapper">');
    h.each( (i,el)=>{
        let cnt = $(el).contents();
        let par = $(el).parent();
        $(el).replaceWith(cnt);
    });
        
    let im = $('pl-figure');
    im.each( (i,el)=>{
    // const att = $(el).attr();
    // nm= att['file-name']; 
    // imFileName = qdir + '/clientFilesQuestion/' + nm;
    // const htmlString = `<img src="${imFileName}" alt="Picture for problem" width="300" height="300" class="pic" />`;
    htmlString = plutil.pl_figure($,qdir,el);
    $(el).before(htmlString);
    $(el).remove();
});

    h = $('pl-checkbox');
    h.each( (i,el)=>{
    res = plutil.pl_checkbox($, el);
    htmlString = res['htmlString'];
    dat = {
        name: res['name'],
        correct_answers: res['correctAnswers']
    }
    ans.answers.push(dat);
 //     console.log(htmlString);
      $(el).before(htmlString);
      $(el).remove();
   });

   h = $('pl-multiple-choice');
   h.each( (i,el)=>{
    res = plutil.pl_multiple_choice($,el);
    htmlString = res['htmlString'];
    dat = {
        name: res['name'],
        correct_answers: res['correctAnswers']
    }
    ans.answers.push(dat);
   // console.log(htmlString);
    $(el).before(htmlString);
    $(el).remove();
    
   });
    
  
    return {
        answers: ans,
        htmlString: $.html()
    };
}

const generateDataFromPrairieLearnFixed = async (questionName, html) =>{
    return new Promise( (resolve, reject) => {
    const qdir = "./questions/".concat(questionName);
    let qdata = {};
    let r = /\$([^\$]*)\$/g; // set up regular expression to take care of math
    html = html.toString().replace(r,'\\( $1 \\)');
    html = plutil.replace_params(html,qdata);
   
    let res = processPrairielearnTags(html,qdata,qdir);
    htmlString = res['htmlString'];
    qdata = res['answers'];
 //   console.log(`HTML Output in FIXED is :::: ${htmlOutput}`);
    if (htmlString === '') {
        reject('Error making FIXED html string');
    }
   // writeOutputHTML(questionName, htmlString);
    let returnValues = {answers: qdata,
        htmlString: htmlString};
    console.log('RESULTS IS ', returnValues);
    resolve(returnValues);
    });
}

const readQuestionHTML =    (questionName) =>{
    const questionHTMLFile = "../questions/".concat(questionName) + '/question.html';
    console.log('QUESTION HTML FILE is ', questionHTMLFile);
    fs.readFile(questionHTMLFile,  (err, html) =>{
      if(err){
        console.log('Error in reading file', err);
    }else{
        generateDataFromJSAdaptive(questionName, html)
            .then( (returnedValues) => {
                writeOutputHTML(questionName, returnedValues.htmlString);
            })
            .catch( () => console.log('PROMISE REJECTED'));
    //  generateDataFromPrairieLearnAdaptive(questionName, html)
    //     .then( (returnedValues)=> {
    //         console.log('PROMISED RESOLVED: ', returnedValues);
    //         return returnedValues;
    //     })
    //     .catch( ()=> console.log('PROMISE REJECTED'));
    
   //  x = await generateDataFromPrairieLearnFixed(questionName, html);
    }
  });
}

const getDataFromPythonFile =  (questionName, html)=>{
    const process = spawn(pythonPath,['./helpers/accessprairielearn.py','Sundar!']);
    return new Promise ( (resolve, reject)=>{
    process.stdout.on('data',  async data=>{
        let returnValues = {};
        let dataString = new String();
        data.forEach( i=>{ ii = String.fromCharCode(i); dataString = dataString.concat(ii);})
        //console.log(`Output in here is ${typeof(dataString)} is ${dataString}`);
        dataString = dataString.replaceAll('\'','\"');
       // console.log(`After replacement: Output in here is ${typeof(dataString)} is ${dataString}`);
        qdata = await JSON.parse(dataString);
    //    console.log(`DATA STRING is ${dataString}`)
        resolve(qdata);
    });

    process.stderr.on('data', data=>{
        console.log(`stderr is: ${data}`)
        reject(`Error in spawned process ${data}`);
    });

});
}

const generateDataFromJSAdaptive =  (questionName, html)=>{
    return new Promise ( async (resolve,reject)=>{
        const qdir = "../questions/".concat(questionName);
    //const qdir = "./questions/".concat(questionName);
   
    const jsFile = qdir + "/server.js";
    console.log(`QUESTION NAME is ${questionName} and QDIR is ${qdir} and ${jsFile}`);
    const jsFuncs = await import(jsFile);
    qdata = jsFuncs.generate();

    let r = /\$([^\$]*)\$/g; // set up regular expression to take care of math
    html = html.toString().replace(r,'\\( $1 \\)');
   // console.log('HTML is ', html);
    html = plutil.replace_params(html,qdata);
    console.log(html);
    let res = processPrairielearnTags (html, qdata,qdir);
    let htmlString  = res['htmlString']
     returnValues = {data: qdata,
                 htmlString: htmlString};
    resolve(returnValues);

    });
}

const generateDataFromPrairieLearnAdaptive = (questionName, html) =>{
    return new Promise( (resolve, reject)=>{ 
    const qdir = "./questions/".concat(questionName);
    //const qdir = "./questions/".concat(questionName);
    console.log(`QUESTION NAME is ${questionName} and QDIR is ${qdir}`);
    const sPyFile = qdir + "/server.py";
    const dPyFile = "./helpers/tempservers" + "/server.py"
    
    fs.copyFile(sPyFile, dPyFile,   (err)=>{
        if (err) {
            reject(`Error copying Python file from ${sPyFile} to ${dPyFile}`);
        }
        
        getDataFromPythonFile(questionName, html)
            .then( qdata => {
                let r = /\$([^\$]*)\$/g; // set up regular expression to take care of math
                html = html.toString().replace(r,'\\( $1 \\)');
                html = plutil.replace_params(html,qdata);
                let res = processPrairielearnTags (html, qdata,qdir);
                let htmlString  = res['htmlString']
                returnValues = {data: qdata,
                                htmlString: htmlString};
                resolve(returnValues);
            })
            .catch( err => {
                    console.log('Error in GENERATE QUESTION');
                    reject(err);});
    });
});

}

// const generateDataFromPrairieLearnAdaptive1 =  (questionName, html)=>{
//     return new Promise ( (resolve, reject)=> { 
//     const qdir = "./questions/".concat(questionName);
//     //const qdir = "./questions/".concat(questionName);
//     console.log(`QUESTION NAME is ${questionName} and QDIR is ${qdir}`);
//     const sPyFile = qdir + "/server.py";
//     const dPyFile = "./helpers/tempservers" + "/server.py"
    
   
//     fs.copyFile(sPyFile, dPyFile,  async (err)=>{
//         if (err) {
//             reject(`Error copying Python file from ${sPyFile} to ${dPyFile}`);
//         }
   
        
//     const process = spawn(pythonPath,['./helpers/accessprairielearn.py','Sundar!']);
  
  
//     process.stdout.on('data',  data=>{
//         let returnValues = {};
        
//         let dataString = new String();
//         data.forEach( i=>{ ii = String.fromCharCode(i); dataString = dataString.concat(ii);})
//         //console.log(`Output in here is ${typeof(dataString)} is ${dataString}`);
//         dataString = dataString.replaceAll('\'','\"');
//        // console.log(`After replacement: Output in here is ${typeof(dataString)} is ${dataString}`);
//         qdata = JSON.parse(dataString);
//         console.log(`Data is ${dataString}`);

//         let r = /\$([^\$]*)\$/g; // set up regular expression to take care of math
//         html = html.toString().replace(r,'\\( $1 \\)');
//         html = plutil.replace_params(html,qdata);
      
//         let htmlOutput = processPrairielearnTags (html, qdata,qdir);
      
//         returnValues = {data: qdata,
//                         htmlString: htmlOutput};

      
//       //  writeOutputHTML(questionName, htmlOutput);
//        // console.log('RETURN VALUES INNERMOST :', returnValues);
//         resolve(returnValues);
//     });

 


//     process.stderr.on('data', data=>{
//         console.log(`stderr is: ${data}`)
//         reject(`Error in spawned process ${data}`);
//     });

//     process.on('close',(code)=>{
//         console.log(`Child process exited with code ${code}`);
//     });

    

// });
// })
// }



//const questionName = 'addNumbers';
//const questionName = 'matrixMultiply';
// //const questionName = 'positionTimeGraph';
//const questionName = 'trigRightTriangle';
//const questionName = 'vectorLengthAngleToXY';
//const questionName = 'addVectorsGeometry';
const questionName = "trigGeneralTriangle";
readQuestionHTML(questionName);

module.exports = { generateDataFromPrairieLearnAdaptive, 
                   generateDataFromPrairieLearnFixed,
                   generateDataFromJSAdaptive
}


