import React from "react"
import { useStyles } from "./FullPageAlert.styles";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

export default function ErrorAlert() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes.root}>
      <img src="/images/error.svg" alt="success" />
      <p>Oops! Something went wrong</p>
      <div className={classes.navButtons}>
          <Button variant="outlined" onClick={() => history.push("/savedusers")}>
        Saved Users
      </Button>
      <Button variant="outlined" onClick={() => history.push("/randomuser")}>
        Random Users
      </Button>
      </div>
      
    </div>
  );
}
