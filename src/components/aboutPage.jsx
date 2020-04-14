import React, { useState, Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import ReactLoading from "react-loading";
import "bootstrap/dist/css/bootstrap.css";
import * as earthData from "../earthloading.json";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
// import { Image } from "react-native";

const useStyles = (theme) => ({

    mainNavButtons: {
      backgroundColor: "#2e3133",
      fontSize: 25,
      color: "#FFFFFF",
    },
  });
  

class AboutPage extends Component {
  constructor(props) {
    super();
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
          <br />
          <br />
          <div>
            <Typography variant="h1" component="h1" gutterBottom>
              Meet
            </Typography>
            <Typography variant="h1" component="h1" gutterBottom>
              the team
            </Typography>
          </div>
          <br />
          <hr></hr>
          <div class="d-flex">
            <div>
              <br />
              <br />
              <br />
              <Typography variant="h1" component="h1" gutterBottom>
                G Shreya
              </Typography>
            </div>
            &nbsp; &nbsp; &nbsp; &nbsp;
            <div>
              <img
                src={require("./assets/images/shreya.jpg")}
                style={{ width: 250, height: 250, borderRadius: 400 / 2 }}
              />
            </div>
          </div>
          <br />
          <br />
          <div class="d-flex">
            <div>
              <br />
              <br />
              <br />
              <Typography variant="h1" component="h1" gutterBottom>
                Drasti Vadhar
              </Typography>
            </div>
            &nbsp; &nbsp; &nbsp; &nbsp;
            <div>
              <img
                src={require("./assets/images/drasti.jpg")}
                style={{ width: 250, height: 250, borderRadius: 400 / 2 }}
              />
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
          <div class="d-flex">
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div>
              <Typography variant="h1" component="h1" gutterBottom>
                Ishwar Choudhary
              </Typography>
            </div>
            &nbsp; &nbsp; &nbsp;
            <div>
              <img
                src={require("./assets/images/ishwar.jpg")}
                style={{ width: 250, height: 250, borderRadius: 400 / 2 }}
              />
            </div>
          </div>
      </FadeIn>
    );
  }
}

export default withStyles(useStyles)(AboutPage);
