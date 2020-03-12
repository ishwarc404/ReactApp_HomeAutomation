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

class NavigationBar extends Component {
  state = {
    device_counters: [],
    sensorInfo: [],
    mainScreenMessage: "Click on Import Devices to get started",
    sensorMessage: ""
  };

  constructor() {
    super();
    this.addnewDevice = this.addnewDevice.bind(this);
    this.removeDevice = this.removeDevice.bind(this);
    this.importDevices = this.importDevices.bind(this);
    this.importSensorData = this.importSensorData.bind(this);
  }

  render() {
    let centre_class = "d-flex justify-content-center";
    let devices_class = "d-flex flex-wrap justify-content-around";
    let div_class = "d-inline justify-content-center";
    let badge1_class = "badge m-2 badge-primary ";
    let badge2_class = "badge m-2 badge-dark ";
    let addnewdevicebutton_class = "m-8";
    let importdevicebutton_class = "m-2";

    // let menuButton = {
    //   marginRight: theme.spacing(20)
    // };
    return (
      <div>
        <AppBar position="static">
          <Toolbar variant="regular">
            <Typography variant="title" color="inherit">
              Home Automation System
            </Typography>
            <Box ml="auto">
              <Button variant="contained" onClick={this.importDevices}>
                IMPORT DEVICES
              </Button>
              &nbsp; &nbsp;
              <Button variant="contained" onClick={this.importSensorData}>
                SENSOR INFORMATION
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <br />
        <br />
        <div>
          <h2
            style={{
              fontSize: 30,
              color: "#212121",
              fontFamily: "Roboto"
            }}
            className={centre_class}
          >
            {this.state.mainScreenMessage}
          </h2>
          <br />
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
    var userName = prompt("Enter username:");
    var userPassword = prompt("Enter password:");

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

    this.setState({
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
}

export default NavigationBar;
