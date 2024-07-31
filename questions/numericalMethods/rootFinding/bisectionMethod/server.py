import random, copy
from numpy.polynomial import Polynomial
from numpy.polynomial.polynomial import polyval
import numpy as np
from pytexit import py2tex

def poly(p, var_string='x'):
    res = ''
    first_pow = len(p) - 1
    for i, coef in enumerate(p):
        power = first_pow - i

        if coef:
            if coef < 0:
                sign, coef = (' - ' if res else '- '), -coef
            elif coef > 0: # must be true
                sign = (' + ' if res else '')

            str_coef = '' if coef == 1 and power != 0 else str(coef)

            if power == 0:
                str_power = ''
            elif power == 1:
                str_power = var_string
            else:
                str_power = var_string + '^' + str(power)

            res += sign + str_coef + str_power 
    return res

def bisection(p, xl, xu, errTol):
    curErr = 100000000
    xmold = xl
    
    ix = 0
    ca = []
    numIter = 6
    while curErr > errTol and ix <= numIter:
        xm = (xl + xu)/2
        fxl = polyval(xl, p.coef)
        fxm = polyval(xm, p.coef)
        fxu = polyval(xu, p.coef)

        if fxl*fxm < 0:
            xu = xm
        else:
            xl = xm
        
        curErr = abs((xm-xmold)/xm)
        xmold = xm
        # print('XM is ', xm,' and current Error is ', curErr)
        step = {'stepNum': ix,
                'xl': xl,
                'xu': xu,
                'fxl': fxl,
                'fxm': fxm,
                'fxu': fxu,
                'curErr': curErr}
        ix = ix + 1 
        ca.append(step)

    return ca


def generate():

    params = dict()
    correct_answers = dict()
    nDigits = 2
    sigfigs = 2
    data = dict(params=params, correct_answers=correct_answers, nDigits=nDigits, sigfigs=sigfigs)

    # Sample two random integers between 5 and 10 (inclusive)
    a = np.random.randint(5, 10)
    b = np.random.randint(5, 10)

    # Put these two integers into data['params']
    data['params']['a'] = a
    data['params']['b'] = b

    # Compute the sum of these two integers
    c = a + b

    # Put the sum into data['correct_answers']
    data['correct_answers']['c'] = c

    # p= np.random.randint(5, size=(2, 4))

    numRoots = np.random.randint(3,5)
    roots = 0.25*np.random.randint(-12,13, size=numRoots)
    roots = np.unique(roots)
    # print(roots)
    roots.sort()
    # print('Sorted ', roots)

    p = Polynomial.fromroots(roots)
    dp = p.deriv()
    # print(polyval(2, p.coef))

    k = np.random.randint(0,numRoots)
    rootK = roots[k]

    fl = np.random.uniform(0.25,0.75)
    fu = np.random.uniform(0.25,0.75)

    if k == 0:
        d = roots[k+1] - roots[k]
        xl = rootK - fl*d
        xu = rootK + fu*d
    elif k == numRoots -1:
        d = roots[k] - roots[k-1]
        xl = rootK- fl*d
        xu = rootK + fu*d
    else:
        dl = roots[k] - roots[k-1]
        du = roots[k+1] - roots[k]
        xl = rootK- fl*dl
        xu = rootK + fu*du

    xl = np.round(xl*100)/100
    xu = np.round(xu*100)/100

    # print('Roots = ', roots, ' of the polynomial ', p)
    # print('Seeking root #', k , ' and the root needed is ', rootK)
    # print('Lower limit = ', xl, ' Upper limit = ', xu)

    errTol = 0.05
    ca = bisection(p,xl,xu, errTol)
    y = poly(np.flip(p.coef),'x')
    data['params']['poly'] = p.coef.tolist()
    data['params']['polyString'] = y
    data['params']['xl'] = xl
    data['params']['xu'] = xu
    data['params']['errTol'] = errTol
    data['steps'] = ca
    data['correct_answers'] = ca[0]

    
    return data


# data = generate()
# print(data)
