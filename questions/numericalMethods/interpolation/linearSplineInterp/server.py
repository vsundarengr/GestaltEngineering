import random, copy
import numpy as np
from scipy import interpolate


def generate():

    params = dict()
    correct_answers = dict()
    nDigits = 2
    sigfigs = 2
    data = dict(params=params, correct_answers=correct_answers, nDigits=nDigits, sigfigs=sigfigs)

    n = np.random.randint(4,8)
    xmin = -10
    xmax = 10
    nx = xmax - xmin +1 
    xc = np.linspace(xmin,xmax,nx)
    x = np.sort(np.random.choice(xc, n, replace=False))
    y = np.random.choice(xc, n, replace=False)

    f = interpolate.interp1d(x,y,kind=1)
    xx = xmin - 10

    xminsel = x[0]
    xmaxsel = x[-1]

    while xx < xminsel or xx > xmaxsel: 
        xx = np.round(10*(xminsel + (xmaxsel-xminsel)*np.random.rand()))/10
    # print('xx = ',xx)
     
    yy = f(xx)
    
    count = 0
    pointStr = ''
    while count < n:
        pointStr +=  f'{x[count], y[count]}, '
        count += 1

    data['params']['pointStr'] = pointStr
    data['params']['x'] = x.tolist()
    data['params']['y'] = y.tolist()

    data['params']['xx'] = xx
    data['correct_answers']['yy'] = yy.tolist()

    return data

# data = generate()
# print(data)

