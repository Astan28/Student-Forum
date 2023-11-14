import "./AddBoard.scss";
import React, { Component } from "react";
import { createBoard } from "../services/actions/boardActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";

class AddBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nameError: "",
      course: this.props.match.params.course,
      semester: this.props.match.params.semester,
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
      semester: this.state.semester,
      course: this.state.course,
    };

    const res = await this.props.createBoard(board);
    this.setState({ res: res.payload.status });
    this.forceUpdate();
    console.log(res);
    if (this.state.res == "201") {
      console.log("created");
      this.props.onClose();
    }
    return res;
  };

  validation = () => {
    if (this.state.name === "") {
      this.setState({ nameError: "To pole nie może być puste" });
    } else this.setState({ nameError: "" });

    if (this.state.nameError === "") {
      const res = this.submitHandler();
    }
  };

  render() {
    return (
      <div className="AddBoard">
        <div className="form-group">
          <h4>Nazwa tablicy</h4>
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
        <button onClick={this.validation} class="btn btn-dark">
          Dodaj
        </button>
      </div>
    );
  }
}

AddBoard.propTypes = {
  createBoard: PropTypes.func.isRequired,
};
export default withRouter(connect(null, { createBoard })(AddBoard));
