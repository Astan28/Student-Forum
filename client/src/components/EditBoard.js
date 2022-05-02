import React, { Component } from "react";
import { updateBoard, fetchBoards } from "../services/actions/boardActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class EditBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.board.name,
      nameError: "",
      course: this.props.board.course,
      semester: this.props.board.semester,
      id: this.props.board._id,
      res: "",
    };
    this.onChange = this.onChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitHandler = async () => {
    const board = {
      name: this.state.name,
    };

    const res = await this.props.updateBoard(board, this.state.id);
    this.setState({ res: res.payload.status });
    this.forceUpdate();
    console.log(res);
    if (this.state.res == "201") {
      console.log("created");
      this.props.onClose();
    }
  };

  validation = () => {
    if (this.state.name === "") {
      this.setState({ nameError: "To pole nie może być puste" });
    } else this.setState({ nameError: "" });

    if (this.state.nameError === "") {
      this.submitHandler();
    }
  };
  render() {
    return (
      <div className="AddBoard">
        <div className="form-group">
          <label>
            <h4>Nazwa sekcji</h4>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Podaj nazwę"
            name="name"
            onChange={this.onChange}
            value={this.state.name}
          />
          {this.state.nameError !== "" ? this.state.nameError : null}
        </div>
        <button onClick={this.props.onClose} class="btn btn-dark">
          Zamknij
        </button>
        <button class="btn btn-dark" onClick={this.validation}>
          Zapisz
        </button>
      </div>
    );
  }
}

EditBoard.propTypes = {
  updateBoard: PropTypes.func.isRequired,
  fetchBoards: PropTypes.func.isRequired,
};
export default connect(null, { updateBoard, fetchBoards })(EditBoard);
