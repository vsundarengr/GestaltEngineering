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

def nrMethod(p, dp, xg, errTol):
    curErr = 100000000
    xr = xg
    
    ix = 1
    ca = []
    while curErr > errTol:
        fxr = polyval(xr, p.coef)
        dfxr = polyval(xr, dp.coef)
        xrnew = xr - fxr/dfxr
        curErr = abs((xrnew-xr)/xrnew)
        # print('XM is ', xrnew,' and current Error is ', curErr)
        step = {'stepNum': ix,
                'xr': xrnew,
                'curErr': curErr}
        ix = ix + 1
        xr = xrnew 
        ca.append(step)

    return ca


def generate():

    params = dict()
    correct_answers = dict()
    nDigits = 2
    sigfigs = 2
    data = dict(params=params, correct_answers=correct_answers, nDigits=nDigits, sigfigs=sigfigs)

    # p= np.random.randint(5, size=(2, 4))

    numRoots = np.random.randint(3,5)
    roots = 0.25*np.random.randint(-12,13, size=numRoots)
    roots = np.unique(roots)
    numRootsUpdated = roots.size
    # print(roots)
    roots.sort()
    # print('Sorted ', roots)

    p = Polynomial.fromroots(roots)
    dp = p.deriv()
    # print(polyval(2, p.coef))

    rootK = 0
    while rootK == 0:
        k = np.random.randint(0,numRootsUpdated)
        rootK = roots[k]

    fl = np.random.uniform(0.1,0.45)
    fu = np.random.uniform(0.1,0.45)

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
        du = roots[k] - roots[k-1]
        xl = rootK- fl*dl
        xu = rootK + fu*du

    xl = np.round(xl*100)/100
    xu = np.round(xu*100)/100

    if np.random.uniform(0.0,1.0) < 0.5:
        xg = xl
    else: 
        xg = xu

    # print('Roots = ', roots, ' of the polynomial ', p)
    # print('Seeking root #', k , ' and the root needed is ', rootK)
    # print('xg = ', xg)

    errTol = 0.001
    ca = nrMethod(p, dp, xg, errTol)
    y = poly(np.flip(p.coef),'x')
    data['params']['poly'] = p.coef.tolist()
    data['params']['polyString'] = y
    data['params']['xg'] = xg
    data['params']['errTol'] = errTol
    data['steps'] = ca
    data['correct_answers'] = ca[0]

    
    return data


# data = generate()
# print(data)
