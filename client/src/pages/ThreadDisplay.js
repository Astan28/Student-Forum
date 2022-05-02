import React, { Component } from "react";
import { withRouter } from "react-router";
import { PropTypes } from "prop-types";
import axios from "axios";
import { postUrl, threadUrl, fileUrl } from "../config/config";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import Post from "../components/Post";
import { connect } from "react-redux";
import { updateThread } from "../services/actions/threadActions";
import AddPost from "../components/AddPost";
import * as _ from "lodash";

import "./ThreadDisplay.scss";

import Header from "../layout/Header";
import NavBar from "../layout/NavBar";

class threadDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      threadData: "",
      threadAuthor: "",
      posts: [],
      files: [],
      showEditThread: false,
      name: "",
      text: "",
      nameError: "",
      textError: "",
      threadId: this.props.match.params.threadId,
    };
    this.onChange = this.onChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  static propTypes = {
    match: PropTypes.object.isRequired,
  };

  async componentDidMount() {
    await axios
      .get(`${threadUrl}/threads/${this.state.threadId}`)
      .then((res) => {
        const threadData = res.data;
        console.log(threadData);
        this.setState({
          threadData: threadData,
          threadAuthor: threadData.author,
          name: threadData.name,
          text: threadData.text,
        });
      });

    const posts = await axios.get(
      `${postUrl}/posts?thread=${this.state.threadId}`
    );
    this.setState({ posts: posts.data });

    const files = await axios.get(
      `${fileUrl}/files?thread=${this.state.threadId}`
    );
    this.setState({ files: files.data });
  }

  handleClick = () => {
    this.setState({
      showEditThread: !this.state.showEditThread,
    });
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitHandler = () => {
    const threadNewData = {
      name: this.state.name,
      text: this.state.text,
    };
    console.log(threadNewData);
    this.props.updateThread(threadNewData, this.state.threadId);
  };

  validation = () => {
    if (this.state.name == "") {
      this.setState({ nameError: "To pole nie może być puste" });
    } else if (this.state.name.length > 250) {
      this.setState({ nameError: "Nazwa tematu musi mieć poniżej 250 znaków" });
    } else {
      this.setState({ nameError: "" });
    }

    if (this.state.text == "") {
      this.setState({ textError: "To pole nie może być puste" });
    } else {
      this.setState({ textError: "" });
    }

    if (this.state.nameError == "" && this.state.textError == "") {
      this.submitHandler();
    }
  };

  render() {
    const { isAuthenticated } = this.props.authReducer;
    const editButtons = (
      <Col xs={2} className="adminCol">
        <button
          type="button"
          className="btn btn-dark editButton"
          onClick={this.handleClick}
        >
          {this.state.showEditThread ? "Zwiń" : "Edytuj"}
        </button>
        <button
          type="button"
          className="btn btn-dark editButton"
          onClick={this.onDelete}
        >
          Usuń
        </button>
      </Col>
    );
    const files = (
      <div className="files">
        {" "}
        <h5>Pliki:</h5>{" "}
        {this.state.files.map((file) => (
          <div>
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
    );
    const editor = (
      <Col className="postEditor">
        <div>
          <div className="form-group">
            <label>Nazwa tematu:</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
            />
            {this.state.nameError !== "" ? this.state.nameError : null}
          </div>
          <div className="form-group">
            <label>Treść tematu:</label>
            <textarea
              className="form-control"
              name="text"
              value={this.state.text}
              onChange={this.onChange}
            />
            {this.state.textError !== "" ? this.state.textError : null}
          </div>
          {this.state.files != [] ? files : null}{" "}
          <button className="btn btn-dark" onClick={this.validation}>
            Zapisz
          </button>
        </div>
      </Col>
    );
    const display = (
      <Col className="postText">
        {this.state.text}
        {this.state.files == [] ? null : files}
      </Col>
    );

    return (
      <div className="ThreadDisplay">
        <NavBar />
        <Header />
        <div className="content">
          <div className="main">
            <div className="threadContainer">
              <h2>{this.state.threadData.name}</h2>
              <div className="m-10 p-0">
                <Card className="m-0 p-0">
                  <Card.Header className="mb-2 text-muted cardhead">
                    {new Date(this.state.threadData.createdAt).toLocaleString(
                      "en-UK"
                    )}
                  </Card.Header>
                  <Card.Body className="cardbody">
                    <Row className="postRow">
                      <Col xs={2} className="author">
                        <h5>{this.state.threadAuthor.name}</h5>
                        {this.state.threadAuthor.role} <br />
                        {this.state.threadAuthor.course} <br />
                        {this.state.threadAuthor.semester}
                        {this.state.threadAuthor.group}
                      </Col>

                      {this.state.showEditThread ? editor : display}

                      {this.props.authReducer.user.role === "ADMIN"
                        ? editButtons
                        : null}
                    </Row>
                  </Card.Body>
                </Card>
                <br />
              </div>

              {_.sortBy(this.state.posts, "_id").map((post) => (
                <Post
                  key={post._id}
                  post={post}
                  threadId={this.props.match.params.threadId}
                ></Post>
              ))}
              {isAuthenticated ? (
                <AddPost threadId={this.state.threadId}></AddPost>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
threadDisplay.propTypes = {
  authReducer: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});

export default withRouter(
  connect(mapStateToProps, { updateThread })(threadDisplay)
);
