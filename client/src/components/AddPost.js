import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createPost } from "../services/actions/postActions";
class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      threadId: this.props.threadId,
      text: "",
      textError: "",
      fileCollection: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onFileChange(e) {
    this.setState({ fileCollection: e.target.files });
  }

  submitHandler = async () => {
    const post = {
      thread: this.state.threadId,
      text: this.state.text,
    };

    const response = await this.props.createPost(post);
    if (response.payload.status == "201") {
      const postId = response.payload.data._id;

      var formData = new FormData();
      for (const key of Object.keys(this.state.fileCollection)) {
        formData.append("fileCollection", this.state.fileCollection[key]);
      }
      formData.append("post", postId);
      axios.post(`http://localhost:5010/files/upload`, formData).then((res) => {
        console.log(res.data);
      });
    }
  };

  validation = () => {
    if (this.state.text == "") {
      this.setState({ textError: "To pole nie może być puste" });
    } else {
      this.setState({ textError: "" });
    }

    if (this.state.textError == "") {
      this.submitHandler();
    }
  };

  render() {
    return (
      <div>
        <h1>Dodaj nową odpowiedź</h1>
        <div className="form-group">
          <textarea
            className="form-control"
            name="text"
            value={this.state.text}
            onChange={this.onChange}
          />
          {this.state.textError !== "" ? this.state.textError : null}
        </div>
        <div className="form-group-white">
          <input
            type="file"
            name="fileCollection"
            onChange={this.onFileChange}
            multiple
          />
        </div>
        <button className="btn btn-dark" onClick={this.validation}>
          Dodaj
        </button>
      </div>
    );
  }
}

AddPost.propTypes = {
  createPost: PropTypes.func.isRequired,
};
export default connect(null, { createPost })(AddPost);
