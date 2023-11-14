import React, { Component, useEffect } from "react";

import "./Boards.scss";
import Board from "../components/Board";

//import Modal from "react-modal";
import axios from "axios";
import { boardUrl } from "../config/config";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import NavBar from "../layout/NavBar";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import { fetchBoards } from "../services/actions/boardActions";
import Modal from "../components/Modal";
import AddBoard from "../components/AddBoard";

class Boards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: [],
      isOpen: false,
    };
  }

  async componentDidMount() {
    // this.setState({boards: await axios.get(`${boardUrl}/boards`)})
    await axios
      .get(
        `${boardUrl}/boards?course=${this.props.match.params.course}&semester=${this.props.match.params.semester}`
      )
      .then((res) => {
        const boards = res.data;
        console.log(boards);
        this.setState({
          boards: boards,
        });
      });
  }

  // async componentDidUpdate(prevProps, prevState) {
  //   if (prevState.boards !== this.state.boards) {
  //     await axios
  //     .get(
  //       `${boardUrl}/boards?course=${this.props.match.params.course}&semester=${this.props.match.params.semester}`
  //     )
  //     .then((res) => {
  //       const boards = res.data;
  //       console.log(boards);
  //       this.setState({
  //         boards: boards,
  //       });
  //     });
  //   }
  // }
  
  onClose = () => this.setState({ isOpen: false });

  render() {
    return (
      <div className="Boards">
        <NavBar />
        <Header />
        <div className="content">
          <div className="main">
            <div className="board-table">
              {this.props.authReducer.user.role === "ADMIN" ? (
                <div className="addBoardContainer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => this.setState({ isOpen: true })}
                  >
                    Dodaj
                  </button>
                </div>
              ) : null}
              <div className="header">
                <h3>
                  {this.props.match.params.course} Semestr{" "}
                  {this.props.match.params.semester}
                </h3>
              </div>
              {this.state.boards.map((board) => (
                <Board key={board._id} board={board} />
              ))}
            </div>
          </div>
          <Modal
            open={this.state.isOpen}
            onClose={() => this.setState({ isOpen: false })}
          >
            <AddBoard onClose={() => this.setState({ isOpen: false })} />
          </Modal>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  boards: state.boards,
  authReducer: state.authReducer,
});

const mapDispatchToProps = (dispatch) => ({
  fetchBoards,
});
export default withRouter(connect(mapStateToProps, { fetchBoards })(Boards));
