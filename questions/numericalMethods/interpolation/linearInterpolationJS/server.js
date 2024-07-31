//const { data } = require('cheerio/lib/api/attributes.js');
 const math = require('mathjs');
// const mathhelper = require('../../mathhelper.js');
//const mathhelper = require('../../helpers/mathhelper.js');

const generate = () => {

    let detA = 0;
    let A,x,y;
    let nRows = 2;
    let nCols = 2;
    while (detA === 0) {
        nElements = nRows*nCols;
        let x = Array.from({length: nElements}, ()=> math.randomInt(-5,5));
        mx = math.reshape(x, [nRows, nCols]);
        
        xs = math.column(mx,0);
        B = math.column(mx,1);
    
        A = math.concat(math.dotPow(xs,0), math.dotPow(xs,1));
       
        detA = math.det(A);
    
    }



sol = math.lusolve(A,B)

console.log('A = ', A);
console.log('B = ', B);
console.log(' Solution = ', sol);



data = {
    params: { 
        x: math.row(mx,0)[0],
        y: math.row(mx,1)[0]
    },
    correct_answers: {
        a0: sol[0][0],
        a1: sol[1][0]
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