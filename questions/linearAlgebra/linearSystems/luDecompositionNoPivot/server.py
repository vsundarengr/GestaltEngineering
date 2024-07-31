import random, copy
import numpy as np


def forwardElimination(C):
    (nRows, nCols) = C.shape
    C = C.astype('float32')
    status = False
    ca = []
    L = np.zeros([nRows, nRows])

    for i in range(0, nRows):
        pivot = C[i,i]
        
        if abs(pivot) < 1e-5:
     #       print('Pivot is zero: Need new matrix')
            return (status, C, ca, L)
    
        for k in range(i+1, nRows):
            fac = C[k,i]/pivot
      #      print('Factor = ', fac)
            C[k,:] = C[k,:] - fac*C[i,:]
            L[k,i] = fac
       #     print('During elimination = ', C)

        if (i == nRows -1):
            L = L + np.identity(nRows)

        step = { 'stepNum': i, 'A': C[:, 0:nRows-1].tolist(), 'b': C[:, nRows].tolist()}
        ca.append(step)

    status = True
    # print('After Elimination = ', C)
    return (status, C, ca, L)

def backSubstitution(C):
    (nRows, nCols) = C.shape
    sol = np.zeros((nRows,1))
    A = C[0:nRows, 0:nCols-1]
    B = C[0:nRows, nCols-1]
    #print('Before backward substitution ')
    #print('A = ', A)
    #print('B = ', B)

    for i in range(nRows-1,-1, -1):
        sol[i] = (B[i] - np.dot(A[i,:],sol))/A[i,i]
     #   print('Solution for step ', i, ' is ', sol)

    return sol

def generate():
    params = dict()
    correct_answers = dict()
    nDigits = 2
    sigfigs = 2
    data = dict(params=params, correct_answers=correct_answers, nDigits=nDigits, sigfigs=sigfigs)

    numVar = random.randint(2,4)
    x = np.random.randint(-4,5, size=(numVar,1))

    status = False

    while status == False:
        detA = 0
        while detA == 0:
            A = np.random.randint(-4,5, size=(numVar,numVar))
            detA = np.linalg.det(A)

        b = np.matmul(A,x)
        C = np.concatenate((A,b), axis = 1)
        status, C, ca,L = forwardElimination(C)

    sol = backSubstitution(C)
    y = np.linalg.solve(L, b)


    # Put these two integers into data['params']
    data['params']['A'] = A.tolist()
    data['params']['b'] = b.tolist()
    data['params']['ca'] = ca

    Ag = C[0:numVar, 0:numVar]
    Bg = C[0:numVar, numVar]

    # Compute the sum of these two integers

    # Put the sum into data['correct_answers']
    data['correct_answers']['L'] = L.tolist()
    data['correct_answers']['U'] = Ag.tolist()
    data['correct_answers']['y'] = y.tolist()
    data['correct_answers']['x'] = x.tolist()

    return data


# data = generate()
# print(data)