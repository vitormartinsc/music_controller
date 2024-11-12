import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

function RoomJoinPage() {
    const [roomCode, setRoomCode] = useState("");
    const [error, setError] = useState(false);

    function handleJoinRoom() {
        if (roomCode.trim() === "") {
            setError("Please enter a room code.");
        } else {
            console.log("Room code:", roomCode);
            setError(false);
        }
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            padding={3}
            sx={{
                gap: 2,
                width: '100%',
                maxWidth: 500,
                margin: '0 auto', // Centraliza o Box horizontalmente
                textAlign: 'center' // Garante que o texto dentro seja centralizado
            }}
        >
            <Typography variant="h4" component="h4" gutterBottom>
                Join a Room
            </Typography>
            
            <TextField
                error={Boolean(error)}
                label="Room Code"
                placeholder="Enter a Room Code"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                helperText={error || ""}
                variant="outlined"
                fullWidth
            />
            
            <Button
                variant="contained"
                color="primary"
                onClick={handleJoinRoom}
                fullWidth
            >
                Join Room
            </Button>
            
            <Button
                variant="outlined"
                color="secondary"
                component={Link}
                to="/"
                fullWidth
            >
                Back
            </Button>
        </Box>
    );
}

export default RoomJoinPage;
