const math = require('mathjs');
//const mathhelper = require('../../mathhelper.js');
//const mathhelper = require('../../helpers/mathhelper.js');
// Polynomial Generator 
function random_poly(degree_range, const_range) {
    degree = Math.round(math.random(degree_range[0], degree_range[1]));
    polynomial = ''
    for (let i = 0; i = degree + 1; i++) {
        // creates constant
        constant = Math.round(math.random(const_range[0],const_range[1]));

        // Generates part of the polynomial
        // Functions can't have 0x^n as a value so I need to remove it 
        if (constant == 0) {
            poly = `x^${degree}`;
        }
        else {
            poly = `${constant}x^${degree}`;
        }
        degree = degree - 1

        // Combines all parts of the polynomial
        if (constant >= 0) {
            polynomial = polynomial + "+" + poly
        }
        else {
            polynomial = polynomial + poly
        }
    }
    return polynomial
}

const generate = () =>{
	const degree_range = [2,3]
	const const_range = [-20,20]
	val_list = [-10,10]
	h = 0.01
	a = Math.round(math.random(val_list[0], val_list[1]))
	
	
	poly = random_poly(degree_range,const_range)
	const fun = math.evaluate(`f(x) = ${poly}`)

	option= math.randomInt(0,3)
	

	switch(option){
		case 0:
			calculated = (fun(a+h)-fun(a))/h;
			actual = math.derivative(poly,'x').evaluate({x:a})
			option_msg = "First Forward Derivative"
			break;
		case 1: 
			calculated = (fun(a) - fun(a-h))/h;
			actual = math.derivative(poly,'x').evaluate({x:a})
			option_msg = "First Backward Derivative"
			break;
		case 2:
			foward_derivative = (fun(a+h)-fun(a))/h
			backward_derivative = (fun(a)-fun(a-h))/h
			calculated = (foward_derivative+backward_derivative)/2
			actual = math.derivative(poly,'x').evaluate({x:a})
			option_msg = "First Central Derivative"
			break;
		case 3:
			calculated = (fun(a+2*h)-2*fun(a+h)+fun(a))/(h**2)
			actual = math.derivative(math.derivative(poly,'x'),'x').evaluate({x:a})
			option_msg = "Second Forward Derivative"
			break;
		case 4:
			calculated = (fun(a-2*h)-2*fun(a-h)+fun(a))/(h**2)
			actual = math.derivative(math.derivative(poly,'x'),'x').evaluate({x:a})
			option_msg = "Second Backward Derivative"
			break;
		case 5:
			calculated = (fun(a+h) -2*fun(a)+fun(a-h))/(h**2)
			actual = math.derivative(math.derivative(poly,'x'),'x').evaluate({x:a})
			option_msg = "Second Center Derivative"
			break;
	}
	percent_error = math.abs((calculated - actual)/actual *100)
	data = {
		params: {
			poly: poly, 
			x: a,
			h: h,
			option: option_msg
		},
		correct_answers: {
			calculated: calculated,
			actual: actual,
			percent_error: percent_error},
	
		nDigits: 2,
		sigfigs:2
	}
	
	console.log(data);
	return data;
	
}

//generate();

module.exports = {
    generate,
}