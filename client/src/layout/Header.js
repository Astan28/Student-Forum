import "./Header.scss";
import { useHistory } from "react-router-dom";

const Header = () => {
  let history = useHistory();
  return (
    <div
      className="Header"
      onClick={() => {
        history.push("/");
      }}
    >
      <span>
        <img src={process.env.PUBLIC_URL + "/WSTI_logo.jpg"} alt="logo"></img>
      </span>
      <span className="header-text">
        <h1>Forum dla Studentów</h1>
        <h2>Wyższa Szkoła Technologii Informatycznych w Katowicach</h2>
      </span>
    </div>
  );
};

export default Header;
