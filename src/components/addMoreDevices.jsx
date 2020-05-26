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
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';
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

class AddMoreDevices extends Component {
  state = {
    modalOpen: false,
    device_name: null,
    device_ID: null,
    errorMessage: "Empty Field!"
  };

  constructor() {
    super();
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.addNewDevice = this.addNewDevice.bind(this);
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button variant="contained"  aria-label="add" onClick={this.openDialog}><DevicesOtherIcon/>ADD DEVICES</Button>
        <Dialog
          className={classes.paper}
          open={this.state.modalOpen}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add a new device</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="device_name"
              label="Device Name"
              style={{width: 550}}
              onChange={(e) => this.setState({ device_name: e.target.value })}
              error={this.state.device_name === ""}
              helperText={
                this.state.device_name === "" ? this.state.errorMessageUsername : " "
              }
            ></TextField>
            <TextField
              margin="dense"
              id="device_id"
              label="Device Unique Code"
              style={{width: 550}}
              onChange={(e) => this.setState({ device_ID: e.target.value })}
              error={this.state.device_ID === ""}
              helperText={
                this.state.device_ID === "" ? this.state.errorMessageUsername : " "
              }
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.closeDialog}>
              Cancel
            </Button>
            <Button color="primary"  onClick={this.addNewDevice}>REGISTER DEVICE</Button>
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

  async addNewDevice(){
    var apiObj = new apiService();
    let returnedData = await apiObj.addDeviceToDatabase({
      username: this.props.userName,
      device_name: this.state.device_name,
      device_ID: this.state.device_ID
    });

    if (returnedData) {
      this.closeDialog();
    }
    else{
      this.state.device_ID = "";
      this.state.device_name = "";
      this.state.errorMessage = "Please retry";
      this.setState({
        device_ID: this.state.device_ID,
        device_name: this.state.device_name,
        errorMessage: this.state.errorMessage,
      });
    }

  }
}

export default withStyles(useStyles)(AddMoreDevices);
