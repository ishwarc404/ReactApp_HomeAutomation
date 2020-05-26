import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import apiService from "../services/apiServices";
import SettingsRemoteIcon from "@material-ui/icons/SettingsRemote";
const useStyles = (theme) => ({
  paper: {
    opacity: 0.99,
    borderRadius: 10,
    backgroundColor: "#2e3133",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color: "#FFFFFF",
  },
});

class AddMoreSensors extends Component {
  state = {
    modalOpen: false,
    sensor_name: null,
    sensor_ID: null,
    errorMessage: "Empty Field!",
  };

  constructor() {
    super();
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.addNewSensor = this.addNewSensor.bind(this);
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          variant="contained"
          aria-label="add"
          onClick={this.openDialog}
        >
          <SettingsRemoteIcon />
          ADD SENSORS
        </Button>
        <Dialog
          className={classes.paper}
          open={this.state.modalOpen}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add a new sensor</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="sensor_name"
              label="Sensor Name"
              style={{ width: 550 }}
              onChange={(e) => this.setState({ sensor_name: e.target.value })}
              error={this.state.sensor_name === ""}
              helperText={
                this.state.sensor_name === ""
                  ? this.state.errorMessageUsername
                  : " "
              }
            ></TextField>
            <TextField
              margin="dense"
              id="sensor_ID"
              label="Sensor Unique Code"
              style={{ width: 550 }}
              onChange={(e) => this.setState({ sensor_ID: e.target.value })}
              error={this.state.sensor_ID === ""}
              helperText={
                this.state.sensor_ID === ""
                  ? this.state.errorMessageUsername
                  : " "
              }
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.closeDialog}>
              Cancel
            </Button>
            <Button color="primary" onClick={this.addNewSensor}>
              REGISTER SENSOR
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  openDialog() {
    this.state.modalOpen = true;
    this.setState({
      modalOpen: this.state.modalOpen,
    });
  }

  closeDialog() {
    this.state.modalOpen = false;
    this.setState({
      modalOpen: this.state.modalOpen,
    });
  }

  async addNewSensor() {
    var apiObj = new apiService();
    let returnedData = await apiObj.addSensorToDatabase({
      username: this.props.userName,
      sensor_name: this.state.sensor_name,
      sensor_ID: this.state.sensor_ID,
    });

    if (returnedData) {
      this.closeDialog();
    } else {
      this.state.sensor_ID = "";
      this.state.sensor_name = "";
      this.state.errorMessage = "Please retry";
      this.setState({
        sensor_ID: this.state.sensor_ID,
        sensor_name: this.state.sensor_name,
        errorMessage: this.state.errorMessage,
      });
    }
  }
}

export default withStyles(useStyles)(AddMoreSensors);
