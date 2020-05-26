import unittest
import requests
import json


class TestStringMethods(unittest.TestCase):
    
    def test_adduser(self):
        
        api_data = {
            "username": "user1",
            "password": "98f325e67"
        }
        URL = "http://127.0.0.1:8888/loginAuthentication"
        object_returned = requests.post(URL,data=api_data)
        self.assertEqual(len((object_returned.content.decode('UTF-8'))),0) #checking body content
        self.assertEqual(object_returned.status_code,200) #checking status code


        #adding extra usernames for further testing
        extra_unames = ["user5","user6","user7","user8"]
        for i in extra_unames:
            api_data["username"] = i
            object_returned = requests.post(URL,data=api_data)
            self.assertEqual(len((object_returned.content.decode('UTF-8'))),0) #checking body content
            self.assertEqual(object_returned.status_code,200) #checking status code


    def test_ledControl(self):
        URL = "http://127.0.0.1:8000/led_on"
        object_returned = requests.get(URL)
        self.assertEqual(object_returned.status_code,200) #checking status code
    


    def test_ledControlOff(self):
        URL = "http://127.0.0.1:8000/led_off"
        object_returned = requests.get(URL)
        self.assertEqual(object_returned.status_code,200) #checking status code


    def test_doorControl(self):
        URL = "http://127.0.0.1:8000/door_on"
        object_returned = requests.get(URL)
        self.assertEqual(object_returned.status_code,200) #checking status code

    def test_doorControlOff(self):
        URL = "http://127.0.0.1:8000/door_off"
        object_returned = requests.get(URL)
        self.assertEqual(object_returned.status_code,200) #checking status code

    
    def test_regressor(self):
        URL = "http://127.0.0.1:8000/electricity_bill"
        object_returned = requests.get(URL)
        self.assertTrue(len((object_returned.content.decode('UTF-8')))) #checking body content
        self.assertEqual(object_returned.status_code,200) #checking status code
    
    def test_ledFailure(self):
        URL = "http://127.0.0.1:8000/led_on"
        object_returned = requests.post(URL)
        self.assertEqual(object_returned.status_code,405) #checking status code
    
    def test_doorFailure(self):
        URL = "http://127.0.0.1:8000/door_on"
        object_returned = requests.post(URL)
        self.assertEqual(object_returned.status_code,405) #checking status code


    def test_videostreaming(self):
        URL = "http://127.0.0.1:3002"
        object_returned = requests.get(URL)
        self.assertEqual(object_returned.status_code,200) #checking status code
    
    def test_videostreamingFailure(self):
        URL = "http://127.0.0.1:3002"
        object_returned = requests.post(URL)
        self.assertEqual(object_returned.status_code,404) #checking status code
    
    # def test_doorFailure1(self):
    #     URL = "http://127.0.0.1:8000/door_on"
    #     object_returned = requests.post(URL)
    #     self.assertEqual(object_returned.status_code,405) #checking status code


    # def test_doorFailure2(self):
    #     URL = "http://127.0.0.1:8000/door_on"
    #     object_returned = requests.post(URL)
    #     self.assertEqual(object_returned.status_code,405) #checking status code
    
    # def test_doorFailure3(self):
    #     URL = "http://127.0.0.1:8000/door_on"
    #     object_returned = requests.post(URL)
    #     self.assertEqual(object_returned.status_code,405) #checking status code



if __name__ == '__main__':
    unittest.main()