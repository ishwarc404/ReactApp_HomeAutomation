import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import bulb from "./assets/images/lightbulb.jpg";
import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";
import Badge from "@material-ui/core/Badge";
import WbIncandescentIcon from "@material-ui/icons/WbIncandescent";

const useStyles = makeStyles({
  root: {
    width: 350,
    Height: 250,
    backgroundColor: "#FFFFFF",
    borderStyle: "solid",
    borderWidth: "0.2",
    borderColor: "#FFFFFF",
    borderRadius: 7
  },
  media: {
    height: 180
  },
  text: {
    color: "#212121"
  },
  off_button: {
    backgroundColor: red[600]
  },
  on_button: {
    backgroundColor: blue[700]
  }
});

export default function MediaCard(props) {
  const classes = useStyles();

  const onButtonClicked = () => {
    console.log("Clicked On");
    //let's ping the flask server from here
    var targetUrl = "http://52.0.39.202/" + props.device_ID + "_" + "on";
    console.log(targetUrl);
    let data_retrtieved;
    fetch(targetUrl).then(response =>
      response.json().then(data => (data_retrtieved = data))
    );

    //we use await or else it will be an async call
    console.log(data_retrtieved);
  };

  const offButtonClicked = () => {
    console.log("Clicked Off");
    //let's ping the flask server from here

    var targetUrl = "http://52.0.39.202/" + props.device_ID + "_" + "off";
    console.log(targetUrl);
    let data_retrtieved;
    fetch(targetUrl).then(response =>
      response.json().then(data => (data_retrtieved = data))
    );

    //we use await or else it will be an async call
    console.log(data_retrtieved);
  };

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={bulb} />
      <CardContent>
        <Typography
          className={classes.text}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {props.device_name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          style={{ fontSize: 20 }}
          className={classes.on_button}
          // id={this.props.device_ID}
          onClick={onButtonClicked}
        >
          <WbIncandescentIcon /> &nbsp; ON
        </Button>
        &nbsp; &nbsp;
        <Button
          variant="contained"
          style={{ fontSize: 20 }}
          className={classes.off_button}
          // id={this.props.device_ID}
          onClick={offButtonClicked}
        >
          OFF
        </Button>
      </CardActions>
    </Card>
  );
}
