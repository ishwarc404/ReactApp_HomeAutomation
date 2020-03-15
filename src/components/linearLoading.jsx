import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles(theme => ({
  root: {
    width: "35%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    },
    opacity: 0.6
  }
}));

export default function LinearLoader() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LinearProgress color="secondary" />
    </div>
  );
}
