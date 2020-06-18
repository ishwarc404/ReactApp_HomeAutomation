from flask import Flask

app = Flask(__name__)

@app.route("/on",methods=["GET"])
def main1():
    print("SWTCHED ON")
    return "SWITCHED ON"

@app.route("/off",methods=["GET"])
def main2():
    print("SWTCHED OFF")
    return "SWITCHED OFF"

if __name__ == "__main__" :
    app.debug = True
    app.run()