import React, { useState, Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Container from "@material-ui/core/Container";
import SignInButton from "./signinButton";
import apiService from "../services/apiServices";
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
});

class TransitionsModal extends Component {
  state = {
    open: false,
    userName: null,
    userPassword: null,
    errorMessage: "Empty Field!"
  };
  constructor() {
    super();
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.sendDataToParent = this.sendDataToParent.bind(this);
  }
  render() {
    const { classes } = this.props;

    return (
      <FadeIn>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in to get started
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username or Email Address"
              name="email"
              autoComplete="email"
              value={this.state.userName}
              onChange={(e) => this.setState({ userName: e.target.value })}
              autoFocus
              error={this.state.userName === ""}
              helperText={this.state.userName === "" ? this.state.errorMessage : " "}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={this.state.userPassword}
              onChange={(e) => this.setState({ userPassword: e.target.value })}
              error={this.state.userPassword === ""}
              helperText={this.state.userPassword === "" ? this.state.errorMessage : " "}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.sendDataToParent}
            >
              Sign In
            </Button>
            {/* <Button onClick={this.sendDataToParent}>
              <SignInButton> </SignInButton>
            </Button> */}
          </div>
        </Container>
        {/* </Fade>
        </Modal> */}
      </FadeIn>
    );
  }

  handleOpen() {
    this.state.open = true;
    this.setState({
      open: this.state.open,
    });
  }

  handleClose() {
    this.state.open = false;
    this.setState({
      open: this.state.open,
    });
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
        errorMessage: this.state.errorMessage
      });
      
    }
  }
}

export default withStyles(useStyles)(TransitionsModal);
