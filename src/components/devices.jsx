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
const useStyles = makeStyles({
  root: {
    width: 350,
    Height: 250,
    backgroundColor: "white"
  },
  media: {
    height: 140
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
      <CardActionArea>
        <CardMedia className={classes.media} image={bulb} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.device_name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          style={{ fontSize: 20 }}
          // id={this.props.device_ID}
          onClick={onButtonClicked}
        >
          ON
        </Button>
        &nbsp; &nbsp;
        <Button
          variant="contained"
          color="secondary"
          style={{ fontSize: 20 }}
          // id={this.props.device_ID}
          onClick={offButtonClicked}
        >
          OFF
        </Button>
      </CardActions>
    </Card>
  );
}
