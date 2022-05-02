import "./App.scss";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainPage from "./pages/MainPage";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./services/store";
import Boards from "./pages/Boards";
import Threads from "./pages/Threads";
import React from "react";
import User from "./pages/User";
import CalendarPage from "./pages/CalendarPage";
import ThreadDisplay from "./pages/ThreadDisplay";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/" exact>
            <MainPage />
          </Route>
          <Route path="/boards/:course/:semester" exact>
            <Boards boards={store.boards} />
          </Route>

          <Route path="/board/:id/:name" exact>
            <Threads threads={store.threads} />
          </Route>

          <Route path="/user" exact>
            <User />
          </Route>
          <Route path="/calendar" exact>
            <CalendarPage />
          </Route>
          <Route path="/thread/:threadId" exact>
            <ThreadDisplay />
          </Route>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
