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
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import FadeIn from "react-fade-in";
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
    fontSize: 25,
    color: "#FFFFFF",
  },
});

class CreateUser extends Component {
  constructor() {
    super();
    this.registerUser = this.registerUser.bind(this);
  }
  render() {
    const { classes } = this.props;
    return (
        <FadeIn>
      <div>
        <div class="d-flex align-items-start">
          <Button
            color="default"
            className={classes.mainNavButtons}
            onClick={this.props.backToHome}
          >
            <ArrowBackIcon />
          </Button>
        </div>
        <Typography variant="h1" component="h2" gutterBottom>
          Register yourself
        </Typography>
        <br />
        <div>
          <Typography variant="h4" component="h2" gutterBottom>
            Name
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            style={{ width: 550 }}
            inputProps={{
              style: { fontSize: 35 },
            }}
          ></TextField>
          <br /> <br />
          <Typography variant="h4" component="h2" gutterBottom>
            Username
          </Typography>
          <TextField
            margin="dense"
            id="username"
            style={{ width: 550 }}
            inputProps={{
              style: { fontSize: 35 },
            }}
          />
          <br /> <br />
          <Typography variant="h4" component="h2" gutterBottom>
            Password
          </Typography>
          <TextField
            margin="dense"
            id="password"
            type="password"
            style={{ width: 550 }}
            inputProps={{
              style: { fontSize: 35 },
            }}
          />
        </div>
        <br />
        <div>
          <Button color="default" className={classes.mainNavButtons} onClick={this.registerUser}>
            REGISTER
          </Button>
        </div>
      </div>
      </FadeIn>
    );
  }

  registerUser(){
      this.props.registerUser();
  }
}

export default withStyles(useStyles)(CreateUser);
