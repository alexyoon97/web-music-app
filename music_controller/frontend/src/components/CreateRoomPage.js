import React, { Component, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  TextFieldButton,
  FormControl,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
} from "@material-ui/core";

export default function CreateRoomPage(){
  const defaultVotes = 2;
  const [guestCanPause, setGuestCanPause] = useState(true);
  const [voteToSkip, setVote] = useState(defaultVotes)
    const history = useNavigate()

  function handleVotesChange(e) {
    setVote(e.target.value);
    console.log(voteToSkip)
  }

  function handleGuestCanPauseChange(e) {
    setGuestCanPause(e.target.value === "true" ? true : false);
    console.log(guestCanPause)
  }

  function handleRoomButtonPressed() {
    const requestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: voteToSkip,
        guest_can_pause: guestCanPause,
      }),
    };
    console.log(voteToSkip,guestCanPause)
    fetch("/api/create-room", requestOption)
      .then((response) => response.json())
      .then((data) => history('/room/' + data.code));
  }
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            Create a Room
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl commponent="fieldset">
            <FormHelperText>
              <div align="center">Guetst control of playback state</div>
            </FormHelperText>
            <RadioGroup
              row
              defaultValue="true"
              onChange={handleGuestCanPauseChange}
            >
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Play/Pause"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="false"
                control={<Radio color="secondary" />}
                label="No Control"
                labelPlacement="bottom"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField
              required={true}
              type="number"
              defaultValue={defaultVotes}
              inputProps={{ min: 1, style: { textAlign: "center" } }} // minium input number
              onChange={handleVotesChange}
            ></TextField>
            <FormHelperText>
              <div align="center">Votes required to Skip Song</div>
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={handleRoomButtonPressed}
          >
            Create a Room
          </Button>
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    );
  }
