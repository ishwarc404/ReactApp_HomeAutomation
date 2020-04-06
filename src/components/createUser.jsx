import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles, withStyles } from "@material-ui/core/styles";


const useStyles = (theme) => ({
  paper: {
    opacity: 0.98,
    borderRadius: 10,
    backgroundColor: "#2e3133",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color: "#FFFFFF",
  },
});


class CreateUser extends Component {

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
        <Button variant="contained" onClick={this.openDialog} color="primary">
          Create User
        </Button>
        <Dialog  className={classes.paper} open={this.state.modalOpen} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Create a new user</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Create your account by completing the following form
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Enter your name"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="username"
              label="UserId or Email Address"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="password_reenter"
              label="Re-enter Password"
              type="password"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.closeDialog}>
              Cancel
            </Button>
            <Button color="primary">Subscribe</Button>
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

export default withStyles(useStyles)(CreateUser);
