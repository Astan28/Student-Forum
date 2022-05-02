import "./Threads.scss";

import React, { Component, useEffect } from "react";

import "./Threads.scss";

import axios from "axios";
import { threadUrl } from "../config/config";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import NavBar from "../layout/NavBar";
import { connect } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import { fetchThreads } from "../services/actions/threadActions";
import Modal from "../components/Modal";
import AddThread from "../components/AddThread";

class Threads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      threads: [],
      isOpen: false,
    };
  }

  async componentDidMount() {
    await axios
      .get(`${threadUrl}/threads?board=${this.props.match.params.id}`)
      .then((res) => {
        const threads = res.data;
        console.log(threads);
        this.setState({
          threads: threads,
        });
      });
  }

  render() {
    const { isAuthenticated } = this.props.authReducer;
    return (
      <div className="Threads">
        <NavBar />
        <Header />
        <div className="content">
          <div className="main">
            <div className="thread-table">
              <div className="addThreadContainer">
                <button
                  className="btn btn-secondary"
                  onClick={() => this.setState({ isOpen: true })}
                >
                  Dodaj
                </button>
              </div>
              <div className="header">
                <h3>{this.props.match.params.name}</h3>
              </div>
              {this.state.threads.map((thread) => (
                <div className="thread" key={thread._id}>
                  <div className="thread-Col">
                    <Link to={`/thread/${thread._id}`}>{thread.name}</Link>
                  </div>
                  {this.props.authReducer.user.role === "ADMIN"}
                  <div className="author-Col">
                    <h5>{thread.author.name}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Modal
            open={this.state.isOpen}
            onClose={() => this.setState({ isOpen: false })}
          >
            <AddThread
              board={this.props.match.params.id}
              onClose={() => this.setState({ isOpen: false })}
            />
          </Modal>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  threads: state.threads,
  authReducer: state.authReducer,
});

const mapDispatchToProps = (dispatch) => ({
  fetchThreads,
});
export default withRouter(connect(mapStateToProps, { fetchThreads })(Threads));
