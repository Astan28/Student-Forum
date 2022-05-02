import React from "react";

import { Link } from "react-router-dom";

import "./MainPage.scss";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import NavBar from "../layout/NavBar";
const MainPage = () => {
  return (
    <div className="MainPage">
      <NavBar />
      <Header />
      <div className="content">
        <div className="main">
          <table className="board-table">
            <thead>
              <tr>
                <th>Informatyka</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Link to="/boards/Informatyka/1">
                    <span>Semestr 1</span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <Link to="/boards/Informatyka/2">
                    <span>Semestr 2</span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <Link to="/boards/Informatyka/3">
                    <span>Semestr 3</span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <Link to="/boards/Informatyka/4">
                    <span>Semestr 4</span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <Link to="/boards/Informatyka/5">
                    <span>Semestr 5</span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <Link to="/boards/Informatyka/6">
                    <span>Semestr 6</span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <Link to="/boards/Informatyka/7">
                    <span>Semestr 7</span>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>

          <table className="board-table">
            <thead>
              <tr>
                <th>Grafika komputerowa</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Link to="/boards/Grafika/1">
                    <span>Semestr 1</span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <Link to="/boards/Grafika/2">
                    <span>Semestr 2</span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <Link to="/boards/Grafika/3">
                    <span>Semestr 3</span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <Link to="/boards/Grafika/4">
                    <span>Semestr 4</span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <Link to="/boards/Grafika/5">
                    <span>Semestr 5</span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <Link to="/boards/Grafika/6">
                    <span>Semestr 6</span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <Link to="/boards/Grafika/7">
                    <span>Semestr 7</span>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
