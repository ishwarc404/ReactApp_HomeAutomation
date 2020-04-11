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

const data2012 = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 },
];

const data2013 = [
  { quarter: 1, earnings: 15000 },
  { quarter: 2, earnings: 12500 },
  { quarter: 3, earnings: 19500 },
  { quarter: 4, earnings: 13000 },
];

const data2014 = [
  { quarter: 1, earnings: 11500 },
  { quarter: 2, earnings: 13250 },
  { quarter: 3, earnings: 20000 },
  { quarter: 4, earnings: 15500 },
];

const data2015 = [
  { quarter: 1, earnings: 18000 },
  { quarter: 2, earnings: 13250 },
  { quarter: 3, earnings: 15000 },
  { quarter: 4, earnings: 12000 },
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

        <Card style={{ display: "flex", width: "600px"}}>
          <VictoryChart
            domainPadding={20}
            theme={VictoryTheme.material}
            style={{ parent: { maxWidth: "100%" } }}
          >
            <VictoryAxis
              tickValues={[1, 2, 3, 4]}
              tickFormat={["Day 1", "Day 2", "Day 3", "Day 4"]}
            />
            <VictoryAxis dependentAxis tickFormat={(x) => `$${x / 1000}k`} />
            <VictoryStack colorScale={"warm"}>
              <VictoryBar data={data2012} x="quarter" y="earnings" />
              <VictoryBar data={data2013} x="quarter" y="earnings" />
              <VictoryBar data={data2014} x="quarter" y="earnings" />
              <VictoryBar data={data2015} x="quarter" y="earnings" />
            </VictoryStack>
          </VictoryChart>
        </Card>
      </FadeIn>
    );
  }
}

export default withStyles(useStyles)(Graphs);
