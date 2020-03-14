import React, { Component } from "react";
import DevicesConnected from "./devices";
import SensorData from "./sensorData";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
// import Animations from "./skeleton";
import SensorControlCard from "./sensor_card";
import TransitionsModal from "./modal_login";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import LinearLoader from "./linearLoading";
const useStyles = theme => ({
  topBar: {
    backgroundColor: "#1976d2",
    fontSize: 20
  },
  buttons: {}
});
class NavigationBar extends Component {
  state = {
    device_counters: [],
    sensorInfo: [],
    mainScreenMessage: "SignIn to get started",
    sensorMessage: "",
    userEmailID: "oldemail",
    userPassword: "",
    SignInButtonState: [1],
    linearLoading: []
  };

  constructor() {
    super();
    this.addnewDevice = this.addnewDevice.bind(this);
    this.removeDevice = this.removeDevice.bind(this);
    this.importDevices = this.importDevices.bind(this);
    this.importSensorData = this.importSensorData.bind(this);
    this.testfunction = this.testfunction.bind(this);
  }

  render() {
    let centre_class = "d-flex justify-content-center";
    let devices_class = "d-flex flex-wrap justify-content-around";
    let div_class = "d-inline justify-content-center";
    let badge1_class = "badge m-2 badge-primary ";
    let badge2_class = "badge m-2 badge-dark ";
    let addnewdevicebutton_class = "m-8";
    let importdevicebutton_class = "m-2";
    const { classes } = this.props;

    // let menuButton = {
    //   marginRight: theme.spacing(20)
    // };
    return (
      <div>
        <AppBar className={classes.topBar} position="static">
          <Toolbar variant="regular">
            <Typography variant="title" color="inherit">
              Home Automation System
            </Typography>
            <Box ml="auto">
              <Button
                variant="contained"
                onClick={this.importDevices}
                className={classes.buttons}
              >
                IMPORT DEVICES
              </Button>
              &nbsp; &nbsp;
              <Button
                variant="contained"
                onClick={this.importSensorData}
                className={classes.buttons}
              >
                SENSOR INFORMATION
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <br />
        <br />
        <div className={centre_class}>
          <h2
            style={{
              fontSize: 30,
              color: "#212121",
              fontFamily: "Roboto"
            }}
          >
            {this.state.mainScreenMessage}
          </h2>
          <br />
        </div>
        <br />
        <div className={centre_class}>
          {this.state.SignInButtonState.map(counter => (
            <TransitionsModal
              testfunction={this.testfunction} //passing the callback as props
            ></TransitionsModal>
          ))}
        </div>
        <div className={centre_class}>
          {this.state.linearLoading.map(counter => (
            <LinearLoader></LinearLoader>
          ))}
        </div>

        <Box className={devices_class}>
          {this.state.device_counters.map(counter => (
            <DevicesConnected
              key={counter.id}
              device_name={counter.device_name}
              device_ID={counter.device_ID}
              className={devices_class}
            ></DevicesConnected>
          ))}
        </Box>
        <br />
        <br />
        <h2
          style={{
            fontSize: 30,
            color: "#212121",
            fontFamily: "Roboto"
          }}
          className={centre_class}
        >
          {this.state.sensorMessage}
        </h2>
        <Box className={centre_class}>
          {this.state.sensorInfo.map(counter => (
            <div>
              <SensorControlCard
                sensor_name={counter.sensor_name}
                sensor_value={counter.sensor_value}
              ></SensorControlCard>
              &nbsp;&nbsp;&nbsp;
            </div>
          ))}
        </Box>
      </div>
    );
  }

  async importDevices() {
    //do not need the following anymore
    // var userName = prompt("Enter username:");
    // var userPassword = prompt("Enter password:");

    var proxy = "https://cors-anywhere.herokuapp.com/";
    var targetUrl = "https://api.myjson.com/bins/1a5jya";
    let data_retrtieved;
    this.state.device_counters = [];
    console.log("imported");
    await fetch(proxy + targetUrl).then(response =>
      response.json().then(data => (data_retrtieved = data))
    );
    for (var i = 0; i < data_retrtieved["device_name"].length; i++) {
      this.state.device_counters.push({
        device_name: data_retrtieved.device_name[i],
        device_ID: data_retrtieved.device_ID[i]
      });
    }
    if (data_retrtieved["device_name"].length > 0) {
      this.state.mainScreenMessage = "Connected Devices";
    } else {
      this.state.mainScreenMessage = "No devices available!";
    }

    this.state.linearLoading = []; //removing the linear loader

    this.setState({
      linearLoading: this.state.linearLoading,
      device_counters: this.state.device_counters,
      mainScreenMessage: this.state.mainScreenMessage
    });
  }

  addnewDevice() {
    var device_name = prompt("Enter device name:");
    var device_ID = prompt("Enter device code:");

    if (device_name === null) {
      return;
    }
    if (device_ID.length === null) {
      return;
    }
    if (device_name.length === 0) {
      return;
    }
    if (device_ID.length === 0) {
      return;
    }
    this.state.device_counters.push({
      device_name: device_name,
      device_ID: device_ID
    }); //these will be used to identify the device

    this.setState({ device_counters: this.state.device_counters });
  }

  removeDevice() {
    //maybe when we use this functionality, we remove a specefic device only.
    this.state.device_counters.pop();
    console.log(this.state.device_counters);
    this.setState({ device_counters: this.state.device_counters });
  }

  async importSensorData() {
    this.state.sensorInfo = [];
    //need to set up an async request here to the database or to the AWS Console

    var proxy = "https://cors-anywhere.herokuapp.com/";
    var targetUrl = "https://api.myjson.com/bins/1d6v4y";
    let data_retrtieved;
    this.state.sensorInfo = [];
    console.log("imported sensor info");
    await fetch(proxy + targetUrl).then(response =>
      response.json().then(data => (data_retrtieved = data))
    );
    for (var i = 0; i < data_retrtieved["sensor_name"].length; i++) {
      this.state.sensorInfo.push({
        sensor_name: data_retrtieved.sensor_name[i],
        sensor_ID: data_retrtieved.sensor_ID[i],
        sensor_value: data_retrtieved.sensor_value[i]
      });
    }
    console.log(this.state.sensorInfo);
    this.state.sensorMessage = "Available sensor data";
    this.setState({
      sensorInfo: this.state.sensorInfo,
      sensorMessage: this.state.sensorMessage
    });
  }

  testfunction(userEmailID, userPassword) {
    // alert("EmailID: " + userEmailID + "\n" + "Password: " + userPassword);
    this.state.userEmailID = userEmailID;
    this.state.userPassword = userPassword;
    this.state.linearLoading = [1];
    this.state.SignInButtonState = []; //empty because we need to remove it.
    this.state.mainScreenMessage = "Loading Devices";

    setTimeout(() => {
      this.setState({
        userEmailID: this.state.userEmailID,
        userPassword: this.state.userPassword,
        linearLoading: this.state.linearLoading,
        SignInButtonState: this.state.SignInButtonState,
        mainScreenMessage: this.state.mainScreenMessage
      });
    }, 3500);

    setTimeout(() => {
      this.importDevices();
    }, 6000);
  }
}

export default withStyles(useStyles)(NavigationBar);
