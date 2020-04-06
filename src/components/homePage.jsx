import React, { Component } from "react";
import DevicesConnected from "./devices";
import SensorData from "./sensorData";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import SensorControlCard from "./sensor_card";
import TransitionsModal from "./modal_login";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import LinearLoader from "./linearLoading";
import Grid from "@material-ui/core/Grid";
import FadeIn from "react-fade-in";
import apiService from "../services/apiServices";

const useStyles = (theme) => ({
  topBar: {
    backgroundColor: "#18191b",
    fontSize: 20,
    color: "#FFFFFF",
  },
  buttons: {
    backgroundColor: "#2e3133",
  },
});
class HomePage extends Component {
  state = {
    device_counters: [],
    sensorInfo: [],
    mainScreenMessage: "",
    sensorMessage: "",
    userName: null,
    SignInButtonState: [1],
    linearLoading: [],
    import_sensorButtonState: [],
  };

  constructor() {
    super();
    this.addnewDevice = this.addnewDevice.bind(this);
    this.removeDevice = this.removeDevice.bind(this);
    this.importDevices = this.importDevices.bind(this);
    this.importSensorData = this.importSensorData.bind(this);
    this.parentTrigger = this.parentTrigger.bind(this);
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
      <FadeIn>
        <div>
          <AppBar className={classes.topBar} position="static">
            <Toolbar variant="regular">
              <Typography variant="title">Home Automation System</Typography>
            </Toolbar>
          </AppBar>
          <br />
          <br />
          <br />
          <div className={centre_class}>
            {this.state.SignInButtonState.map((counter) => (
              <TransitionsModal
                parentTrigger={this.parentTrigger} //passing the callback as props
              ></TransitionsModal>
            ))}
          </div>
          <div className={centre_class}>
            {this.state.linearLoading.map((counter) => (
              <LinearLoader></LinearLoader>
            ))}
          </div>
          </div>
      </FadeIn>
    );
  }

  async importDevices() {
    //do not need the following anymore
    // var userName = prompt("Enter username:");
    // var userPassword = prompt("Enter password:");

    // var proxy = "https://cors-anywhere.herokuapp.com/";
    // //for global testing
    // var targetUrl = "https://api.myjson.com/bins/1a5jya";

    //for local testing
    // var targetUrl = "https://api.myjson.com/bins/9asj8";
    // var targetUrl = "https://api.myjson.com/bins/19kmso";

    //commented the top as we are now using JSON server

    var apiObj = new apiService();
    var data_retrieved = await apiObj.getUserDevices(
      "deviceData",
      this.state.userName
    );

    // console.log(data_retrieved);
    this.state.device_counters = [];

    for (var i = 0; i < data_retrieved["device_name"].length; i++) {
      this.state.device_counters.push({
        device_name: data_retrieved.device_name[i],
        device_ID: data_retrieved.device_ID[i],
      });
    }
    if (data_retrieved["device_name"].length > 0) {
      this.state.mainScreenMessage = "Connected Devices";
    } else {
      this.state.mainScreenMessage = "No devices available!";
    }

    this.state.linearLoading = []; //removing the linear loader
    this.state.import_sensorButtonState = [1];
    this.setState({
      linearLoading: this.state.linearLoading,
      device_counters: this.state.device_counters,
      mainScreenMessage: this.state.mainScreenMessage,
      import_sensorButtonState: this.state.import_sensorButtonState,
    });

    this.importSensorData(); //displaying the sensors tooo!
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
      device_ID: device_ID,
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

    // var proxy = "https://cors-anywhere.herokuapp.com/";
    // var targetUrl = "https://api.myjson.com/bins/1d6v4y";
    // // var targetUrl = "https://api.myjson.com/bins/zieo8";
    // let data_retrieved;
    // this.state.sensorInfo = [];
    // console.log("imported sensor info");
    // await fetch(proxy + targetUrl).then((response) =>
    //   response.json().then((data) => (data_retrieved = data))
    // );

    var apiObj = new apiService();
    var data_retrieved = await apiObj.getUserSensors(
      "deviceData",
      this.state.userName
    );

    console.log("SENSOR DATA 2:", data_retrieved);
    for (var i = 0; i < data_retrieved["sensor_name"].length; i++) {
      this.state.sensorInfo.push({
        sensor_name: data_retrieved.sensor_name[i],
        sensor_ID: data_retrieved.sensor_ID[i],
        sensor_value: data_retrieved.sensor_value[i],
      });
    }
    console.log(this.state.sensorInfo);
    this.state.sensorMessage = "Sensors";
    this.setState({
      sensorInfo: this.state.sensorInfo,
      sensorMessage: this.state.sensorMessage,
    });
  }

  parentTrigger(userName) {
    this.state.userName = userName;
    this.state.linearLoading = [1];
    this.state.SignInButtonState = []; //empty because we need to remove it.
    this.state.mainScreenMessage = "Loading Devices";

    setTimeout(() => {
      this.setState({
        userName: this.state.userName,
        linearLoading: this.state.linearLoading,
        SignInButtonState: this.state.SignInButtonState,
        mainScreenMessage: this.state.mainScreenMessage,
      });
    }, 3500);

    setTimeout(() => {
      this.importDevices();
    }, 6000);
  }
}

export default withStyles(useStyles)(HomePage);
