import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";
import Typography from "@material-ui/core/Typography";
const useStyles = (theme) => ({
  paper: {
    opacity: 0.99,
    borderRadius: 10,
    backgroundColor: "#2e3133",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color: "#FFFFFF",
  },
  mainNavButtons: {
    backgroundColor: "#2e3133",
    fontSize: 18,
    color: "#FFFFFF",
  },
});

class CreateUser extends Component {
  constructor() {
    super();
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography variant="h1" component="h2" gutterBottom>
          Register yourself
        </Typography>
        <br />
        <Typography variant="h4" component="h2" gutterBottom>
          Name:
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          style={{ width: 550 }}
        ></TextField>
        <br /> <br />
        <Typography variant="h4" component="h2" gutterBottom>
          Username:
        </Typography>
        <TextField margin="dense" id="username" style={{ width: 550 }} />
        <br /> <br />
        <Typography variant="h4" component="h2" gutterBottom>
          Password:
        </Typography>
        <TextField
          margin="dense"
          id="password"
          type="password"
          style={{ width: 550 }}
        />
      </div>
    );
  }
}

export default withStyles(useStyles)(CreateUser);
