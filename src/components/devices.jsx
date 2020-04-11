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

const useStyles = theme => ({
  root: {
    width: 320,
    Height: 200,
    opacity: 1.0,
    borderRadius: 9,
    backgroundColor: "#212121",
  },
  media: {
    height: 180
  },
  text: {
    color: "#FFFFFF"
  },
  off_button: {
    // backgroundColor: red[600]
  },
  on_button: {
    backgroundColor: blue[700]
  },
  device_status: {
    color: "white"
  }
});

class MediaCard extends Component {
  // const classes = useStyles();

  // const [device_status, setStatus] = useState("white");

  state = {
    device_status: "white"
  };
  constructor(props) {
    super();
    this.onButtonClicked = this.onButtonClicked.bind(this);
    this.offButtonClicked = this.offButtonClicked.bind(this);
  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.text}
            gutterBottom
            variant="h5"
            component="h2"
          >
            <EmojiObjectsIcon
              style={{ fontSize: 90, fill: this.state.device_status }}
            />
            {this.props.device_name}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            style={{ fontSize: 20 }}
            className={classes.on_button}
            // id={this.this.props.device_ID}
            onClick={this.onButtonClicked}
            color="primary"
          >
            <WbIncandescentIcon /> &nbsp; ON
          </Button>
          &nbsp; &nbsp;
          <Button
            variant="contained"
            color="secondary"
            style={{ fontSize: 20 }}
            className={classes.off_button}
            // id={this.this.props.device_ID}
            onClick={this.offButtonClicked}
          >
            OFF
          </Button>
        </CardActions>
      </Card>
    );
  }

  onButtonClicked() {
    console.log("Clicked On");

    //let's ping the flask server from here
    //global testing
    // var targetUrl = "http://52.0.39.202/" + this.props.device_ID + "_" + "on";

    //local testting
    var targetUrl =
      "http://127.0.0.1:8000/" + this.props.device_ID + "_" + "on";
    console.log(targetUrl);
    let data_retrtieved;
    fetch(targetUrl).then(response =>
      response.json().then(data => (data_retrtieved = data))
    );

    //we use await or else it will be an async call
    console.log(data_retrtieved);

    this.state.device_status = "yellow";
    this.setState({
      device_status: this.state.device_status
    });
  }

  offButtonClicked() {
    console.log("Clicked Off");
    //let's ping the flask server from here

    // var targetUrl = "http://52.0.39.202/" + this.props.device_ID + "_" + "off";
    var targetUrl =
      "http://127.0.0.1:8000/" + this.props.device_ID + "_" + "off";
    console.log(targetUrl);
    let data_retrtieved;
    fetch(targetUrl).then(response =>
      response.json().then(data => (data_retrtieved = data))
    );

    //we use await or else it will be an async call
    console.log(data_retrtieved);
    this.state.device_status = "white";
    this.setState({
      device_status: this.state.device_status
    });
  }
}

export default withStyles(useStyles)(MediaCard);
