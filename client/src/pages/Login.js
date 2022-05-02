import "./Login.scss";
import { Link, Redirect } from "react-router-dom";
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../services/actions/authActions";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      password: "",
      nameError: "",
      passwordError: "",
      res: "",
    };
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = async () => {
    const user = {
      name: this.state.name,
      password: this.state.password,
    };

    let res;
    try {
      res = await this.props.login(user);
      this.setState({ res: res.status });
      this.forceUpdate();

      // console.log("3", res);
    } catch (e) {
      // if (e instanceof UnauthorizedError) {
      //     // .... -> co jak jest nieautoryzowany
      // }
    }
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

    if (this.state.nameError === "" && this.state.passwordError === "") {
      this.submitHandler();
    }
  };

  render() {
    const { name, password } = this.state;

    const { isAuthenticated } = this.props.authReducer;
    console.log(isAuthenticated);
    if (isAuthenticated) {
      return <Redirect to="/" />;
    } else
      return (
        <div className="Login">
          <div className="login__form">
            <h3>Logowanie</h3>

            <div className="form-group">
              <label>Nazwa</label>
              <input
                type="text"
                className="form-control"
                placeholder="Podaj nazwę"
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
              {this.state.passwordError !== ""
                ? this.state.passwordError
                : null}
            </div>

            <button
              type="submit"
              className="btn btn-dark btn-block"
              onClick={this.validation}
            >
              Zaloguj
            </button>
            <p className="forgot-password text-center">
              Nie masz konta? <Link to="/register">Zarejestruj się</Link>
            </p>
          </div>
        </div>
      );
  }
}

// const schema = yup.object().shape({
//     name: yup.string().required(),
//     password:yup.string().min(3).required(),
// })

// const Login = (props) => {
//     const [name, setname] = useState("");
//     const [password, setpassword] = useState("");
//     const [status, setstatus] = useState("");

//     const { register, handleSubmit, errors } = useForm({
//         resolver: yupResolver(schema),
//       });

//      const submitHandler = e =>  {
//         const user = {
//             name: name,
//             password: password
//         };

//         const res = props.login(user);
//         setstatus(res);
//         console.log(status)

//     }

//         return (
//             <div>
//                 <form className="login__form" onSubmit={handleSubmit(submitHandler)} >
//                 <h3>Logowanie</h3>

//                 <div className="form-group">
//                     <label>Nazwa</label>
//                     <input type="text" className="form-control" placeholder="Podaj nazwę" name="name" onChange={e => setname(e.target.value)} {...register("name")}/>
//                     <p>{errors}</p>
//                 </div>

//                 <div className="form-group">
//                     <label>Hasło</label>
//                     <input type="password" className="form-control" placeholder="Podaj hasło" name="password"  onChange={e => setpassword(e.target.value)}  {...register("password")} />

//                 </div>

//                 <button type="submit" className="btn btn-block">Zaloguj się</button>
//                 <p className="forgot-password text-center">
//                     Nie masz konta? <Link to="/register">Zarejestruj się</Link>
//                 </p>
//             </form>
//             </div>
//         )
//     }

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    authReducer: state.authReducer,
  };
}
export default connect(mapStateToProps, { login })(Login);
