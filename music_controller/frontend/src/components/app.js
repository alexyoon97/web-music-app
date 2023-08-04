import React, { Component } from "react";
import { render } from "react-dom";
import { Navigate } from "react-router-dom";
import HomePage from "./HomePage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import CreateRoomPage from "./CreateRoomPage";
import RoomJoinPage from "./RoomJoinPage";

import Room from "./Room";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: null,
    };
    this.clearRoomCode = this.clearRoomCode.bind(this);
  }
  //When page loads, other components will wait until this function excute
  async componentDidMount() {
    fetch("/api/user-in-room")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          roomCode: data.code,
        });
        console.log(this.state.roomCode);
      });
  }
  clearRoomCode() {
    this.setState({
      roomCode: null,
    });
  }
  render() {
    return (
      <Router>
        <Routes>
          {this.state.roomCode ? (
            <Route
              path="/"
              element={<Navigate replace to={`/room/${this.state.roomCode}`} />}
            />
          ) : (
            <Route path="/" element={<HomePage />}></Route>
          )}

          <Route path="/join" element={<RoomJoinPage />}></Route>
          <Route path="/create" element={<CreateRoomPage />}></Route>
          <Route
            path="room/:roomCode"
            element={<Room leaveRoomCallback={this.clearRoomCode} />}
          ></Route>
        </Routes>
      </Router>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
