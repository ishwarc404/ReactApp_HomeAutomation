import json
import random
import string
from flask import Flask, request, render_template
import json
import requests

app = Flask(__name__)


def randomString(stringLength=8):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(stringLength))


@app.route("/loginAuthentication", methods=["POST"])
def index():
    username = randomString()
    password = randomString()

    userdata = {
        "username": username,
        "password": password
    }

    # userdata = json.dumps(userdata)
    # requests.post("http://localhost:3000/loginAuthentication",
    #               data=userdata, headers={"content-type": "application/json"})

    return "", 200


if __name__ == "__main__":
    app.debug = True
    app.run(port=8888)
