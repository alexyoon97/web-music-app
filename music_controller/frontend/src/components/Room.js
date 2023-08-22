import React, { Component, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Grid, Button, Typography, Avatar } from "@material-ui/core";
import HomePage from "./HomePage";
import CreateRoomPage from "./CreateRoomPage";
import MusicPlayer from "./MusicPlayer";

export default function Room(props) {
  const [voteToSkip, setVote] = useState();
  const [guestCanPause, setGuestCanPause] = useState();
  const [isHost, setIsHost] = useState();
  const [showSetting, setShowSetting] = useState();
  const [song, setSong] = useState({});
  const [users, setUsers] = useState({});
  const [curUser, setCurUser] = useState({});
  const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false);
  const params = useParams();
  const history = useNavigate();

  useEffect(() => {
    getRoomDetails();
    getCurrentSong();
    getCurrentUser();
    // getUsers();
    const interval = setInterval(getCurrentSong, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  async function getRoomDetails() {
    await fetch("/api/get-room" + "?code=" + params.roomCode)
      .then((res) => {
        if (!res.ok) {
          props.leaveRoomCallback();
          history("/");
        }
        return res.json();
      })
      .then((data) => {
        setGuestCanPause(data.guest_can_pause);
        setVote(data.votes_to_skip);
        setIsHost(data.is_host);
        if (data.is_host) {
          authenticateSpotify();
        }
      });
  }
  async function getUsers() {
    const res = await fetch("/spotify/get-users");
    if (!res.ok) {
      console.log("bad res");
      return {};
    }
    const json = await res.json();
    getUsers(json);
  }
  async function getCurrentUser() {
    const res = await fetch("/spotify/current-user");
    if (!res.ok) {
      console.log("bad res");
      return {};
    }
    const json = await res.json();
    setCurUser(json);
  }

  async function getCurrentSong() {
    const res = await fetch("/spotify/current-song");
    if (!res.ok) {
      console.log("bad res");
      return {};
    }
    const json = await res.json();
    setSong(json);
  }
  function leaveButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("/api/leave-room", requestOptions).then((res) => {
      props.leaveRoomCallback();
      history("/");
    });
  }
  function updateShowSetting(value) {
    setShowSetting(value);
  }
  function renderSettingButton() {
    return (
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => updateShowSetting(true)}
        >
          Setting
        </Button>
      </Grid>
    );
  }
  function authenticateSpotify() {
    fetch("/spotify/is-authenticated")
      .then((res) => res.json())
      .then((data) => {
        setSpotifyAuthenticated(data.status);
        if (!data.status) {
          fetch("/spotify/get-auth-url")
            .then((res) => res.json())
            .then((data) => {
              window.location.replace(data.url);
              console.log(data);
            });
        }
      });
  }
  function renderSettingDiv() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <CreateRoomPage
            update={true}
            votesToSkip={voteToSkip}
            guestCanPause={guestCanPause}
            roomCode={params.roomCode}
            updateCallback={getRoomDetails}
          />
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => updateShowSetting(false)}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    );
  }
  if (showSetting) {
    return renderSettingDiv();
  }
  return (
    <Grid>
      <Grid item xs={12} align="center">
        <Avatar alt={curUser.name} src={curUser.profile_pic} />
        <Typography variant="h6" component="h6">
          {curUser.display_name}
        </Typography>
      </Grid>
      <Grid container style={{position:'absolute', bottom:'0px'}}>
        <Grid xs={10}>
          <MusicPlayer song={song} />
        </Grid>
        <Grid xs={2} align='center'>
          <Typography variant="h6" component="h6">
            {params.roomCode}
          </Typography>
          {isHost ? renderSettingButton() : null}
          <Grid item xs={12} align="center">
            <Button
              variant="contained"
              color="secondary"
              onClick={leaveButtonPressed}
            >
              Leave Room
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
