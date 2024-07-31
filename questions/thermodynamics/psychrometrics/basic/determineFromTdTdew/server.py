import random, copy
import numpy as np
from helpers.psychrometricProps import getPsychroPropertiesFromTdRH
from helpers.psychrometricProps import getPsychroPropertiesFromTdTdew

def generate():

    params = dict()
    correct_answers = dict()
    nDigits = 2
    sigfigs = 2
    data = dict(params=params, correct_answers=correct_answers, nDigits=nDigits, sigfigs=sigfigs)

    Td = random.randint(5,75)
    Tdew = random.randint(np.ceil(0.2*Td), np.ceil(0.8*Td))

    props = getPsychroPropertiesFromTdTdew(Td, Tdew)

    # print(props)

    # Put the sum into data['correct_answers']
    data['correct_answers']['RH'] = props['RH']*100
    data['correct_answers']['omega'] = props['omega']
    data['params']['Td'] = Td
    data['params']['Tdew'] = Tdew
    
    return data

# d = generate()
# print(d)