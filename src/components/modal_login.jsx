import React, { useState, Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import green from "@material-ui/core/colors/green";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Container from "@material-ui/core/Container";
import SignInButton from "./signinButton";
const useStyles = theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: "transparent",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color: "#FFFFFF"
  },
  getStartedButton: {
    backgroundColor: "#1976d2",
    fontSize: 20
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

class TransitionsModal extends Component {
  state = {
    open: false,
    userEmailID: "",
    userPassword: ""
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
      <div>
        {/* <Button
          variant="contained"
          color="primary"
          className={classes.getStartedButton}
          onClick={this.handleOpen}
        >
          <EmojiPeopleIcon />
          SIGN IN
        </Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={this.state.open}
          onClose={this.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={this.state.open}> */}
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
              variant="filled"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={this.state.userEmailID}
              onChange={e => this.setState({ userEmailID: e.target.value })}
              autoFocus
            />
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={this.state.userPassword}
              onChange={e => this.setState({ userPassword: e.target.value })}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {/* <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={this.sendDataToParent}
                >
                  Sign In
                </Button> */}
            <Button onClick={this.sendDataToParent}>
              <SignInButton> </SignInButton>
            </Button>
            {/* <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid> */}
          </div>
        </Container>
        {/* </Fade>
        </Modal> */}
      </div>
    );
  }

  handleOpen() {
    this.state.open = true;
    this.setState({
      open: this.state.open
    });
  }

  handleClose() {
    this.state.open = false;
    this.setState({
      open: this.state.open
    });
  }

  sendDataToParent() {
    //maybe we can do all the api calls here only
    //maybe we donot have to. //will look into it later on.
    this.props.testfunction(this.state.userEmailID, this.state.userPassword); //sending parent the data
    //the above function will also remove the sign in button
    setTimeout(() => {
      //closing the modal afterwards
      this.state.open = false;
      this.setState({
        open: this.state.open
      });
    }, 3000);
  }
}

export default withStyles(useStyles)(TransitionsModal);
