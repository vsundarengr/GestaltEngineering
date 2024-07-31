import random, copy
import numpy as np
from helpers.psychrometricProps import getPsychroPropertiesFromTdRH
from helpers.psychrometricProps import getPsychroPropertiesFromTdOmega
from helpers.psychrometricProps import getSaturationProperties

def generate():

    params = dict()
    correct_answers = dict()
    nDigits = 2
    sigfigs = 2
    data = dict(params=params, correct_answers=correct_answers, nDigits=nDigits, sigfigs=sigfigs)

    Td1 = random.randint(35,65)
    RH1p = random.randint(10,25)
    RH1 = RH1p/100
    props1 = getPsychroPropertiesFromTdRH(Td1, RH1)
    omega1 = props1['omega']
    h1 = props1['h']
    Tdew1 = props1['Tdew']

    Td2 = Td1 - random.randint(np.ceil(0.2*(Td1-Tdew1)), np.ceil(0.8*(Td1-Tdew1)))
    props2 = getSaturationProperties(Td2)

    Tf = random.randint(np.ceil(0.1*Tdew1), Td2)

    Cpa = 1.005
    Cpw = 4.187

    omega2 = (Cpa*(Td1 - Td2) + omega1*(props1['saturationProperties']['hg'] - Cpw*Tf))/(props2['hg'] - Cpw*Tf)

    props2 = getPsychroPropertiesFromTdOmega(Td2, omega2)

    mf = omega2-omega1

    # Put the sum into data['correct_answers']
    data['params']['Td1'] = Td1
    data['params']['RH1'] = RH1p
    data['params']['Td2'] = Td2
    data['params']['Tf'] = Tf
    

    data['correct_answers']['RH'] = props2['RH']*100
    data['correct_answers']['mf'] = mf
    
    return data

# d = generate()
# print(d)