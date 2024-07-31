import random, copy
import numpy as np
from helpers.psychrometricProps import getPsychroPropertiesFromTdRH
from helpers.psychrometricProps import getPsychroPropertiesFromTdOmega

def generate():

    params = dict()
    correct_answers = dict()
    nDigits = 2
    sigfigs = 2
    data = dict(params=params, correct_answers=correct_answers, nDigits=nDigits, sigfigs=sigfigs)

    Td1 = random.randint(35,65)
    RH1p = random.randint(30,80)
    RH1 = RH1p/100
    props1 = getPsychroPropertiesFromTdRH(Td1, RH1)
    omega = props1['omega']
    h1 = props1['h']
    Tdew1 = props1['Tdew']

    d2 = 0.9*(Td1 - Tdew1)
    rng = np.random.default_rng()
    rv = rng.random()
    Td2 = np.ceil(Tdew1 + rv*d2)

    props2 = getPsychroPropertiesFromTdOmega(Td2,omega)
    h2 = props2['h']

    q = h1 - h2
    RH2 = props2['RH']

    # Put the sum into data['correct_answers']
    data['correct_answers']['q'] = q
    data['correct_answers']['RH2'] = RH2*100
    data['params']['Td1'] = Td1
    data['params']['RH1'] = RH1p
    data['params']['Td2'] = Td2
    data['params']['Tdew'] = Tdew1
    
    return data

# d = generate()
# print(d)