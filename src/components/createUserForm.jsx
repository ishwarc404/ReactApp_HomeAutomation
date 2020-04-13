import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import FadeIn from "react-fade-in";
import apiService from "../services/apiServices";
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
  state = {
    userName: null,
    userPassword: null,
    errorMessage: "Empty Field!",
    errorMessageUsername: "Empty Field!"
  };
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
              value={this.state.userName}
              onChange={(e) => this.setState({ userName: e.target.value })}
              style={{ width: 550 }}
              inputProps={{
                style: { fontSize: 35 },
              }}
              error={this.state.userName === ""}
              helperText={
                this.state.userName === "" ? this.state.errorMessageUsername : " "
              }
            />
            <br /> <br />
            <Typography variant="h4" component="h2" gutterBottom>
              Password
            </Typography>
            <TextField
              margin="dense"
              id="password"
              type="password"
              value={this.state.userPassword}
              onChange={(e) => this.setState({ userPassword: e.target.value })}
              style={{ width: 550 }}
              inputProps={{
                style: { fontSize: 35 },
              }}
              error={this.state.userName === ""}
              helperText={
                this.state.userName === "" ? this.state.errorMessage : " "
              }
            />
          </div>
          <br />
          <div>
            <Button
              color="default"
              className={classes.mainNavButtons}
              onClick={this.registerUser}
            >
              REGISTER
            </Button>
          </div>
        </div>
      </FadeIn>
    );
  }

  async registerUser() {
    var apiObj = new apiService();
    let returnedData = await apiObj.addUserToDatabase({
      username: this.state.userName,
      password: this.state.userPassword,
    });
    if (returnedData) {
      this.props.registerUser();
    }
    else{
      this.state.userName = "";
      this.state.userPassword = "";
      this.state.errorMessageUsername = "Username Exists";
      this.setState({
        userName: this.state.userName,
        userPassword: this.state.userPassword,
        errorMessageUsername: this.state.errorMessageUsername,
      });
    }
  }
}

export default withStyles(useStyles)(CreateUser);
