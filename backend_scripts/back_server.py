from flask_cors import CORS, cross_origin
from flask import Flask, request, render_template
import json
app = Flask(__name__)
CORS(app)

# this is the main device status dictionary
device_status = {
    "led_status": "on",
    "door_status": "off"
}


@app.route("/")
@cross_origin()
def index():
    return render_template("server.html")


# note this led on is different from what is running on the local server
@app.route("/led_on")
# this route runs only on the AWS
@cross_origin()
def led_on():
    device_status["led_status"] = "on"
    return render_template("server.html")


@app.route("/led_off")
@cross_origin()
def led_off():
    device_status["led_status"] = "off"
    return render_template("server.html")


# note this led on is different from what is running on the local server
@app.route("/door_on")
# this route runs only on the AWS
@cross_origin()
def door_on():
    device_status["door_status"] = "on"
    return render_template("server.html")


@app.route("/door_off")
@cross_origin()
def door_off():
    device_status["door_status"] = "off"
    return render_template("server.html")



@app.route("/return_status")
@cross_origin()
def return_status():
    return_data = json.dumps(device_status)
    return return_data

# we need to create another route here to handle assistant requests


if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0", port=8000)
