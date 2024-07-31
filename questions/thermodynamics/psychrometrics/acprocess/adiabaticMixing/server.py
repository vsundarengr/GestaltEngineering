import random, copy
import numpy as np
from helpers.psychrometricProps import getPsychroPropertiesFromTdRH
from helpers.psychrometricProps import getPsychroPropertiesFromTdOmega
from helpers.psychrometricProps import getSaturationProperties
from helpers.psychrometricProps import getPsychroPropertiesFromEnthalpyOmega

def generate():

    params = dict()
    correct_answers = dict()
    nDigits = 2
    sigfigs = 2
    data = dict(params=params, correct_answers=correct_answers, nDigits=nDigits, sigfigs=sigfigs)

    Cpa = 1.005
    Cpw = 4.187
    Cps = 2.0

    Td1 = random.randint(10,20)
    RH1p = random.randint(50,80)
    RH1 = RH1p/100
    # Td1 = 20
    # RH1 = 0.2
    ptotal = 101.325
    props1 = getPsychroPropertiesFromTdRH(Td1, RH1)
    m1 = 0.5*random.randint(1,11)
    omega1 = props1['omega']
    h1 = props1['h']
    Tdew1 = props1['Tdew']

    
    Td2 = Td1 + 5*random.randint(4,10)
    Td2 = (Td2 // 5)*5 # Modulo 5 to 
    RH2p = random.randint(20,50)
    RH2 = RH2p/100
    props2 = getPsychroPropertiesFromTdRH(Td2, RH2)
    omega2 = props2['omega']
    h2 = props2['h']
    m2 = 0.5*random.randint(1,6)
    
    omega3 = (m1*omega1 + m2*omega2)/(m1 + m2)
    h3 = (m1*h1 + m2*h2)/(m1 + m2)
    # print('H3 = ', h3, ' omega3 = ', omega3)
    props3 = getPsychroPropertiesFromEnthalpyOmega(h3, omega3)

    # print('Properties 1: ', props1)
    # print('Properties 2: ', props2)
    # print('Properties 3: ', props3)





    # Put the sum into data['correct_answers']
    data['params']['Td1'] = Td1
    data['params']['RH1'] = RH1*100
    data['params']['m1'] = m1
    data['params']['Td2'] = Td2
    data['params']['RH2'] = RH2*100
    data['params']['m2'] = m2
    
    data['correct_answers']['omega3'] = omega3
    data['correct_answers']['RH3'] = props3['RH']*100
    data['correct_answers']['Tdew3'] = props3['Tdew']
    data['correct_answers']['Td3'] = props3['Tdry']
    
    return data

d = generate()
# print(d)