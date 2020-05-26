from matplotlib import pyplot as plt
import time
import requests


def addUserTest(count):
    for i in range(count):
        requests.post("http://localhost:8888/loginAuthentication")


count = {}
counts = [20,40,80,100,150,200,300,400,450,500,600,800,1000]
finaltimes = []
for i in counts:
    print("COUNT: ", i)
    start_time = time.time()
    addUserTest(i)
    finaltimes.append(time.time() - start_time)
    print("Time Taken: ",time.time() - start_time)

print(finaltimes)
plt.plot(counts, finaltimes)
plt.show()


"""
{
  "loginAuthentication": [],
  "deviceData": []
}
"""
