import "../styles/Question.css";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: "center",
  },
}));

const FinishModal = ({ show, handleCloseQuiz, handleCloseModal }) => {
  const classes = useStyles();
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={show}
      onClose={handleCloseModal}
      closeAfterTransition
    >
      <Fade in={show}>
        <div className={classes.paper}>
          <h2 id="transition-modal-title">Please confirm closing quiz.</h2>
          <h6 id="transition-modal-description">
            If you finish the quiz now, all the answers so far will be removed.
            Click Confirm if you want to close
          </h6>
          <Button
            style={{ margin: "auto" }}
            onClick={() => {
              handleCloseModal();
              handleCloseQuiz();
            }}
          >
            Confirm
          </Button>
        </div>
      </Fade>
    </Modal>
  );
};

export default FinishModal;