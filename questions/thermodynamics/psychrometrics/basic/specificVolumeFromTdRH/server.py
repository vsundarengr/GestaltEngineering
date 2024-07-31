import random, copy
import numpy as np
from helpers.psychrometricProps import getPsychroPropertiesFromTdRH

def generate():

    params = dict()
    correct_answers = dict()
    nDigits = 2
    sigfigs = 2
    data = dict(params=params, correct_answers=correct_answers, nDigits=nDigits, sigfigs=sigfigs)

    Td = random.randint(25,75)
    RHp = random.randint(25,95)
    RH = RHp/100

    props = getPsychroPropertiesFromTdRH(Td, RH)
    # print(props)

    # Put the sum into data['correct_answers']
    data['correct_answers']['Tdew'] = props['Tdew']
    data['correct_answers']['omega'] = props['omega']
    data['correct_answers']['h'] = props['h']
    data['correct_answers']['pv'] = props['pv']
    data['correct_answers']['specvol'] = props['specvol']
    data['params']['Td'] = Td
    data['params']['RH'] = RHp
    
    return data

# d = generate()
# print(d)