import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import sensorimage from "./assets/images/Temperature.png";
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    maxWidth: 250
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 151
  },
}));

export default function SensorControlCard(props) {
  const classes = useStyles();
  const theme = useTheme();

  console.log(props.sensor_name);
  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {props.sensor_name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Sensor
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {props.sensor_value}
          </Typography>
        </CardContent>
      </div>
      <CardMedia>
        <img
          src={require("./assets/images/" + props.sensor_name + ".png")}
          alt=""
          style={{ height: 80 }}
        />
      </CardMedia>
    </Card>
  );
}
