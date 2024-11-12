import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    Grid, Typography, FormControl, FormHelperText, Box, Radio, RadioGroup, Button,
    FormControlLabel, TextField
}
 from "@mui/material";

function CreateRoomPage() {
    const defaultVotes = 2
    const [guestCanPause, setGuestCanPause] = useState(true);
    const [votesToSkip, setVotesToSkip] = useState(defaultVotes);
    const navigate = useNavigate();

    function HandleVotesChange(e) {
        setVotesToSkip(e.target.value)
    }

    function handleGuestCanPause(e) {
        setGuestCanPause(e.target.value === "true")
    }

    function handleRoomButtonPressed(e) {
        const requestOptions = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                votes_to_skip: votesToSkip,
                guest_can_pause: guestCanPause
            })
        };
        fetch('/api/create-room', requestOptions).then(
            (response) => response.json()
        ).then(
            (data) => navigate('/room/' + data.code)
        );
    }
    
    return (
        <Grid container spacing={1}>
          <Grid item xs={12} align="center">
            <Typography component="h4" variant="h4">
              Create A Room
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <FormControl component="fieldset">
              <FormHelperText>
                <div align="center">Guest Control of Playback State</div>
              </FormHelperText>
              <RadioGroup
                row
                defaultValue="true"
                onChange={handleGuestCanPause}
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
                inputProps={{
                  min: 1,
                  style: { textAlign: "center" },
                }}
                defaultValue={defaultVotes}
                onChange={HandleVotesChange}
              />
              <FormHelperText>
                <div align="center">Votes Required To Skip Song</div>
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} align="center">
            <Button
              color="primary"
              variant="contained"
              onClick={handleRoomButtonPressed}
            >
              Create A Room
            </Button>
          </Grid>
          <Grid item xs={12} align="center">
            <Button color="secondary" variant="contained" to="/" component={Link}>
              Back
            </Button>
          </Grid>
        </Grid>
      );
}

export default CreateRoomPage;

