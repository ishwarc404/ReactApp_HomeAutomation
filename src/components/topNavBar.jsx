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
import CreateUser from "./createUser"
const useStyles = (theme) => ({
  topBar: {
    backgroundColor: "#18191b",
    fontSize: 20,
    color: "#FFFFFF",
  },
  buttons: {
    backgroundColor: "#2e3133",
  },
  CreateUserButton: {
    backgroundColor: "#2e3133",
    fontSize: 18,
  },
});
class NavigationBar extends Component {
  state = {
    deviceInfo: [],
    sensorInfo: [],
    mainScreenMessage: false,
    sensorMessage: "",
    userName: null,
    SignInButtonState: true,
    CreateUserButtonState: true,
    linearLoadingState: false,
    NavBarButtonState: false,
  };

  constructor() {
    super();
    this.addnewDevice = this.addnewDevice.bind(this);
    this.removeDevice = this.removeDevice.bind(this);
    this.importDevices = this.importDevices.bind(this);
    this.importSensorData = this.importSensorData.bind(this);
    this.parentTrigger = this.parentTrigger.bind(this);
    this.logoutSession = this.logoutSession.bind(this);
  }

  render() {
    let centre_class = "d-flex justify-content-center";
    let devices_class = "d-flex flex-wrap justify-content-around";
    const { classes } = this.props;

    const renderNavBarButtons = () => {
      if (this.state.NavBarButtonState) {
        return (
          <div>
            <Button
              variant="contained"
              onClick={this.importDevices}
              className={classes.buttons}
              color="secondary"
            >
              SHOW DEVICES
            </Button>
            &nbsp; &nbsp;
            <Button
              variant="contained"
              onClick={this.logoutSession}
              className={classes.buttons}
              color="secondary"
            >
              LOG OUT
            </Button>
          </div>
        );
      }
    };

    const renderMainScreenMessage = () => {
      if (this.state.mainScreenMessage) {
        return (
          <div className={centre_class}>
            <h2
              style={{
                fontSize: 30,
                color: "#FFFFFF",
                fontFamily: "Roboto",
              }}
            >
              {this.state.mainScreenMessage}
            </h2>
          </div>
        );
      }
    };

    const renderSignInButton = () => {
      if (this.state.SignInButtonState) {
        return (
          <div className={centre_class}>
            <TransitionsModal
              parentTrigger={this.parentTrigger} //passing the callback as props
            ></TransitionsModal>
          </div>
        );
      }
    };

    const renderCreateUserButton = () => {
      if (this.state.CreateUserButtonState) {
        return (
          <div className={centre_class}>
            <CreateUser></CreateUser>
          </div>
        );
      }
    };

    const renderLinearLoadingAnimation = () => {
      if (this.state.linearLoadingState) {
        return (
          <div className={centre_class}>
            <LinearLoader></LinearLoader>
          </div>
        );
      }
    };

    return (
      <FadeIn>
        <div>
          <AppBar className={classes.topBar} position="static">
            <Toolbar variant="regular">
              <Typography variant="title">Home Automation System</Typography>
              <Box ml="auto">{renderNavBarButtons()}</Box>
            </Toolbar>
          </AppBar>
          <div>
            <br />
            <br />
            {renderMainScreenMessage()}
          </div>
          <div>
            <br />
            <br />
            {renderSignInButton()}
          </div>

          <div>
            <br />
            <br />
            {renderCreateUserButton()}
          </div>

          <div>{renderLinearLoadingAnimation()}</div>

          <Grid container>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={2}>
                {this.state.deviceInfo.map((counter) => (
                  <Grid item>
                    <FadeIn>
                      <DevicesConnected
                        key={counter.id}
                        device_name={counter.device_name}
                        device_ID={counter.device_ID}
                        className={devices_class}
                      ></DevicesConnected>
                    </FadeIn>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>

          <br />
          <br />

          <Grid container>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={2}>
                {this.state.sensorInfo.map((counter) => (
                  <Grid item>
                    <FadeIn>
                      <SensorControlCard
                        sensor_name={counter.sensor_name}
                        sensor_value={counter.sensor_value}
                      ></SensorControlCard>
                    </FadeIn>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
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
    this.state.deviceInfo = [];

    for (var i = 0; i < data_retrieved["device_name"].length; i++) {
      this.state.deviceInfo.push({
        device_name: data_retrieved.device_name[i],
        device_ID: data_retrieved.device_ID[i],
      });
    }
    if (data_retrieved["device_name"].length > 0) {
      this.state.mainScreenMessage = "Connected Devices";
    } else {
      this.state.mainScreenMessage = "No devices available!";
    }

    this.state.linearLoadingState = false; //removing the linear loader
    this.state.NavBarButtonState = true;

    this.setState({
      linearLoadingState: this.state.linearLoadingState,
      deviceInfo: this.state.deviceInfo,
      mainScreenMessage: this.state.mainScreenMessage,
      NavBarButtonState: this.state.NavBarButtonState,
      LogoutButtonState: this.state.LogoutButtonState,
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
    this.state.deviceInfo.push({
      device_name: device_name,
      device_ID: device_ID,
    }); //these will be used to identify the device

    this.setState({ deviceInfo: this.state.deviceInfo });
  }

  removeDevice() {
    //maybe when we use this functionality, we remove a specefic device only.
    this.state.deviceInfo.pop();
    console.log(this.state.deviceInfo);
    this.setState({ deviceInfo: this.state.deviceInfo });
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

  logoutSession() {
    this.state.deviceInfo = [];
    this.state.sensorInfo = [];
    this.state.mainScreenMessage = false;
    this.state.sensorMessage = "";
    this.state.userName = null;
    this.state.SignInButtonState = true;
    this.state.CreateUserButtonState = true;
    this.state.linearLoadingState = false;
    this.state.NavBarButtonState = false;
    this.state.LogoutButtonState = false;
    this.setState({
      deviceInfo: this.state.deviceInfo,
      sensorInfo: this.state.sensorInfo,
      mainScreenMessage: this.state.mainScreenMessage,
      sensorMessage: this.state.sensorMessage,
      userName: this.state.userName,
      SignInButtonState: this.state.SignInButtonState,
      CreateUserButtonState: this.state.CreateUserButtonState,
      linearLoadingState: this.state.linearLoadingState,
      NavBarButtonState: this.state.NavBarButtonState,
      LogoutButtonState: this.state.LogoutButtonState,
    });
  }
  parentTrigger(userName) {
    this.state.userName = userName;
    this.state.linearLoadingState = true;
    this.state.SignInButtonState = false; //empty because we need to remove it.
    this.state.mainScreenMessage = "Loading Devices";
    this.state.CreateUserButtonState = false;
    this.setState({
      userName: this.state.userName,
      linearLoadingState: this.state.linearLoadingState,
      SignInButtonState: this.state.SignInButtonState,
      mainScreenMessage: this.state.mainScreenMessage,
      CreateUserButtonState: this.state.CreateUserButtonState,
    });

    setTimeout(() => {
      this.importDevices();
    }, 2000);
  }
}

export default withStyles(useStyles)(NavigationBar);
