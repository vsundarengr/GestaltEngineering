import numpy as np
import prairielearn as pl

def generate(data):

    # Number of digits after the decimal
    nDigits = 0
    # Dimension
    n1 = np.random.randint(2,4)
    n2 = np.random.randint(2,4)
    n3 = np.random.randint(2,4)
    # Matrix
    A = np.random.randint(-3, 3, size=(n1,n2))
    B = np.random.randint(-5, 5, size = (n2,n3))
    # Product
    #C = A@A.T
    C = np.dot(A,B)
    # Return data
    data["params"]["nDigits"] = nDigits
    data["params"]["sigfigs"] = nDigits + 1
    data["params"]["A"] = pl.to_json(A)
    data["params"]["B"] = pl.to_json(B)
    data["correct_answers"]["C"] = pl.to_json(C)
