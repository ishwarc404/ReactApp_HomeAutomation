import React, { useState, Component, useStyles } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import ReactLoading from "react-loading";
import "bootstrap/dist/css/bootstrap.css";
import * as earthData from "../earthloading.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: earthData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};


class HomeTitle extends Component {
  constructor(props) {
    super();
  }

  render() {
    const { classes } = this.props;
    return (
      <FadeIn>
        <div >
           <br/>
           <br/>
           <br/>
           <br/>
           <br/>
           <br/>
           <br/>
           <br/>
          <div class="d-flex justify-content-center">
            <div>
              <Typography variant="h1" component="h2" gutterBottom>
                The Home
              </Typography>
              <Typography variant="h1" component="h2" gutterBottom>
                Automation Experts
              </Typography>
            </div>
            <div>
                <FadeIn>
              <Lottie options={defaultOptions} height={340} width={340} />
              </FadeIn>
            </div>
          </div>
        </div>
      </FadeIn>
    );
  }
}

export default withStyles(useStyles)(HomeTitle);
