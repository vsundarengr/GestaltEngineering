# import packages
from numpy.polynomial.polynomial import polyval
import numpy as np

# Creating an array
array = np.array([[3, 4], [5, 6]])
print(array)

# shape of the array is
print("Shape of the array is : ", array.shape)

# dimension of the array
print("The dimension of the array is : ", array.ndim)

# Datatype of the array
print("Datatype of our Array is : ", array.dtype)

# evaluating a polynomial at point x
print(polyval([2, 2], array))
