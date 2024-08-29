---
title: "Jupyter"
summary: "This is a first Jupyter Notebook for testing. Nulla tempor urna non imperdiet consequat."
date: "2024-04-28"
postimg: "raspberry.jpg"
tags:
    - "test"
    - "news"
---

# Another Jupyter
redrubycorn
2024-05-22

# First Neural Net Learning Notebook

This notebook uses the Iris dataset.

``` python
import pandas as pd
import tensorflow as tf
from sklearn.model_selection import train_test_split
```

    2024-05-20 14:53:10.738862: E external/local_xla/xla/stream_executor/cuda/cuda_dnn.cc:9261] Unable to register cuDNN factory: Attempting to register factory for plugin cuDNN when one has already been registered
    2024-05-20 14:53:10.738997: E external/local_xla/xla/stream_executor/cuda/cuda_fft.cc:607] Unable to register cuFFT factory: Attempting to register factory for plugin cuFFT when one has already been registered
    2024-05-20 14:53:10.902309: E external/local_xla/xla/stream_executor/cuda/cuda_blas.cc:1515] Unable to register cuBLAS factory: Attempting to register factory for plugin cuBLAS when one has already been registered

``` python
# load the csv file
path = "../input/iris/Iris.csv"
data = pd.read_csv(path, delimiter=',')
```

``` python
# return the first rows of the data, default is 5 or use n=x to get a personalized number of rows
print(data.head(n=6))
```

       Id  SepalLengthCm  SepalWidthCm  PetalLengthCm  PetalWidthCm      Species
    0   1            5.1           3.5            1.4           0.2  Iris-setosa
    1   2            4.9           3.0            1.4           0.2  Iris-setosa
    2   3            4.7           3.2            1.3           0.2  Iris-setosa
    3   4            4.6           3.1            1.5           0.2  Iris-setosa
    4   5            5.0           3.6            1.4           0.2  Iris-setosa
    5   6            5.4           3.9            1.7           0.4  Iris-setosa

We don’t need the Id column, so we can drop it. The column that the NN
needs to predict is the Species column.

``` python
# drop the Id column
data = data.drop(columns=['Id'])
```

``` python
col_name = 'Species'
```

We can get some basic information about the dataframe not only with
`.head()` but we can also look at the shape and some other statistical
features using `.describe()`. With `print(data[col_name].unique())` we
can get all unique values in the Species column, so the names of all 3
species.

``` python
print(f"The shape of the dataframe is {data.shape}")
print("\n")
print(f"The species are: {data[col_name].unique()}")
print("\n")
print(f"The first 3 rows are:")
print(data.head(n=3))
print("\n")
print("Some statics like count, mean and std: \n")
print(data.describe())
```

    The shape of the dataframe is (150, 5)


    The species are: ['Iris-setosa' 'Iris-versicolor' 'Iris-virginica']


    The first 3 rows are:
       SepalLengthCm  SepalWidthCm  PetalLengthCm  PetalWidthCm      Species
    0            5.1           3.5            1.4           0.2  Iris-setosa
    1            4.9           3.0            1.4           0.2  Iris-setosa
    2            4.7           3.2            1.3           0.2  Iris-setosa


    Some statics like count, mean and std: 

           SepalLengthCm  SepalWidthCm  PetalLengthCm  PetalWidthCm
    count     150.000000    150.000000     150.000000    150.000000
    mean        5.843333      3.054000       3.758667      1.198667
    std         0.828066      0.433594       1.764420      0.763161
    min         4.300000      2.000000       1.000000      0.100000
    25%         5.100000      2.800000       1.600000      0.300000
    50%         5.800000      3.000000       4.350000      1.300000
    75%         6.400000      3.300000       5.100000      1.800000
    max         7.900000      4.400000       6.900000      2.500000

Right now the column col_name has the names of the different species
(setosa, versicolor and virginica). But the NN can’t work with strings,
it needs a numerical representation of the different species. So we need
to transform these column values.

``` python
# transform the strings to numeric values
data[col_name] = data[col_name].astype('category')
data[col_name] = data[col_name].cat.codes
```

