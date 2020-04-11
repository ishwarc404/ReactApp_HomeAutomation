import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import PersonIcon from '@material-ui/icons/Person';
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

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
  };

  constructor() {
    super();
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Fab color="primary" aria-label="add" onClick={this.openDialog}>
              <AddIcon fontSize="large" />
            </Fab>
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
            ></TextField>
            <TextField
              margin="dense"
              id="device_id"
              label="Device Unique Code"
              style={{width: 550}}
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.closeDialog}>
              Cancel
            </Button>
            <Button color="primary">REGISTER DEVICE</Button>
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
}

export default withStyles(useStyles)(AddMoreDevices);
