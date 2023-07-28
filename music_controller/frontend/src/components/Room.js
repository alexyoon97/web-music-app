import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Room() {
  const [voteToSkip, setVote] = useState();
  const [guestCanPause, setGuestCanPause] = useState();
  const [isHost, setIsHost] = useState();
  const params = useParams();
  useEffect(() => {
    fetch("/api/get-room" + "?code=" + params.roomCode)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setGuestCanPause(data.guest_can_pause);
        setVote(data.votes_to_skip);

        setIsHost(data.is_host);
      });
  }, []);

  return (
    <div>
      {console.log(guestCanPause, isHost)}
      <h3>{params.roomCode}</h3>
      <p>Votes: {voteToSkip}</p>
      <p>
        Permission to Guest can Pause:
        {guestCanPause ? guestCanPause.toString() : ""}
      </p>
      <p>Host: {isHost ? isHost.toString() : ""}</p>
    </div>
  );
}
