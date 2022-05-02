import React, { Component } from "react";
import { Tabs, Tab, Card, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Header from "../layout/Header";
import NavBar from "../layout/NavBar";
import "./User.scss";
import validator from "validator";
import { updateUser } from "../services/actions/authActions";
import axios from "axios";
import { postUrl } from "../config/config";

export class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.authReducer.user.name,
      id: this.props.authReducer.user.id,
      password: "",
      email: this.props.authReducer.user.email,
      nameError: "",
      passwordError: "",
      emailError: "",
      course: this.props.authReducer.user.course,
      semester: this.props.authReducer.user.semester,
      group: this.props.authReducer.user.group,
      role: this.props.authReducer.user.role,
      posts: [],
    };
  }

  async componentDidMount() {
    // this.setState({boards: await axios.get(`${boardUrl}/boards`)})
    await axios
      .get(`${postUrl}/posts?author=61ed97481969a18bae759680`)
      .then((res) => {
        const posts = res.data;
        console.log(posts);
        this.setState({
          posts: posts,
        });
      });
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = async () => {
    const user = {
      name: this.state.name,
      password: this.state.password,
      email: this.state.email,
      course: this.state.course,
      semester: this.state.semester,
      group: this.state.group,
    };

    const res = await this.props.updateUser(user, this.state.id);
    console.log("3" + res);
  };

  validation = () => {
    if (this.state.password === "") {
      this.setState({ passwordError: "To pole nie może być puste" });
    } else if (this.state.password.length < 6) {
      this.setState({ passwordError: "Haslo musi miec przynajmniej 6 znaków" });
    } else this.setState({ passwordError: "" });

    if (this.state.name === "") {
      this.setState({ nameError: "To pole nie może być puste" });
    } else if (this.state.name.length < 3) {
      this.setState({ nameError: "Imie musi mieć przynajmniej 3 znaki" });
    } else this.setState({ nameError: "" });

    if (this.state.email === "") {
      this.setState({ emailError: "To pole nie może być puste" });
    } else if (!validator.isEmail(this.state.email)) {
      this.setState({ emailError: "Niepoprawny format adresu email" });
    } else this.setState({ emailError: "" });

    if (
      this.state.nameError === "" &&
      this.state.passwordError === "" &&
      this.state.emailError === ""
    ) {
      this.submitHandler();
    }
  };

  render() {
    return (
      <div className="User">
        <NavBar />
        <Header />
        <div className="Content">
          <h2>Mój profil</h2>
          <Tabs
            defaultActiveKey="home"
            transition={false}
            id="noanim-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title="Informacje">
              <div className="container">
                <h5>Informacje o użytkowniku</h5>
                <div className="userInfo" onSubmit={this.validation}>
                  <div className="row">
                    <b>Nazwa użytkownika</b>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={this.state.name}
                      name="name"
                      onChange={this.changeHandler}
                    />
                  </div>
                  <div className="row">
                    <b>Adres email</b>
                    <br />
                    <input
                      type="email"
                      className="form-control"
                      defaultValue={this.state.email}
                      name="email"
                      onChange={this.changeHandler}
                    />
                  </div>

                  <div className="row">
                    <b>Hasło</b>
                    <br />
                    <input
                      type="password"
                      className="form-control"
                      defaultValue={this.state.password}
                      name="password"
                      onChange={this.changeHandler}
                    />
                  </div>
                  <div>
                    Rola: {this.state.role}
                    <br />
                    Kierunek: {this.state.course}
                    <br />
                    Semestr: {this.state.semester}
                    <br />
                    Grupa: {this.state.group}
                  </div>
                  <button
                    type="submit"
                    className="btn btn-secondary"
                    onClick={this.validation}
                  >
                    Zapisz
                  </button>
                  <button className="btn btn-secondary">Usuń konto</button>
                </div>
              </div>
            </Tab>

            <Tab eventKey="profile" title="Moje posty">
              {this.state.posts.map((post) => (
                <div className="container">
                  <Card>
                    <Card.Header className="mb-2 text-muted cardhead">
                      {new Date(post.createdAt).toLocaleString("en-UK")}
                    </Card.Header>
                    <Card.Body className="cardbody">
                      <Col className="postText">{post.text}</Col>
                    </Card.Body>
                  </Card>
                  <br />
                </div>
              ))}
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

User.propTypes = {
  authReducer: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    authReducer: state.authReducer,
  };
}
export default connect(mapStateToProps, { updateUser })(User);
