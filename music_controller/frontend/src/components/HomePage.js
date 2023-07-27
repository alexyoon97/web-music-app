import React, { Component } from "react";
import CreateRoomPage from "./CreateRoomPage";
import RoomJoinPage from "./RoomJoinPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/">
          </Route>
          <Route path="/join" Component={RoomJoinPage}></Route>
          <Route path="/create" Component={CreateRoomPage}></Route>
        </Routes>
      </Router>
    );
  }
}