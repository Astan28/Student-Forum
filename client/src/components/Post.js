import React, { Component } from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updatePost, deletePost } from "../services/actions/postActions";
import "./Post.scss";
import axios from "axios";
import { fileUrl } from "../config/config";
class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditPost: false,
      id: this.props.post._id,
      text: this.props.post.text,
      threadId: this.props.threadId,
      createdAt: this.props.post.createdAt,
      author: this.props.post.author,
      files: [],
    };
    this.onChange = this.onChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  async componentDidMount() {
    const files = await axios.get(`${fileUrl}/files?post=${this.state.id}`);
    this.setState({ files: files.data });
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitHandler() {
    const postData = {
      threadId: this.state.threadId,
      text: this.state.text,
    };
    console.log(postData);
    this.props.updatePost(postData, this.state.id);
  }

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

  onDelete(e) {
    e.preventDefault();
    this.props.deletePost(this.state.id);
    console.log("deleting");
  }

  handleClick = () => {
    this.setState({
      showEditPost: !this.state.showEditPost,
    });
  };

  render() {
    const editButtons = (
      <Col xs={2} className="adminCol">
        <button
          type="button"
          className="btn btn-dark postButton"
          onClick={this.handleClick}
        >
          {this.state.showEditPost ? "Zwiń" : "Edytuj"}
        </button>
        <button
          type="button"
          className="btn btn-dark postButton"
          onClick={this.onDelete}
        >
          Usuń
        </button>
      </Col>
    );
    const editor = (
      <Col className="postEditor">
        {/* <EditPost post={this.postData} /> */}
        {/* <Form onSubmit={this.onSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              name="text"
              onChange={this.onChange}
              value={this.state.text}
              as="textarea"
              rows={3}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Dodaj
          </Button>
        </Form> */}
        <div>
          <div className="form-group">
            <textarea
              className="form-control"
              name="text"
              value={this.state.text}
              onChange={this.onChange}
            />
            {this.state.textError !== "" ? this.state.textError : null}
          </div>
          {this.state.files != [] ? (
            <div className="files">
              {" "}
              <h5>Pliki:</h5>{" "}
              {this.state.files.map((file) => (
                <div className="singleFile">
                  <img
                    className="attachment"
                    src={process.env.PUBLIC_URL + "/file_icon.png"}
                    alt="zalącznik"
                  ></img>
                  <div className="attachmentName">
                    <a
                      href={"http://localhost:5010/uploaded/" + file.name}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {file.name}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : null}{" "}
          <div className="button">
            {" "}
            <button className="btn btn-dark" onClick={this.validation}>
              Zapisz
            </button>
          </div>
        </div>
      </Col>
    );
    const display = (
      <Col className="postText">
        {this.state.text}
        {this.state.files != [] ? (
          <div className="files">
            {" "}
            <h5>Pliki:</h5>{" "}
            {this.state.files.map((file) => (
              <div className="singleFile">
                <img
                  className="attachment"
                  src={process.env.PUBLIC_URL + "/file_icon.png"}
                  alt="zalącznik"
                ></img>
                <div className="attachmentName">
                  <a
                    href={"http://localhost:5010/uploaded/" + file.name}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {file.name}
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : null}{" "}
      </Col>
    );

    return (
      <div>
        <Card>
          <Card.Header className="mb-2 text-muted cardhead">
            {new Date(this.state.createdAt).toLocaleString("en-UK")}
          </Card.Header>
          <Card.Body className="cardbody">
            <Row className="postRow">
              <Col xs={2} className="author">
                <h5>{this.state.author.name}</h5>
                {this.state.author.role} <br />
                {this.state.author.course} <br />
                {this.state.author.semester}
                {this.state.author.group}
              </Col>
              {this.state.showEditPost ? editor : display}

              {this.props.authReducer.user.role === "ADMIN" ||
              this.props.authReducer.user.id === this.state.author._id
                ? editButtons
                : null}
            </Row>
          </Card.Body>
        </Card>
        <br />
      </div>
    );
  }
}

Post.propTypes = {
  authReducer: PropTypes.object.isRequired,
  updatePost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    authReducer: state.authReducer,
    postReducer: state.postReducer,
  };
}
export default connect(mapStateToProps, { updatePost, deletePost })(Post);
