import random, copy
import numpy as np
import scipy as sp


def forwardElimination(C):
    (nRows, nCols) = C.shape
   # print(C.dtype)
    C = C.astype('float32')
   # print(C.dtype)
   # print('nRows = ', nRows, ' nCols = ', nCols)
   
    ca = []

    L = np.zeros([nRows, nRows])
    P = np.identity(nRows)

    for i in range(0, nRows-1):
        pivot = C[i,i]
        
        # if abs(C[i,i]) < 1e-5:
        #     print('Pivot is zero: Need new matrix')
        maxIndex = np.argmax(np.absolute(C[i:nRows +1, i]))
    #    print('Max index = ', maxIndex)
        C[[i, maxIndex + i],:] = C[[maxIndex + i, i],:]
        P[[i,maxIndex +i],:] = P[[maxIndex + i, i],:]
        L[[i,maxIndex +i],:] = L[[maxIndex + i, i],:]
    #    print('C after swapping is ', C)
        pivot = C[i,i]
        for k in range(i+1, nRows):
            fac = C[k,i]/pivot
    #        print('Factor = ', fac)
            C[k,:] = C[k,:] - fac*C[i,:]
    #        print('During elimination = ', C)
            L[k,i] = fac

        L1 = L + np.identity(nRows)
        if (i == nRows -1):
            L = L + np.identity(nRows)

        step = {'stepNum': i, 'P': P.tolist(), 'L': L1.tolist(), 'U': C.tolist()}
        ca.append(step)

    # print('After Elimination = ', C)
    return (P,L,C, ca)

def backSubstitution(C):
    (nRows, nCols) = C.shape
    sol = np.zeros((nRows,1))
    A = C[0:nRows, 0:nCols-1]
    B = C[0:nRows, nCols-1]
    # print('Before backward substitution ')
    # print('A = ', A)
    # print('B = ', B)

    for i in range(nRows-1,-1, -1):
        sol[i] = (B[i] - np.dot(A[i,:],sol))/A[i,i]
    #    print('Solution for step ', i, ' is ', sol)

    return sol

def generate():
    params = dict()
    correct_answers = dict()
    nDigits = 2
    sigfigs = 2
    data = dict(params=params, correct_answers=correct_answers, nDigits=nDigits, sigfigs=sigfigs)

    numVar = random.randint(3,3)
    x = np.random.randint(-4,5, size=(numVar,1))

    status = False

   
    detA = 0
    while detA == 0:
        A = np.random.randint(-4,5, size=(numVar,numVar))
        detA = np.linalg.det(A)
        b = np.matmul(A,x)
        # C = np.concatenate((A,b), axis = 1)
        # status, C = forwardElimination(C)

    P, L, U, ca = forwardElimination(A)

    P1, L1, U1, = sp.linalg.lu(A)

    A1 = np.matmul(L,U)
    A2 = np.matmul(P,A)

    # print('P = ', P, 'L = ', L, ' U = ', U)
    # print('P1 = ', P1, 'L1 = ', L1, ' U1 = ', U1)

    # A = np.array([ [0,1,3], [2,1,1],[3,0,1]])
    # b = np.transpose([[5,3,5]])
    # C = np.concatenate((A,b), axis = 1)
    # print(C)
    # status, C = forwardElimination(C)

    # sol = backSubstitution(C)

    # Put these two integers into data['params']
    data['params']['A'] = A.tolist()
    data['params']['b'] = b.tolist()
    data['steps'] = ca
    data['correct_answers'] = ca[0]

    # print('Correct answers = ', ca[0])

    # Compute the sum of these two integers

    # Put the sum into data['correct_answers']
    data['correct_answers']['P'] = ca[0]['P']
    data['correct_answers']['L'] = ca[0]['L']
    data['correct_answers']['U'] = ca[0]['U']

    return data


# data = generate()
# print(data)