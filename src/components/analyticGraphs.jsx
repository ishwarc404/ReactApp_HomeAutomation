import React, { useState, Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import bulb from "./assets/images/lightbulb.png";
import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";
import Badge from "@material-ui/core/Badge";
import WbIncandescentIcon from "@material-ui/icons/WbIncandescent";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryStack,
  VictoryLine,
  VictoryZoomContainer,
} from "victory";
import FadeIn from "react-fade-in";
const useStyles = (theme) => ({
  root: {
    width: 400,
    opacity: 1.0,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    borderStyle: "solid",
    borderColor: "#2e3133",
    // backgroundColor: "#eeeeee"
  },
  media: {
    height: 180,
  },
  text: {
    color: "#FFFFFF",
  },
  off_button: {
    // backgroundColor: red[600]
  },
  on_button: {
    backgroundColor: blue[700],
  },
  device_status: {
    color: "white",
  },
});

const device1 = [
  { day: 1, usage: 5 },
  { day: 2, usage: 5 },
  { day: 3, usage: 31 },
  { day: 4, usage: 14 },
  { day: 5, usage: 32 },
  { day: 6, usage: 33 },
  { day: 7, usage: 7 },
];

const device2 = [
  { day: 1, usage: 5 },
  { day: 2, usage: 12 },
  { day: 3, usage: 44 },
  { day: 4, usage: 32 },
  { day: 5, usage: 5 },
  { day: 6, usage: 31 },
  { day: 7, usage: 14 },
];

const device3 = [
  { day: 1, usage: 3 },
  { day: 2, usage: 9 },
  { day: 3, usage: 13 },
  { day: 4, usage: 34 },
  { day: 5, usage: 9 },
  { day: 6, usage: 13 },
  { day: 7, usage: 34 },
];

const device4 = [
  { day: 1, usage: 44 },
  { day: 2, usage: 32 },
  { day: 3, usage: 33 },
  { day: 4, usage: 7 },
  { day: 5, usage: 9 },
  { day: 6, usage: 13 },
  { day: 7, usage: 34 },
];

class Graphs extends Component {
  state = {
    device_status: "white",
  };
  constructor(props) {
    super();
  }

  render() {
    const { classes } = this.props;
    return (
      <FadeIn>
        <div class="d-flex justify-content-center">
          <div>
            <br />
            <br /> <br />
            <br /> <br />
            <br />
            <br />
            <Typography component="h1" variant="h1">
              Weekly
            </Typography>
            <Typography component="h1" variant="h1">
              Usage
            </Typography>
          </div>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <div style={{ width: "650px" }}>
            <VictoryChart
              domainPadding={20}
              theme={VictoryTheme.material}
              style={{ parent: { maxWidth: "100%" } }}
            >
              <VictoryAxis
                // tickValues={[1, 2, 3, 4]}
                tickFormat={[
                  "Day 1",
                  "Day 2",
                  "Day 3",
                  "Day 4",
                  "Day 5",
                  "Day 6",
                  "Day 7",
                ]}
              />
              <VictoryAxis dependentAxis tickFormat={(x) => `$${x} mins`} />
              <VictoryStack colorScale={"warm"}>
                <VictoryBar data={device1} x="day" y="usage" />
                <VictoryBar data={device2} x="day" y="usage" />
                <VictoryBar data={device3} x="day" y="usage" />
                <VictoryBar data={device4} x="day" y="usage" />
              </VictoryStack>
            </VictoryChart>
          </div>
        </div>
        <hr></hr>
        <div class="d-flex  justify-content-center">
          <div>
          <br />
            <br /> <br />
            <br /> <br />
            <br />
            <br />
            <Typography component="h1" variant="h1">
              Electricity
            </Typography>
            <Typography component="h1" variant="h1">
              Usage
            </Typography>
          </div>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <div style={{ width: "630px" }}>
            <VictoryChart theme={VictoryTheme.material}>
              <VictoryLine
                style={{
                  data: { stroke: "#c43a31" },
                  parent: { border: "1px solid #ccc" },
                  parent: { maxWidth: "100%" } 
                }}
                data={[
                  { x: 1, y: 2 },
                  { x: 2, y: 3 },
                  { x: 3, y: 5 },
                  { x: 4, y: 4 },
                  { x: 5, y: 7 },
                  { x: 6, y: 7 },
                  { x: 7, y: 7 },
                ]}
              />
            </VictoryChart>
          </div>
        </div>
        <hr></hr>
        <div class="d-flex">
          <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Typography component="h1" variant="h1">
              Estimated
            </Typography>
            <Typography component="h1" variant="h1">
              Usage Bill
            </Typography>
          </div>
          &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp;
          <div>
          <br />
          <br />
            <br />
            <br />
            <br />
          <br />
            <br />
            <br />
            <Typography component="h1" variant="h1">
             Rs.2336
            </Typography>
          </div>
        </div>
      </FadeIn>
    );
  }
}

export default withStyles(useStyles)(Graphs);
