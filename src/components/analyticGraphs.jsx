import React, { useState, Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import blue from "@material-ui/core/colors/blue";
import apiService from "../services/apiServices";

import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryStack,
  VictoryLine,
  VictoryLegend,
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


class Graphs extends Component {
  state = {
    device_status: "white",
    usageData: [],
    deviceNames:[],
    electricityData:null
  };
  constructor(props) {
    super();
    this.getUsageData = this.getUsageData.bind(this);
    this.getUsageData();
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
            <br />
            <br />
            <br />
            <VictoryLegend
              orientation="horizontal"
              gutter={20}
              style={{ border: { stroke: "black" } }}
              colorScale={"warm"}
              data={[
                { name: this.state.deviceNames[0] },
                { name: this.state.deviceNames[1] },
                { name: this.state.deviceNames[2] },
              ]}
            />
          </div>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp;&nbsp; &nbsp;
          <div style={{ width: "650px" }}>
            <VictoryChart
              domainPadding={20}
              theme={VictoryTheme.material}
              style={{ parent: { maxWidth: "100%" } }}
              padding={{ left: 60, top: 50, bottom: 50, right: 50 }}
            >
              <VictoryAxis
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
              <VictoryAxis dependentAxis tickFormat={(x) => `${x} mins`} />
              <VictoryStack colorScale={"warm"}>
                <VictoryBar data={this.state.usageData[0]} x="day" y="usage" />
                <VictoryBar data={this.state.usageData[1]} x="day" y="usage" />
                <VictoryBar data={this.state.usageData[2]} x="day" y="usage" />
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
                  parent: { maxWidth: "100%" },
                }}
                data={this.state.electricityData}
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
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
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
  async getUsageData(){
    var apiObj = new apiService();
    var data_retrieved = await apiObj.getusageData(
      "deviceData",
      "ishwar"
    );
    var i;
    this.state.usageData=[];
    for(i=0;i<data_retrieved.length;i++){
      this.state.deviceNames.push(data_retrieved[i].device_name);
      this.state.usageData.push(data_retrieved[i].device_usage);
    }

    //electricity usage data
    this.state.electricityData = await apiObj.getElectricityData(
      "deviceData",
      "ishwar"
    );
    this.setState({
      usageData: this.state.usageData,
      deviceNames: this.state.deviceNames,
      electricityData: this.state.electricityData
    }
    );

    setTimeout(() => {
      this.getUsageData();
    }, 2000);
  }
}

export default withStyles(useStyles)(Graphs);
