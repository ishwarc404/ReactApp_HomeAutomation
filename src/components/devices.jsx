import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import { spacing } from "@material-ui/system";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Skeleton from "@material-ui/lab/Skeleton";
import Chip from "@material-ui/core/Chip";

class DevicesConnected extends Component {
  state = { data: [] };

  constructor() {
    super();
    this.onClickOn = this.onClickOn.bind(this);
    this.onClickOff = this.onClickOff.bind(this);
  }

  render() {
    let centre_class = "d-flex justify-content-center";
    let badge1_class = "badge m-2 badge-dark ";
    let button1_class = "btn  m-2 btn-success";
    let button2_class = "btn m-2 btn-danger";
    return (
      <React.Fragment>
        <Box>
          <Chip label={this.props.device_name} style={{fontSize: 30 }} />
          &nbsp; &nbsp;
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ fontSize: 15 }}
            id={this.props.device_ID}
            onClick={this.onClickOn}
          >
            ON
          </Button>
          &nbsp; &nbsp;
          <Button
            variant="contained"
            color="secondary"
            size="small"
            style={{ fontSize: 15 }}
            id={this.props.device_ID}
            onClick={this.onClickOff}
          >
            OFF
          </Button>
        </Box>
      </React.Fragment>
    );
  }

  async onClickOn() {
    console.log("Clicked On");
    //let's ping the flask server from here
    var targetUrl = "http://52.0.39.202/" + this.props.device_ID + "_" + "on";
    console.log(targetUrl);
    let data_retrtieved;
    await fetch(targetUrl).then(response =>
      response.json().then(data => (data_retrtieved = data))
    );

    //we use await or else it will be an async call
    console.log(data_retrtieved);
  }

  async onClickOff() {
    console.log("Clicked Off");
    //let's ping the flask server from here

    var targetUrl = "http://52.0.39.202/" + this.props.device_ID + "_" + "off";
    console.log(targetUrl);
    let data_retrtieved;
    await fetch(targetUrl).then(response =>
      response.json().then(data => (data_retrtieved = data))
    );

    //we use await or else it will be an async call
    console.log(data_retrtieved);
  }
}

export default DevicesConnected;