The first line of code converts the “species” column in your Pandas
DataFrame into a categorical data type. This means that Pandas will
treat the values in this column as categories rather than plain strings,
which can save memory and speed up certain operations.

The second line of code then converts these categorical values into
numerical codes using the `.cat.codes`. Each unique category in the
“species” column will be assigned a numerical code, which can be useful
for various analytical tasks, especially when working with machine
learning algorithms that require numerical inputs.

``` python
# divide the table, the column with the species is now in the col variable, the rest of the table in data
# axis=1 says that a column is selected and not a row
col = data[col_name]
data = data.drop([col_name], axis=1)
```

``` python
# split the data into training data and testing data
train_data, test_data, train_col, test_col = train_test_split(data, col, test_size=0.2)
```

``` python
print("Training data")
print(train_data.head())
print(f"The shape is: {train_data.shape}.")
print("\n")

print("Testing data")
print(test_data.head())
print(f"The shape is: {test_data.shape}.")
```

    Training data
         SepalLengthCm  SepalWidthCm  PetalLengthCm  PetalWidthCm
    138            6.0           3.0            4.8           1.8
    96             5.7           2.9            4.2           1.3
    71             6.1           2.8            4.0           1.3
    21             5.1           3.7            1.5           0.4
    101            5.8           2.7            5.1           1.9
    The shape is: (120, 4).


    Testing data
         SepalLengthCm  SepalWidthCm  PetalLengthCm  PetalWidthCm
    9              4.9           3.1            1.5           0.1
    60             5.0           2.0            3.5           1.0
    69             5.6           2.5            3.9           1.1
    108            6.7           2.5            5.8           1.8
    41             4.5           2.3            1.3           0.3
    The shape is: (30, 4).

``` python
print("Training column")
print(train_col.head())
print(f"The shape is: {train_col.shape}.")
print("\n")

print("Testing column")
print(test_col.head())
print(f"The shape is: {test_col.shape}.")
```

    Training column
    138    2
    96     1
    71     1
    21     0
    101    2
    Name: Species, dtype: int8
    The shape is: (120,).


    Testing column
    9      0
    60     1
    69     1
    108    2
    41     0
    Name: Species, dtype: int8
    The shape is: (30,).

``` python
# build the NN
model = tf.keras.Sequential([
    tf.keras.layers.Input(shape=(4,)),  # explicitly define the input layer
    tf.keras.layers.Dense(32, activation=tf.nn.sigmoid),
    tf.keras.layers.Dense(64, activation=tf.nn.sigmoid),
    tf.keras.layers.Dense(3, activation=tf.nn.softmax)
])
```

Use the `tf.keras.layers.Input` layer to specify the input shape of the
model.

Softmax is the activation function of the output layer. This function
ensures that the sum of all probabilities equals exactly 1.

$$
S\_{y_i} = \frac{\mathrm{e}^{y_i}}{\sum\_{j}^{n}\mathrm{e}^{y_j}}
$$

``` python
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
```

