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
    RH1 = random.randint(30,80)/100
    props1 = getPsychroPropertiesFromTdRH(Td1, RH1)
    omega1 = props1['omega']
    h1 = props1['h']
    Tdew1 = props1['Tdew']

    Td2 = random.randint(np.ceil(0.2*Tdew1), np.ceil(0.8*Tdew1))
    props2 = getPsychroPropertiesFromTdRH(Td2, 1)
    h2 = props2['h']

    
    RH2 = props2['RH']
    omega2 = props2['omega']

    condperda = omega1 - omega2
    massDryAir = 0.5*random.randint(2,8)
    condensate = condperda*massDryAir
    q = h1 - h2
    Q = q*massDryAir

    # Put the sum into data['correct_answers']
    data['params']['Td1'] = Td1
    data['params']['RH1'] = RH1*100
    data['params']['Td2'] = Td2
    data['params']['Tdew'] = Tdew1
    data['params']['massDryAir'] = massDryAir

    data['correct_answers']['Q'] = Q
    data['correct_answers']['condensate'] = condensate
    data['correct_answers']['RH2'] = 100 
    
    return data

# d = generate()
# print(d)