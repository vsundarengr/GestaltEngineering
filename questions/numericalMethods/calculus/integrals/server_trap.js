const { randomInt } = require("mathjs");
const math = require("mathjs");
const Integral = require('sm-integral');

// Generates a random polynomial expression
function random_poly(degree_range, const_range) {
    // Check if degree_range and const_range have a length of at least 2
    if (degree_range.length < 2 || const_range.length < 2) {
        return 'Error: degree_range and const_range must have a length of at least 2.';
    }

    // Swap degree_range values if necessary
    if (degree_range[0] > degree_range[1]) {
        [degree_range[0], degree_range[1]] = [degree_range[1], degree_range[0]];
    }

    // Swap const_range values if necessary
    if (const_range[0] > const_range[1]) {
        [const_range[0], const_range[1]] = [const_range[1], const_range[0]];
    }

    // Generate a random degree within the specified degree_range
    let degree = randomInt(degree_range[0], degree_range[1]);
    let polynomial = '';

    // Generate the polynomial terms
    for (let i = 0; i = degree+1; i++) {
        // Generate a random constant within the specified const_range
        const constant = randomInt(const_range[0], const_range[1]);

        let poly;
        // Create the polynomial term based on the current degree and constant
        if (constant == 0) {
            poly = `x^${degree}`;
        } else if (degree === 0) {
            poly = `${constant}`;
        }
        else {
            poly = `${constant}x^${degree}`;
        }
        degree = degree - 1;

        // Combine the term with the existing polynomial expression
        if (constant >= 0) {
            polynomial += "+" + poly;
        } else {
            polynomial += poly;
        }
    }

    return polynomial;
}

// Generates a pair of random numbers with exclusion constraints
function randomNumberPairWithExclusion(min, max, range) {
  // Validate input
  if (min >= max) {
    throw new Error("Error: min must be less than max.");
  }

  // Generate the range array from -range to range
  const int_range = generateRangeArray(-range, range);

  // Generate a random number 'a' within the specified min-max range
  const a = randomInt(min, max);

  // Generate the exclude list based on 'a' and the range
  const exclude_list = generateExcludeList(int_range, a, min, max);

  // Generate 'b' using randomIntWithExclusion function, excluding values in exclude_list
  const b = randomIntWithExclusion(a, max, exclude_list);

  return {
    a,
    b,
  };
}

// Generate an array of values within the specified range
function generateRangeArray(start, end) {
  const rangeArray = [];
  for (let i = start; i <= end; i++) {
    rangeArray.push(i);
  }
  return rangeArray;
}

// Generate the exclude list based on the range array, 'a', min, and max
function generateExcludeList(rangeArray, a, min, max) {
  const exclude_list = rangeArray.map((value) => value + a)
                                .filter((value) => value >= min && value <= max);
  return exclude_list;
}

// Generate a random number within the specified range while excluding values in the exclude array
function randomIntWithExclusion(min, max, exclude) {
  let randomNum;
  const excludedSet = new Set(exclude); // Convert exclude array to a Set for efficient lookup

  do {
    randomNum = randomInt(min, max);
  } while (excludedSet.has(randomNum));

  return randomNum;
}

// Generate random numbers
const generate = () => {
    // Generate a random value for 'n' within the range [2, 6]
    const n = randomInt(2, 6);
  
    // Generate a pair of random numbers 'a' and 'b' with exclusion constraints
    const { a, b } = randomNumberPairWithExclusion(0, 100, 5);
  
    // Define the range of degrees for the random polynomial
    const degree_range = [2, 5];
  
    // Define the range of constants for the random polynomial
    const const_range = [-5, 5];
  
    // Generate a random polynomial expression
    const poly = random_poly(degree_range, const_range);
  
    // Evaluate the generated polynomial function
    const fun = math.evaluate(`f(x) = ${poly}`);
  
    // Calculate the interval width 'dx'
    const dx = (b - a) / n;
  
    // Perform the trapezoidal rule approximation
    let sum = 0;
    for (let i = 1; i < n; i++) {
      const x = dx * i;
      sum += 2 * fun(a + x);
    }
    sum = (sum + fun(a) + fun(b)) * (dx / 2);
  
    // Calculate the actual integral using math.integral function
    const actual = Integral.integrate(fun, a, b);
  
    // Calculate the error percentage
    const percent_error = Math.abs((actual - sum) / actual) * 100;
  
    data = {
		params: {
			poly: poly, 
			a: a,
            b: b,
            n: n
		},
		correct_answers: {
			calculated: sum,
			actual: actual,
			percent_error: percent_error},
	
		nDigits: 2,
		sigfigs:2
	}
	
	console.log(data);
	return data;
}

generate();




