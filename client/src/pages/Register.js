import "./Register.scss";
import { Link } from "react-router-dom";
import validator from "validator";

import "./Register.scss";
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createUser } from "../services/actions/authActions";

// const schema = yup.object().shape({
//     name: yup.string().required(),
//     password:yup.string().min(3).required(),
//     email:yup.string().email().required()
// })

// const Register = (props) => {
//     const [name, setname] = useState("");
//     const [email, setemail] = useState("");
//     const [password, setpassword] = useState("");
//     const [semester, setsemester] = useState("");
//     const [group, setgroup] = useState("");
//     const [course, setcourse] = useState("");
//     const [status, setstatus] = useState("");

//     const { register, handleSubmit, errors } = useForm({
//         resolver: yupResolver(schema),
//       });

//      const submitHandler = e =>  {
//         e.preventDefault()
//         const user = {
//             name: name,
//             password: password
//         };

//         const res = props.createUser(user);
//         setstatus(res);
//         console.log(status)

//     }

//         return (
//             <div className="register__form" onSubmit={handleSubmit(submitHandler)}>

//                  <h3>Rejestracja</h3>

//                  <div className="form-group">
//                      <label>Email</label>
//                      <input type="email" className="form-control" placeholder="Podaj email" name="email" onChange={e => setemail(e.target.value)} {...register("email")}/>
//                  </div>

//                  <div className="form-group">
//                      <label>Nazwa</label>
//                      <input type="text" className="form-control" placeholder="Nazwa" name="name" onChange={e => setname(e.target.value)} {...register("name")} />
//                      <p>{errors}</p>
//                  </div>

//                  <div className="form-group">
//                      <label>Hasło</label>
//                      <input type="password" className="form-control" placeholder="Podaj hasło" name="password" onChange={e => setpassword(e.target.value)} {...register("password")}/>
//                  </div>

//                  <div className="form-group">
//                      <label> Wybierz kierunek: </label>
//                      <select name="course" onChange={e => setcourse(e.target.value)} {...register("course")}>
//                      <option value="Informatyka">Informatyka</option>
//                      <option value="Grafika komputerowa">Grafika komputerowa</option>
//                      </select>
//                  </div>

//                  <div className="form-group">
//                      <label> Wybierz semestr: </label>
//                      <select name="semester" onChange={e => setsemester(e.target.value)} {...register("semester")}>
//                      <option value="1">1</option>
//                      <option value="2">2</option>
//                      <option value="3">3</option>
//                      <option value="4">4</option>
//                      <option value="5">5</option>
//                      <option value="6">6</option>
//                      <option value="7">7</option>
//                      </select>
//                  </div>

//                  <div className="form-group">
//                      <label> Wybierz grupę: </label>
//                      <select name="group" onChange={e => setgroup(e.target.value)} {...register("group")}>
//                      <option value="AZI">AZI</option>
//                      <option value="BZI">BZI</option>
//                      </select>
//                  </div>
//                  <button type="submit" className="btn btn-dark btn-block">Zarejestruj się</button>
//                  <p className="forgot-password text-center">
//                      Masz już konto? <Link to="/login">Zaloguj się</Link>
//                  </p>

//          </div>
//         )
//     }

// Register.propTypes = {
//     createUser: PropTypes.func.isRequired
// }
// export default connect(null, {createUser})(Register)

export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      password: "",
      matchingPassword: "",
      email: "",
      nameError: "",
      passwordError: "",
      matchingPasswordError: "",
      emailError: "",
      course: "Informatyka",
      semester: "1",
      group: "AZI",
    };
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

    const res = await this.props.createUser(user);
    console.log("3" + res);
    // this.setState({responseStatus: res})
  };

  validation = () => {
    if (this.state.password === "") {
      this.setState({ passwordError: "To pole nie może być puste" });
    } else if (this.state.password.length < 6) {
      this.setState({ passwordError: "Haslo musi miec przynajmniej 6 znaków" });
    } else this.setState({ passwordError: "" });

    if (this.state.matchingPassword === "") {
      this.setState({ matchingPasswordError: "To pole nie może być puste" });
    } else if (this.state.matchingPassword.length < 6) {
      this.setState({
        matchingPasswordError: "Haslo musi miec przynajmniej 6 znaków",
      });
    } else if (this.state.password !== this.state.matchingPassword) {
      this.setState({ matchingPasswordError: "Hasła nie są takie same" });
    } else this.setState({ matchingPasswordError: "" });

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
      this.state.matchingPasswordError === "" &&
      this.state.emailError === ""
    ) {
      this.submitHandler();
    }
  };
  render() {
    const { name, password, matchingPassword, email } = this.state;
    return (
      <div className="register__form" onSubmit={this.validation}>
        <h3>Rejestracja</h3>

        <div className="form-group">
          <label>Nazwa</label>
          <input
            type="text"
            className="form-control"
            placeholder="Nazwa"
            name="name"
            value={name}
            onChange={this.changeHandler}
          />
          {this.state.nameError !== "" ? this.state.nameError : null}
        </div>

        <div className="form-group">
          <label>Hasło</label>
          <input
            type="password"
            className="form-control"
            placeholder="Podaj hasło"
            name="password"
            value={password}
            onChange={this.changeHandler}
          />
          {this.state.passwordError !== "" ? this.state.passwordError : null}
        </div>

        <div className="form-group">
          <label> Powtórz hasło</label>
          <input
            type="password"
            className="form-control"
            placeholder="Powtórz hasło"
            name="matchingPassword"
            value={matchingPassword}
            onChange={this.changeHandler}
          />
          {this.state.matchingPasswordError !== ""
            ? this.state.matchingPasswordError
            : null}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Podaj email"
            name="email"
            value={email}
            onChange={this.changeHandler}
          />
          {this.state.emailError !== "" ? this.state.emailError : null}
        </div>

        <div className="form-group">
          <label> Wybierz kierunek: </label>
          <select name="course" onChange={this.changeHandler}>
            <option selected value="Informatyka">
              Informatyka
            </option>
            <option value="Grafika komputerowa">Grafika komputerowa</option>
          </select>
        </div>

        <div className="form-group">
          <label> Wybierz semestr: </label>
          <select name="semester" onChange={this.changeHandler}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>
        </div>

        <div className="form-group">
          <label> Wybierz grupę: </label>
          <select name="group" onChange={this.changeHandler}>
            <option value="AZI">AZI</option>
            <option value="BZI">BZI</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-dark btn-block"
          onClick={this.validation}
        >
          Zarejestruj się
        </button>
        <p className="forgot-password text-center">
          Masz już konto? <Link to="/login">Zaloguj się</Link>
        </p>
      </div>
    );
  }
}

Register.propTypes = {
  createUser: PropTypes.func.isRequired,
};
export default connect(null, { createUser })(Register);