``` python
model.fit(train_data, train_col, epochs=30)
```

    Epoch 1/30
    4/4 ━━━━━━━━━━━━━━━━━━━━ 1s 5ms/step - accuracy: 0.3460 - loss: 1.1702
    Epoch 2/30
    4/4 ━━━━━━━━━━━━━━━━━━━━ 0s 3ms/step - accuracy: 0.3679 - loss: 1.1110 
    Epoch 3/30
    4/4 ━━━━━━━━━━━━━━━━━━━━ 0s 3ms/step - accuracy: 0.1844 - loss: 1.1088 
    Epoch 4/30
    4/4 ━━━━━━━━━━━━━━━━━━━━ 0s 3ms/step - accuracy: 0.3587 - loss: 1.1024 
    Epoch 5/30
    4/4 ━━━━━━━━━━━━━━━━━━━━ 0s 3ms/step - accuracy: 0.3421 - loss: 1.0995 
    Epoch 6/30
    4/4 ━━━━━━━━━━━━━━━━━━━━ 0s 3ms/step - accuracy: 0.3202 - loss: 1.0989 
    Epoch 7/30
    4/4 ━━━━━━━━━━━━━━━━━━━━ 0s 3ms/step - accuracy: 0.3400 - loss: 1.0818 
    Epoch 8/30
    4/4 ━━━━━━━━━━━━━━━━━━━━ 0s 3ms/step - accuracy: 0.6377 - loss: 1.0769 
    Epoch 9/30
    4/4 ━━━━━━━━━━━━━━━━━━━━ 0s 3ms/step - accuracy: 0.6308 - loss: 1.0759 
    Epoch 10/30
    4/4 ━━━━━━━━━━━━━━━━━━━━ 0s 3ms/step - accuracy: 0.6954 - loss: 1.0604 
    Epoch 11/30
    4/4 ━━━━━━━━━━━━━━━━━━━━ 0s 3ms/step - accuracy: 0.6871 - loss: 1.0542 
    Epoch 12/30
    4/4 ━━━━━━━━━━━━━━━━━━━━ 0s 3ms/step - accuracy: 0.6642 - loss: 1.0512 
    Epoch 13/30
    4/4 ━━━━━━━━━━━━━━━━━━━━ 0s 3ms/step - accuracy: 0.6725 - loss: 1.0436 
    Epoch 14/30
    4/4 ━━━━━━━━━━━━━━━━━━━━ 0s 3ms/step - accuracy: 0.6735 - loss: 1.0343 
    Epoch 15/30
    4/4 ━━━━━━━━━━━━━━━━━━━━ 0s 3ms/step - accuracy: 0.7048 - loss: 1.0213 
    Epoch 16/30
    4/4 ━━━━━━━━━━━━━━━━━━━━ 0s 3ms/step - accuracy: 0.7256 - loss: 1.0057 
    Epoch 17/30
    4/4 ━━━━━━━━━━━━━━━━━━━━ 0s 3ms/step - accuracy: 0.6902 - loss: 1.0052 
    Epoch 18/30
    4/4 ━━━━━━━━━━━━━━━━━━━━ 0s 3ms/step - accuracy: 0.6777 - loss: 0.9996 
    Epoch 19/30
    4/4 ━━━━━━━━━━━━━━━━━━━━ 0s 3ms/step - accuracy: 0.7277 - loss: 0.9786 
    Epoch 20/30
    4/4 ━━━━━━━━━━━━━━━━━━━━ 0s 3ms/step - accuracy: 0.6798 - loss: 0.9793 
    Epoch 21/30
    4/4 ━━━━━━━━━━━━━━━━━━━━ 0s 3ms/step - accuracy: 0.6913 - loss: 0.9655 
    Epoch 22/30
    4/4 ━━━━━━━━━━━━━━━━━━━━ 0s 3ms/step - accuracy: 0.6850 - loss: 0.9539 
    Epoch 23/30
    4/4 ━━━━━━━━━━━━━━━━━━━━ 0s 3ms/step - accuracy: 0.7194 - loss: 0.9330 
    Epoch 24/30
    4/4 ━━━━━━━━━━━━━━━━━━━━ 0s 3ms/step - accuracy: 0.7017 - loss: 0.9251 
    Epoch 25/30
    4/4 ━━━━━━━━━━━━━━━━━━━━ 0s 2ms/step - accuracy: 0.6756 - loss: 0.9227 
    Epoch 26/30
    4/4 ━━━━━━━━━━━━━━━━━━━━ 0s 3ms/step - accuracy: 0.7110 - loss: 0.8984 
    Epoch 27/30
    4/4 ━━━━━━━━━━━━━━━━━━━━ 0s 3ms/step - accuracy: 0.6652 - loss: 0.8951 
    Epoch 28/30
    4/4 ━━━━━━━━━━━━━━━━━━━━ 0s 3ms/step - accuracy: 0.7006 - loss: 0.8723 
    Epoch 29/30
    4/4 ━━━━━━━━━━━━━━━━━━━━ 0s 3ms/step - accuracy: 0.7308 - loss: 0.8518 
    Epoch 30/30
    4/4 ━━━━━━━━━━━━━━━━━━━━ 0s 3ms/step - accuracy: 0.7173 - loss: 0.8333 

    <keras.src.callbacks.history.History at 0x79e18d03c9d0>
