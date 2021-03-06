import React, { Component } from "react";
import Header from "./FormParts/Header";
import Body from "./FormParts/Body";
import Footer from "./FormParts/Footer";
import "./FormParts/style/Form.css";
import { postData } from "../utils/requests/postRequests";

const reload_threshold = process.env.REACT_APP_RELOAD_PAGE;
const alertMessage = process.env.REACT_APP_ERROR_MSG;

class Form extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      text: "",
      isSubmitted: false,
      isLoading: false,
    };
  }

  changeText = (event) => {
    this.setState({ text: event.target.value });
  };
  onSubmit = (submitData) => () => {
    var str = JSON.stringify(submitData, null, 2); // spacing level = 2
    console.log(str);
    console.log(submitData);
    this.setState({ isLoading: true });
    // save the data.
    postData(
      submitData,
      () => {
        this.setState({ isSubmitted: true });
        setTimeout(function () {
          window.location.reload();
        }, reload_threshold);
      },
      () => {
        this.setState({ isLoading: false });
        alert(alertMessage);
      }
    );
  };

  render() {
    return (
      <div className="Form">
        {this.state.isSubmitted ? (
          <React.Fragment>
            <h1>SUCCESS</h1>
            <p>U kunt nu verdergaan met de vragenlijst.</p>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Header />
            <Body />
            <Footer isLoading={this.state.isLoading} onSubmit={this.onSubmit} />
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Form;
