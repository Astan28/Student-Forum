import React, { Component } from "react";

import { Link } from "react-router-dom";
import "./Board.scss";
// import EditSection from "./EditSection";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteBoard, fetchBoards } from "../services/actions/boardActions";
import Modal from "../components/Modal";
import EditBoard from "../components/EditBoard";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      board: this.props.board,
    };
    this.onDelete = this.onDelete.bind(this);
  }
  handleClick = () => {
    this.setState({
      showEditBoard: !this.state.showEditBoard,
    });
  };

  onClose = () => this.setState({ isOpen: false });

  onDelete(e) {
    e.preventDefault();
    this.props.deleteBoard(this.state.board._id);
    console.log("deleting");
    this.props.fetchBoards();
  }

  render() {
    return (
      <div className="board">
        <div className="board-Col">
          <Link to={`/board/${this.state.board._id}/${this.props.board.name}`}>
            {this.props.board.name}
          </Link>
        </div>
        {this.props.authReducer.user.role === "ADMIN" ? (
          <div className="button-Col">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => this.setState({ isOpen: true })}
            >
              Edytuj
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={this.onDelete}
            >
              Usuń
            </button>
          </div>
        ) : null}
        <Modal
          open={this.state.isOpen}
          onClose={() => this.setState({ isOpen: false })}
        >
          <EditBoard
            board={this.state.board}
            onClose={() => this.setState({ isOpen: false })}
          />
        </Modal>
      </div>
    );
  }
}

Board.propTypes = {
  authReducer: PropTypes.object.isRequired,
  deleteBoard: PropTypes.func.isRequired,
  fetchBoards: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
});
export default connect(mapStateToProps, { deleteBoard, fetchBoards })(Board);
