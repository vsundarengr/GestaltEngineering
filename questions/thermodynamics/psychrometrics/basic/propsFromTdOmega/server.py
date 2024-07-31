import random, copy
import numpy as np
from helpers.psychrometricProps import getPsychroPropertiesFromTdRH

def generate():

    params = dict()
    correct_answers = dict()
    nDigits = 2
    sigfigs = 2
    data = dict(params=params, correct_answers=correct_answers, nDigits=nDigits, sigfigs=sigfigs)

    Td = random.randint(20,75)
    RH = random.randint(5,95)/100

    props = getPsychroPropertiesFromTdRH(Td, RH)
    # print(props)

    # Put the sum into data['correct_answers']
    data['correct_answers']['Tdew'] = props['Tdew']
    data['correct_answers']['RH'] = props['RH']*100
    data['correct_answers']['h'] = props['h']
    data['correct_answers']['pv'] = props['pv']
    data['params']['Td'] = Td
    data['params']['omega'] = np.round(props['omega']*100000)/100
    
    return data

# d = generate()
# print(d)