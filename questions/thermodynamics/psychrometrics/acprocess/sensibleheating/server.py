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

    Td1 = random.randint(25,35)
    RH1p = random.randint(20,80)
    RH1 = RH1p/100
    props1 = getPsychroPropertiesFromTdRH(Td1, RH1)
    omega = props1['omega']
    h1 = props1['h']

    Td2 = random.randint(45, 61)
    props2 = getPsychroPropertiesFromTdOmega(Td2,omega)
    h2 = props2['h']

    q = h2 - h1
    RH2 = props2['RH']

    # Put the sum into data['correct_answers']
    data['correct_answers']['q'] = q
    data['correct_answers']['RH2'] = RH2*100
    data['params']['Td1'] = Td1
    data['params']['RH1'] = RH1p
    data['params']['Td2'] = Td2
    
    return data

# d = generate()
# print(d)