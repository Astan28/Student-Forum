import "./NavBar.scss";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../services/actions/authActions";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

export class NavBar extends Component {
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { isAuthenticated } = this.props.authReducer;
    const { history } = this.props;
    console.log(isAuthenticated);
    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    } else
      return (
        <div className="NavBar">
          <div className="search"></div>
          <div className="options">
            <button
              type="button"
              onClick={() => {
                history.push("/calendar");
              }}
            >
              Kalendarz
            </button>
            <button
              type="button"
              onClick={() => {
                history.push("/user");
              }}
            >
              Profil
            </button>
            <button type="button" onClick={this.logout.bind(this)}>
              wyloguj
            </button>
          </div>
        </div>
      );
  }
}

function mapStateToProps(state) {
  return {
    authReducer: state.authReducer,
  };
}

export default withRouter(connect(mapStateToProps, { logout })(NavBar));

// const NavBar = () => {

//   logout(e) {
//     e.preventDefault();
//     this.props.logout();
// }

//   return (
//     <div className="NavBar">
//       <div className="search">
//         <input type="text" placeholder="Wyszukaj" />
//         <button type="button" className="btn btn-secondary">
//           Szukaj
//         </button>
//       </div>
//       <div className="options">
//         <button type="button">Kalendarz</button>
//         <button type="button">Profil</button>
//         <button type="button" onClick={this.logout.bind(this)}>wyloguj</button>
//       </div>
//     </div>
//   );
// };
