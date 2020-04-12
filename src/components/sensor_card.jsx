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
import Divider from "@material-ui/core/Divider";
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    maxWidth: 250,
    minWidth: 150,
    Height: 150,
    opacity: 1,
    borderRadius: 9,
    backgroundColor: "#2E3133",
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
  text: {
    color: "#FFFFFF"
  }
}));

export default function SensorControlCard(props) {
  const classes = useStyles();
  const theme = useTheme();

  console.log(props.sensor_name);
  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5" className={classes.text}>
            {props.sensor_name}
          </Typography>
          <Typography variant="subtitle1" className={classes.text}>
            Sensor
          </Typography>
          <hr/>
          <Typography variant="subtitle1" className={classes.text}>
            {props.sensor_value}
          </Typography>
        </CardContent>
      </div>
      {/* <CardMedia>
        <img
          src={require("./assets/images/" + props.sensor_name + ".png")}
          alt=""
          style={{ height: 80 }}
        />
      </CardMedia> */}
    </Card>
  );
}
