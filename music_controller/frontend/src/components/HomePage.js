import React, { Component, useEffect } from "react";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import { Link } from 'react-router-dom'

export default function HomePage() {
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
              console.log(data)
            });
        }
      });
  }
  useEffect(()=>{
    authenticateSpotify();
  },[])
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} align="center">
        <Typography variant="h3" compact="h3">
          Collaborate
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <ButtonGroup disableElevation variant="contained" color="primary">
          <Button color="primary" to="/join" component={Link}>
            Join a Room
          </Button>
          <Button color="secondary" to="/create" component={Link}>
            Create a Room
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}
