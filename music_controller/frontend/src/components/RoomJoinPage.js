import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function RoomJoinPage() {
    const [roomCode, setRoomCode] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate()


    async function handleRoomButtonPressed() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                code: roomCode
            })
        };
        try {
            const response = await fetch('/api/join-room', requestOptions)
            if (response.ok) {
                navigate(`/room/${roomCode}`)    
            }
            else {
                setError('Room not found.')
            }
        } catch(error) {
            console.log(error)
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
                onClick={handleRoomButtonPressed}
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
