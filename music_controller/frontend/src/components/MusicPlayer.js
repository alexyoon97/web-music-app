import React, { Component } from "react";
import {
  Grid,
  Typography,
  Card,
  IconButton,
  LinearProgress,
} from "@material-ui/core";
import PlayArrow from "@material-ui/icons/PlayArrow";
import Pause from "@material-ui/icons/Pause";
import SkipNext from "@material-ui/icons/SkipNext";

export default function MusicPlayer(props) {
  const song_progress = (props.song.time / props.song.duration) * 100;

  function pauseSong() {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("/spotify/pause", requestOptions);
  }
  function playSong() {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("/spotify/play", requestOptions);
  }
  return (
    <Card>
      {console.log(props.song)}
      <Grid container alignItems="center">
        <Grid item align="center" xs={4}>
          <img src={props.song.image_url} height="50%" width="50%" />
        </Grid>
        <Grid item align="center" xs={8}>
          <Typography component="h5" variant="h5">
            {props.song.title}
          </Typography>
          <Typography color="textSecondary" variant="subtitle1">
            {props.song.artist}
          </Typography>
          <div>
            <IconButton onClick={()=>{
              props.song.is_playing?pauseSong():playSong()
            }}>
              {props.song.is_playing ? <Pause/> : <PlayArrow/>}
            </IconButton>
            <IconButton>
              <SkipNext />
            </IconButton>
          </div>
        </Grid>
      </Grid>
      <LinearProgress variant="determinate" value={song_progress} />
    </Card>
  );
}
