import React, { useState, Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import apiService from "../services/apiServices";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import FadeIn from "react-fade-in";

const useStyles = (theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    opacity: 0.98,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color: "#2e3133",
  },
  getStartedButton: {
    backgroundColor: "#1976d2",
    fontSize: 20,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  mainNavButtons: {
    backgroundColor: "#2e3133",
    fontSize: 25,
    color: "#FFFFFF",
  },
});

class SignIn extends Component {
  state = {
    open: false,
    userName: null,
    userPassword: null,
    errorMessage: "Empty Field!",
  };
  constructor() {
    super();
    this.sendDataToParent = this.sendDataToParent.bind(this);
  }
  render() {
    const { classes } = this.props;

    return (
      <FadeIn>
        <div class="d-flex align-items-start">
          <Button
            color="default"
            className={classes.mainNavButtons}
            onClick={this.props.backToHome}
          >
            <ArrowBackIcon />
          </Button>
        </div>
        <Typography component="h1" variant="h1">
          Sign in to get started
        </Typography>
        <br />
        <br />
        <br />
        <Typography component="h3" variant="h3">
          Username
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          autoComplete="email"
          value={this.state.userName}
          onChange={(e) => this.setState({ userName: e.target.value })}
          autoFocus
          error={this.state.userName === ""}
          helperText={
            this.state.userName === "" ? this.state.errorMessage : " "
          }
        />
        <br />
        <br />
        <Typography component="h3" variant="h3">
          Password
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="password"
          id="password"
          autoComplete="current-password"
          value={this.state.userPassword}
          onChange={(e) => this.setState({ userPassword: e.target.value })}
          error={this.state.userPassword === ""}
          helperText={
            this.state.userPassword === "" ? this.state.errorMessage : " "
          }
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="default"
          color="primary"
          className={classes.mainNavButtons}
          onClick={this.sendDataToParent}
        >
          Sign In
        </Button>
      </FadeIn>
    );
  }

  async sendDataToParent() {
    var apiObj = new apiService();
    var loginDetails = await apiObj.validateCredentials(
      "loginAuthentication",
      this.state.userName,
      this.state.userPassword
    );
    console.log(loginDetails);
    if (loginDetails == true) {
      setTimeout(() => {
        //closing the modal afterwards
        this.props.parentTrigger(this.state.userName); //sending parent the data
        this.state.open = false;
        this.setState({
          open: this.state.open,
        });
      }, 3000);
    } else {
      this.state.userName = "";
      this.state.userPassword = "";
      this.state.errorMessage = "Invalid Credentials";
      this.setState({
        userName: this.state.userName,
        userPassword: this.state.userPassword,
        errorMessage: this.state.errorMessage,
      });
    }
  }
}

export default withStyles(useStyles)(SignIn);
