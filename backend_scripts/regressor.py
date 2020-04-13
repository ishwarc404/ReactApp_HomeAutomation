import pandas as pd  
import datetime
import random
import numpy as np  
import matplotlib.pyplot as plt  
import seaborn as seabornInstance 
from sklearn.model_selection import train_test_split 
from sklearn.linear_model import LinearRegression
from sklearn import metrics

def init():
    df = pd.DataFrame(columns=["date","units"])
    base = datetime.datetime.today()
    date_list = [int((base - datetime.timedelta(days=x)).strftime("%d")) for x in range(60)]
    units_list = [random.randrange(13,20) for x in range(60)]
    df["date"] = date_list
    df["units"] = units_list
    df.to_csv("./backend_scripts/electricityUsage.csv",index=False)


# init()

dataset = pd.read_csv("./backend_scripts/electricityUsage.csv")
dataset.plot(x='date', y='units', style='o')  
# plt.show()


X = dataset['date'].values.reshape(-1,1)
y = dataset['units'].values.reshape(-1,1)
all_units  = list(dataset['units'])

# print(all_units)
#linear regression model
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)
#training the algorithm
regressor = LinearRegression()  
regressor.fit(X_train, y_train) 


#To retrieve the intercept:
# print(regressor.intercept_)
#For retrieving the slope:
# print(regressor.coef_)

# dayNumber = 13
# y = (regressor.coef_[0][0] * (3)) + regressor.intercept_[0]
# print(round(y))

# # calculating total cost
# currentDay = int((datetime.datetime.now()).strftime("%d"))
# numerOfDaysFromMonthStart = currentDay
# numerOfDaysTillMonthEnd = 30 - currentDay
# numberOfDaysInDataSet = len(all_units)

costPerUnit = 7.20
total = 0 
for dayNumber in range(30):
    total = total + costPerUnit * ((regressor.coef_[0][0] * (dayNumber)) + regressor.intercept_[0])

print(round(total))