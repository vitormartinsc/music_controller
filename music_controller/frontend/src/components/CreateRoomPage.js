import React, { Component } from "react";
import Button from "@mui/material/Button";
import { Grid2 } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { Link } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";



function CreateRoomPage(props) {
    //const defaultVotes = 2;

    return (
        <Grid2 container spacing={1}>
            <Grid2 item xs={12} style={{ textAlign: "center" }}>
                <Typography component="h4" variant="h4">
                    Create A Room
                </Typography>
            </Grid2>
        </Grid2>
    );
}


export default CreateRoomPage;