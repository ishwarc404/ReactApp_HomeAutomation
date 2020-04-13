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
import AddMoreDevices from "./addMoreDevices";
import Graphs from "./analyticGraphs";
import CreateUserForm from "./createUserForm";
import HomeTitle from "./homeTitle";
import SignIn from "./signInForm";
import Menu from "./toggleMenu"
import Lottie from "react-lottie";
import ReactLoading from "react-loading";
import * as registerLoading from "../registeredloading.json";
import * as deviceLoading from "../devicesloading.json"


const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: registerLoading.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const deviceLoadingOption = {
  loop: true,
  autoplay: true,
  animationData: deviceLoading.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const useStyles = (theme) => ({
  topBar: {
    backgroundColor: "transparent",
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
  mainNavButtons: {
    backgroundColor: "#2e3133",
    fontSize: 18,
    color: "#FFFFFF",
  },
  topNavButtons: {
    fontSize: 18,
    color: "#2e3133",
  },
});
class NavigationBar extends Component {

  state = {
    deviceInfo: [],
    sensorInfo: [],
    mainScreenMessage: false,
    sensorMessage: "",
    userName: null,
    createUserPageState: false,
    linearLoadingState: false,
    NavBarButtonState: false,
    AddMoreDevicesFormStatus: false,
    graphState: false,
    topNavBarState: false,
    frontPageState: true,
    registeredloadingState: false,
    SignInState: false,
    deviceloadingState: false
  };

  constructor() {
    super();
    this.addnewDevice = this.addnewDevice.bind(this);
    this.removeDevice = this.removeDevice.bind(this);
    this.importDevices = this.importDevices.bind(this);
    this.importSensorData = this.importSensorData.bind(this);
    this.parentTrigger = this.parentTrigger.bind(this);
    this.logoutSession = this.logoutSession.bind(this);
    this.analyticsPage = this.analyticsPage.bind(this);

    this.createUserPage = this.createUserPage.bind(this);
    this.signInPage = this.signInPage.bind(this);
    this.backToHome = this.backToHome.bind(this);
    this.registerUser = this.registerUser.bind(this);

    // this.importDevices();

  }

  render() {

    let centre_class = "d-flex justify-content-center";
    let devices_class = "d-flex flex-wrap justify-content-around";
    let bottom_right_class = "d-flex justify-content-end";
    const { classes } = this.props;

    const renderNavBarButtons = () => {
      if (this.state.NavBarButtonState) {
        return (
          <div >
            <div class="d-flex justify-content-center">
            <Button
              variant="default"
              className={classes.topNavButtons}
              onClick={this.analyticsPage}
            >
              ANALYTICS
            </Button>
            &nbsp; &nbsp;
            <Button
              variant="default"
              className={classes.topNavButtons}
              onClick={this.importDevices}
            >
              SHOW DEVICES
            </Button>
            &nbsp; &nbsp;
            <Button
              variant="default"
              className={classes.topNavButtons}
              onClick={this.logoutSession}
            >
              LOG OUT
            </Button>
          </div>
          <br/>
          </div>
        );
      }
    };

    const renderFrontPage = () => {
      if (this.state.frontPageState) {
        return (
          <div>
            <HomeTitle></HomeTitle>
            <br /> <br /> <br />
            <div class="d-flex justify-content-center">
              <Button className={classes.mainNavButtons} variant="contained">
                PRODUCTS
              </Button>{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                className={classes.mainNavButtons}
                variant="contained"
                onClick={this.signInPage}
              >
                SIGN IN
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                className={classes.mainNavButtons}
                onClick={this.createUserPage}
                variant="default"
              >
                CREATE USER
              </Button>
            </div>
          </div>
        );
      }
    };

    const renderAddMoreDevicesForm = () => {
      if (this.state.AddMoreDevicesFormStatus) {
        return (
          <div className={centre_class}>
            <AddMoreDevices></AddMoreDevices>
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

    const renderGraphs = () => {
      if (this.state.graphState) {
        return (
          <div className={centre_class}>
            <Graphs
             userName={this.state.userName}></Graphs>
          </div>
        );
      }
    };

    const topNavBar = () => {
      if (this.state.topNavBarState) {
        return (
          <div>
            <AppBar className={classes.topBar} position="static">
              <Toolbar variant="regular">
                <Typography variant="title">Home Automation System</Typography>
                <Box ml="auto">{renderNavBarButtons()}</Box>
              </Toolbar>
            </AppBar>
          </div>
        );
      }
    };

    const renderCreateUserForm = () => {
      if (this.state.createUserPageState) {
        return (
          <div className={centre_class}>
            <CreateUserForm
              backToHome={this.backToHome}
              registerUser={this.registerUser}
            ></CreateUserForm>
          </div>
        );
      }
    };

    const renderSignInForm = () => {
      if (this.state.SignInState) {
        return (
          <div className={centre_class}>
            <SignIn
              backToHome={this.backToHome}
              parentTrigger={this.parentTrigger}
            ></SignIn>
          </div>
        );
      }
    };
    const renderMainScreenMessage = () => {
      if (this.state.mainScreenMessage) {
        return (
          <div>
            <div className={centre_class}>
              <Typography variant="h1" component="h1" >
                Devices
              </Typography>
            </div>
          </div>
        );
      }
    };
    

    const renderRegisteredLoading = () => {
      if (this.state.registeredloadingState) {
        return (
          <div className={centre_class}>
            <FadeIn>
              <br />
              <br />
              <br />
              <br />
              <Lottie options={defaultOptions} height={340} width={340} />
              <Typography variant="h2" component="h2" gutterBottom>
                User created!
              </Typography>
            </FadeIn>
          </div>
        );
      }
    };

    const renderDeviceLoading = () => {
      if (this.state.deviceloadingState) {
        return (
          <div className={centre_class}>
            <FadeIn>
              <br />
              <br />
              <br />
              <br />
              <Lottie options={deviceLoadingOption} height={240} width={240} />
            </FadeIn>
          </div>
        );
      }
    };

    return (
      <FadeIn>
        <div>
          <div>
            <br />
            <br />
            {renderFrontPage()}
          </div>
          <div>{renderNavBarButtons()}</div>
          <div>{renderSignInForm()}</div>
          <div>{renderRegisteredLoading()}</div>
          <div>{renderCreateUserForm()}</div>
          <div>{renderGraphs()}</div>
          <div>{renderDeviceLoading()}</div>
          <div>{renderMainScreenMessage()}</div>
          <br />
          <br />
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
        <FadeIn>
          <div class={bottom_right_class}>
            <br />
            <br />
            {renderAddMoreDevicesForm()}
            &nbsp; &nbsp;
          </div>
        </FadeIn>
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
    this.state.deviceloadingState = false;
    this.state.AddMoreDevicesFormStatus = true;
    this.state.graphState = false;
    this.state.deviceloadingState = false;
    this.state.mainScreenMessage = true;
    this.state.frontPageState = false;
    this.state.NavBarButtonState = true;

    this.setState({

      deviceloadingState: this.state.deviceloadingState,
      linearLoadingState: this.state.linearLoadingState,
      deviceInfo: this.state.deviceInfo,
      mainScreenMessage: this.state.mainScreenMessage,
      NavBarButtonState: this.state.NavBarButtonState,
      LogoutButtonState: this.state.LogoutButtonState,
      AddMoreDevicesFormStatus: this.state.AddMoreDevicesFormStatus,
      graphState: this.state.graphState,

      frontPageState: this.state.frontPageState,
    });

    this.importSensorData(); //displaying the sensors tooo!
  }

  addnewDevice() {
    // var device_name = prompt("Enter device name:");
    // var device_ID = prompt("Enter device code:");
    // if (device_name === null) {
    //   return;
    // }
    // if (device_ID.length === null) {
    //   return;
    // }
    // if (device_name.length === 0) {
    //   return;
    // }
    // if (device_ID.length === 0) {
    //   return;
    // }
    // this.state.deviceInfo.push({
    //   device_name: device_name,
    //   device_ID: device_ID,
    // }); //these will be used to identify the device
    // this.setState({ deviceInfo: this.state.deviceInfo });
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

  createUserPage() {
    this.state.frontPageState = false;
    this.state.createUserPageState = true;
    this.setState({
      frontPageState: this.state.frontPageState,
      createUserPageState: this.state.createUserPageState,
    });
  }

  signInPage() {
    this.state.frontPageState = false;
    this.state.SignInState = true;
    this.setState({
      frontPageState: this.state.frontPageState,
      SignInState: this.state.SignInState,
    });
  }

  analyticsPage() {
    this.state.deviceInfo = [];
    this.state.sensorInfo = [];
    this.state.mainScreenMessage = false;
    this.state.sensorMessage = "";
    this.state.SignInButtonState = false;
    this.state.createUserPageState = false;
    this.state.linearLoadingState = false;
    this.state.NavBarButtonState = true;
    this.state.LogoutButtonState = false;
    this.state.AddMoreDevicesFormStatus = false;
    this.state.graphState = true;
    this.setState({
      deviceInfo: this.state.deviceInfo,
      sensorInfo: this.state.sensorInfo,
      mainScreenMessage: this.state.mainScreenMessage,
      sensorMessage: this.state.sensorMessage,
      userName: this.state.userName,
      SignInButtonState: this.state.SignInButtonState,
      createUserPageState: this.state.createUserPageState,
      linearLoadingState: this.state.linearLoadingState,
      NavBarButtonState: this.state.NavBarButtonState,
      LogoutButtonState: this.state.LogoutButtonState,
      AddMoreDevicesFormStatus: this.state.AddMoreDevicesFormStatus,
      graphState: this.state.graphState,
    });
  }
  logoutSession() {
    this.state.deviceInfo = [];
    this.state.sensorInfo = [];
    this.state.mainScreenMessage = false;
    this.state.sensorMessage = "";
    this.state.userName = null;
    this.state.createUserPageState = false;
    this.state.linearLoadingState = false;
    this.state.NavBarButtonState = false;
    this.state.graphState = false;
    this.state.AddMoreDevicesFormStatus = false;
    this.state.frontPageState = true;
    this.setState({
      deviceInfo: this.state.deviceInfo,
      sensorInfo: this.state.sensorInfo,
      mainScreenMessage: this.state.mainScreenMessage,
      sensorMessage: this.state.sensorMessage,
      userName: this.state.userName,
      createUserPageState: this.state.createUserPageState,
      linearLoadingState: this.state.linearLoadingState,
      NavBarButtonState: this.state.NavBarButtonState,
      LogoutButtonState: this.state.LogoutButtonState,
      AddMoreDevicesFormStatus: this.state.AddMoreDevicesFormStatus,
      graphState: this.state.graphState,
      frontPageState: this.state.frontPageState,
    });
  }
  parentTrigger(userName) {
    this.state.userName = userName;
    this.state.frontPageState = false;
    this.state.SignInState = false;
    this.state.SignInButtonState = false; //empty because we need to remove it.
    this.state.createUserPageState = false;
    this.state.deviceloadingState = true;
    this.state.NavBarButtonState = true;
    this.setState({
      NavBarButtonState:  this.state.NavBarButtonState,
      deviceloadingState: this.state.deviceloadingState,
      userName: this.state.userName,
      SignInButtonState: this.state.SignInButtonState,
      createUserPageState: this.state.createUserPageState,
      frontPageState: this.state.frontPageState,
      SignInState: this.state.SignInState,
    });

    setTimeout(() => {
      this.importDevices();
    }, 2000);
  }

  backToHome() {
    this.state.SignInState = false;
    this.state.frontPageState = true;
    this.state.createUserPageState = false;
    this.setState({
      frontPageState: this.state.frontPageState,
      createUserPageState: this.state.createUserPageState,
      SignInState: this.state.SignInState,
    });
  }

  registerUser() {
    this.state.registeredloadingState = true;
    this.state.createUserPageState = false;
    this.setState({
      registeredloadingState: this.state.registeredloadingState,
      createUserPageState: this.state.createUserPageState,
    });
    setTimeout(() => {
      this.state.frontPageState = true;
      this.state.registeredloadingState = false;
      this.setState({
        registeredloadingState: this.state.registeredloadingState,
        frontPageState: this.state.frontPageState,
      });
    }, 2000);
  }
}

export default withStyles(useStyles)(NavigationBar);
