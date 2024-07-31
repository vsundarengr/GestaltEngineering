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

    Cpa = 1.005
    Cpw = 4.187
    Cps = 2.0

    # Td1 = 35
    # RH1p = 29
    Td1 = random.randint(20, 40)
    RH1p = random.randint(10,30)
    RH1 = RH1p/100
   

    ptotal = 101.325
    props1 = getPsychroPropertiesFromTdRH(Td1, RH1)
    omega1 = props1['omega']
    h1 = props1['h']
    Tdew1 = props1['Tdew']

    #print(props1)

    # Tsteam = 100 + 10*random.randint(1,4)
    TsteamSat = 270
    hsteamSat = 2675
    # Tsteam = 290
    Td2 = Td1 + 5*random.randint(4,10)
    Td2 = (Td2 // 5)*5 # Modulo 5 to 
    # Td2 = 60
    
    # Td2 = Td1 + random.randint(np.ceil(0.1*(Tsteam - Td1)), np.ceil(0.3*(Tsteam - Td1)))

    props2 = getSaturationProperties(Td2)
   # print('Props2 = ', props2)
    omega2max = 0.622*props2['Psat']/(ptotal - props2['Psat'])
    #print('Omega2 max is ', omega2max)
    factor = 0.05*random.randint(10,19)
    omega2tent = omega2max*factor
    hs = (Cpa*(Td2 - Td1) - omega1*props1['saturationProperties']['hg'] + omega2tent*(props2['hg']))/(omega2tent - omega1)
    # print('hs should be ', hs)
    Tsteam = np.ceil((hs - 2475.5)/(2.0008*10))*10
    # print('Tsteam = ', Tsteam)
    
    #hsteam = 2660 + Cps*(Tsteam - TsteamSat)
    hsteam = 2475.5 + 2.0008*Tsteam
    # print('hsteam = ', hsteam)
    

    omega2 = (Cpa*(Td1 - Td2) + omega1*(props1['saturationProperties']['hg'] - hsteam))/(props2['hg'] - hsteam)

    # print('Omega = ', omega2)

    props2 = getPsychroPropertiesFromTdOmega(Td2, omega2)

    mf = omega2-omega1

    Vdot = 0.5*random.randint(3, 21)
    ma = Vdot/props1['specvol']
    msteam = mf*ma

    # Put the sum into data['correct_answers']
    data['params']['Td1'] = Td1
    data['params']['RH1'] = RH1p
    data['params']['Td2'] = Td2
    data['params']['RH2'] = np.round(props2['RH']*100)
    data['params']['specvol1'] = props1['specvol']
    data['params']['Vdot'] = Vdot
    

    data['correct_answers']['Tsteam'] = Tsteam
    data['correct_answers']['msteam'] = msteam
    
    
    return data

# d = generate()
# print(d)