import React, { useState } from "react";
import Likert from "react-likert-scale";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import "../../styles/Likert.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "95%",
    margin: "auto",
    flexGrow: 1,
    marginTop: "20px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const LikertScaleQuestion = (props) => {
  const classes = useStyles();
  const [picked, setpicked] = useState(false);

  const onClick = () => {
    const answer = { value: picked, id: props.id };
    props.registerAnswer(answer);
    props.onNext();
  };
  const likertOptions = {
    responses: [
      { value: 1, text: "Strongly disagree" },
      { value: 2, text: "Disagree" },
      { value: 3, text: "Neutral" },
      { value: 4, text: "Agree" },
      { value: 5, text: "Strongly agree" },
    ],
    picked: (value) => setpicked(value),
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Grid container spacing={3} alignItems="center" justify="center">
          <Grid item xs={12}>
            <Slide
              direction="down"
              in={true}
              key={props.questionIndex}
              mountOnEnter
            >
              <Card className={classes.root}>
                <CardContent>
                  <Typography
                    style={{ textAlign: "center" }}
                    variant="h5"
                    component="h2"
                  >
                    {props.text}
                  </Typography>
                  <Likert
                    key={props.questionIndex}
                    {...likertOptions}
                    className="likertScale"
                  />
                </CardContent>
              </Card>
            </Slide>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Paper className={classes.paper} elevation={0}>
              <Link to="/quiz" style={{ textDecoration: "none" }}>
                <Button
                  style={{ margin: "auto" }}
                  variant="contained"
                  color="primary"
                  disabled={!picked}
                  onClick={onClick}
                >
                  NEXT
                </Button>
              </Link>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default LikertScaleQuestion;