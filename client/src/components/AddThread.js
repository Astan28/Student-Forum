import "./AddThread.scss";
import React, { Component } from "react";
import { createThread } from "../services/actions/threadActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import axios from "axios";

class AddThread extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nameError: "",
      text: "",
      textError: "",
      fileCollection: "",
      res: "",
    };
    this.onChange = this.onChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  onFileChange(e) {
    this.setState({ fileCollection: e.target.files });
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitHandler = async () => {
    const thread = {
      name: this.state.name,
      board: this.props.board,
      text: this.state.text,
    };
    console.log(thread);

    const response = await this.props.createThread(thread);
    console.log(response);
    if (response.payload.status == "201") {
      const threadId = response.payload.data._id;

      var formData = new FormData();
      for (const key of Object.keys(this.state.fileCollection)) {
        formData.append("fileCollection", this.state.fileCollection[key]);
      }
      formData.append("post", threadId);
      axios.post(`http://localhost:5010/files/upload`, formData).then((res) => {
        console.log(res.data);
      });
    }
    this.setState({ res: response.payload.status });
    this.forceUpdate();
    if (this.state.res == "201") {
      console.log("created");
      this.props.onClose();
    }
    return response;
  };

  validation = () => {
    if (this.state.name === "") {
      this.setState({ nameError: "To pole nie może być puste" });
    } else this.setState({ nameError: "" });

    if (this.state.text === "") {
      this.setState({ textError: "To pole nie może być puste" });
    } else this.setState({ textError: "" });

    if (this.state.nameError === "" || this.state.textError === "") {
      const res = this.submitHandler();
    }
  };

  render() {
    return (
      <div className="AddThread">
        <div className="form-group">
          <h4>Nazwa tematu</h4>
          <input
            type="text"
            className="form-control"
            placeholder="Podaj nazwę"
            name="name"
            onChange={this.onChange}
            value={this.state.name}
          />
          {this.state.nameError !== "" ? this.state.nameError : null}
          <h4>Treść tematu</h4>
          <textarea
            type="textarea"
            className="form-control"
            placeholder="Podaj treść"
            name="text"
            onChange={this.onChange}
            value={this.state.text}
          />
          {this.state.textError !== "" ? this.state.textError : null}
          <div className="form-group">
            <input
              type="file"
              name="fileCollection"
              onChange={this.onFileChange}
              multiple
            />
          </div>
          <button onClick={this.props.onClose} class="btn btn-dark">
            Zamknij
          </button>
          <button onClick={this.validation} class="btn btn-dark">
            Dodaj
          </button>
        </div>
      </div>
    );
  }
}

AddThread.propTypes = {
  createThread: PropTypes.func.isRequired,
};
export default withRouter(connect(null, { createThread })(AddThread));
