import React, { Component, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Collapse} from '@material-ui/core'
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

export default function CreateRoomPage(props) {
  const defaultVotes = 2;
  const [guestCanPause, setGuestCanPause] = useState(true);
  const [voteToSkip, setVote] = useState(defaultVotes);
  const [updateStatus, setUpdateStatus] = useState('')
  const history = useNavigate();
  const title = !props.update ? "Create Room" : "Change Setting";

  function handleVotesChange(e) {
    setVote(e.target.value);
  }

  function handleGuestCanPauseChange(e) {
    setGuestCanPause(e.target.value === "true" ? true : false);
    console.log(guestCanPause);

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
    console.log(voteToSkip, guestCanPause);
    fetch("/api/create-room", requestOption)
      .then((response) => response.json())
      .then((data) => history("/room/" + data.code));
  }
  function handleUpdateRoomButtonPressed() {
    const requestOption = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: voteToSkip,
        guest_can_pause: guestCanPause,
        code: props.roomCode
      }),
    };
    fetch("/api/update-room", requestOption)
      .then((response) => {
        if(response.ok){
          setUpdateStatus('Room updated successfully')
        }else{
          setUpdateStatus('Room update Failed')
        }
        props.updateCallback;
      })
  }
  function renderCreateButtons() {
    return (
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
    );
  }
  function renderUpdateButton() {
    return (
      <Grid item xs={12} align="center">
        <Button
          color="primary"
          variant="contained"
          onClick={handleUpdateRoomButtonPressed}
        >
          Update the room
        </Button>
      </Grid>
    );
  }
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Collapse in={updateStatus != ''}>
          {updateStatus}
        </Collapse>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl commponent="fieldset">
          <FormHelperText>
            <div align="center">Guetst control of playback state</div>
          </FormHelperText>
          <RadioGroup
            row
            value={guestCanPause}
            onChange={handleGuestCanPauseChange}
          >
            <FormControlLabel
              value={true}
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value={false}
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
        {props.update ? renderUpdateButton() : renderCreateButtons()}
      </Grid>
    </Grid>
  );
}
