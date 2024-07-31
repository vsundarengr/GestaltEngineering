import numpy as np
from numpy.polynomial import Polynomial
from scipy import optimize

import numpy as np
from numpy.polynomial import Polynomial
from scipy import optimize

def f(T, psat):
    A = 69.272
    B = -7202.1
    C = -7.9938
    D = 0.0053397
    return A + B/T + C*np.log(T)+D*T - np.log(psat)

def fp(T, psat):
    A = 69.272
    B = -7202.1
    C = -7.9938
    D = 0.0053397
    return (-B/(T*T) + C/T + D)

def getSaturationTemperature(psat):
    sol = optimize.newton(f, 50, fprime = fp, args = (psat,))
   # print(sol)
    return sol
    

def getSaturationPressure(Tc):
    A = 69.272
    B = -7202.1
    C = -7.9938
    D = 0.0053397
    T = Tc + 273
    logpsat = A + B/T + C*np.log(T)+D*T
    psat = np.exp(logpsat)
    return psat

def redlich_kwong_func(v, p, T):
    a, b = 142.59, 0.02111
    Rbar = 8.314
    return (p/100 - Rbar*T/(v-b)*1/100 + a/(v*(v+b)*np.sqrt(T)))

def getSaturationProperties(Tsat):
    Tbase = 273.15
    C2K = 273.15
    Cpw = 4.186
    Rbar = 8.314
    MWw = 18.01528
    
    props = {'Tsat': Tsat}
    Psat = getSaturationPressure(Tsat)
    props['Psat'] = Psat
  
    Tsata = Tsat + C2K
    
    ah,bh,ch = -0.001519, -1.4483, 3009.4
    hfg = ah*Tsata*Tsata + bh*Tsata + ch
    hf = Cpw*Tsat
    hg = hf + hfg
    props['hf'] = hf
    props['hfg'] = hfg
    props['hg'] = hg
    
    sf = Cpw*np.log(Tsata/Tbase);
    sfg = hfg/Tsata;
    sg = sf + sfg;
    props['sf'] = sf
    props['sfg'] = sfg
    props['sg'] = sg
    
    # Specific volume
    vinit = Rbar*Tsata/Psat
    vbar = optimize.newton(redlich_kwong_func, vinit, args = (Psat, Tsata))
    vg = vbar/MWw
    props['vg'] = vg
    
    # Internal energy
    uf = Cpw*(Tsata-273.15);
    ug = hg - Psat*vg;
    ufg = ug - uf;
    props['uf'] = uf
    props['ufg'] = ufg
    props['ug'] = ug
    return props

def getPsychroPropertiesFromTdRH(Td, RH, ptotal = 101.3025):
    Cpa = 1.005
    Ta = 273.15
    RHp = RH*100
    props = getSaturationProperties(Td)
   # print('Saturation properties ', props)
    Psat = props['Psat']
    hg = props['hg']
    pv = Psat*RH
    omega = 0.6220746*pv/(ptotal - pv)
    h = Cpa*(Td)+ omega*hg
    Twet = Td*np.arctan(0.151977*(RHp+8.313659)**(0.5)) + np.arctan(Td+RHp)-np.arctan(RHp - 1.676331) + 0.00391838*((RHp)**(1.5))*np.arctan(0.023101*RHp)-4.686035
    Tdew = getSaturationTemperature(pv) - Ta
    psychroprops = {'Tdry': Td, "RH": RH, 'omega': omega, 'pv': pv, 'Twet': Twet, 'Tdew': Tdew, 'h': h, 'saturationProperties': props}
    return psychroprops

def getPsychroPropertiesFromTdTwet(Td, Twet):
    Cpa = 1.005
    Ta = 273.15
    propsTd = getSaturationProperties(Td)
    propsTwet = getPsychroPropertiesFromTdRH(Twet, 1, ptotal = 101.3025)
    hg1 = propsTd['hg']
    hfg2 = propsTwet['saturationProperties']['hfg']
    hf2 = propsTwet['saturationProperties']['hf']
    o2 = propsTwet['omega']
    
    o1 = (Cpa*(Twet - Td) + o2*hfg2)/(hg1 - hf2)
    pv = ptotal*o1/(0.622+o1)
    h = Cpa*(Td)+ o1*hg1
    Tdew = getSaturationTemperature(pv) - Ta
    RH = pv/propsTd['Psat']
    psychroprops = {'Tdry': Td, "RH": RH, 'omega': o1, 'pv': pv, 'Twet': Twet, 'Tdew': Tdew, 'h': h, 'saturationProperties': propsTd}
    return psychroprops

def getPsychroPropertiesFromEnthalpyOmega(h, omega, ptotal = 101.3025):
    Cpa = 1.005
    Cpw = 4.8016
    ah,bh,ch = -0.001519, -1.4483, 3009.4
    Ta = 273.15
    
    p = [omega*ah, (Cpa + bh*omega + Cpw*omega), (omega*ch-Cpw*Ta*omega -Cpa*Ta -h)]
    r = np.roots(p)
    Td = np.min(r) - Ta
    propsTd = getSaturationProperties(Td)
    Psat = propsTd['Psat']
    pv = ptotal*omega/(0.622+omega)
    RH = pv/Psat
    RHp = RH*100
    Twet = Td*np.arctan(0.151977*(RHp+8.313659)**(0.5)) + np.arctan(Td+RHp)-np.arctan(RHp - 1.676331) + 0.00391838*((RHp)**(1.5))*np.arctan(0.023101*RHp)-4.686035
    Tdew = getSaturationTemperature(pv) - Ta
    psychroprops = {'Tdry': Td, "RH": RH, 'omega': omega, 'pv': pv, 'Twet': Twet, 'Tdew': Tdew, 'h': h, 'saturationProperties': propsTd}
    return psychroprops

# T = 35
# psat = getSaturationPressure(T)
# print("Saturation pressure for temperature ", T, " is ", psat)

# psat = 100
# Tsata = getSaturationTemperature(psat)
# Tsat = Tsata - 273.15

# print('Saturation temperature for pressure ', psat, ' is temperature ', Tsat)

# Tsat = 35
# props = getSaturationProperties(Tsat)
# print(props)

# Td = 40
# RH = 0.3
# ptotal = 101.3025
# props = getPsychroPropertiesFromTdRH(Td, RH, ptotal)
# print(props)

# omega = 0.013908
# h = 76
# props = getPsychroPropertiesFromEnthalpyOmega(h, omega)
#print(props)