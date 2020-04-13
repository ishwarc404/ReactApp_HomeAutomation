import pandas as pd  
import datetime
import random
import numpy as np  
from sklearn.model_selection import train_test_split 
from sklearn.linear_model import LinearRegression
from sklearn import metrics
import requests
import json
def init():
    df = pd.DataFrame(columns=["date","units","day"])
    base = datetime.datetime.today()
    historyDays = 60
    date_list = [(base - datetime.timedelta(days=x)).strftime("%d/%m/%Y")for x in range(historyDays)]
    day_list = [x for x in range(1,historyDays+1)]
    units_list = [random.randrange(13,20) for x in range(historyDays)]
    df["date"] = date_list
    df["units"] = units_list
    df["day"] = day_list
    df.to_csv("electricityUsage.csv",index=False)





def returnCost():

    init()

    # dataset = pd.read_csv("./backend_scripts/electricityUsage.csv")
    dataset = pd.read_csv("electricityUsage.csv")

    X = dataset['day'].values.reshape(-1,1)
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

    # calculating total cost
    currentDay = int((datetime.datetime.now()).strftime("%d"))
    numerOfDaysFromMonthStart = currentDay
    numerOfDaysTillMonthEnd = 30 - currentDay
    numberOfDaysInDataSet = len(all_units)


    ######## lets overwrite the json server once , we need to create a list of dictionaries
    templateDict = {"x":0,"y":0}
    #now we need to prepare a list of all the values of this month uptil the current day
    newvalues = []
    day  = 0

    for units in all_units[-numerOfDaysFromMonthStart:]:
        day+=1
        newvalues.append( {"x":day,"y":units} )
    
    # print(newvalues)
    response = requests.get('http://localhost:3000/deviceData?username=ishwar')
    received = response.json()
    data = received[0]
    #we need to overrite 'electricity_usage'
    data['electricity_usage'] = newvalues
    userID = data["id"]
    data=json.dumps(data)
    print((data))
    requests.put("http://localhost:3000/deviceData/1",data=data,headers={"content-type": "application/json"})
    ########END OF JSON UPDATE


    costPerUnit = 7.20

    costTillNow = 0
    for units in all_units[-numerOfDaysFromMonthStart:]:
        costTillNow += costPerUnit * units


    totalPredicted = 0 
    for dayNumber in range(numerOfDaysTillMonthEnd):
        totalPredicted = totalPredicted + costPerUnit * ((regressor.coef_[0][0] * (dayNumber)) + regressor.intercept_[0])

    return(round(totalPredicted+costTillNow))


