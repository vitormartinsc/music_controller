import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, Button, Grid } from "@mui/material";

function Room() {
    const [votesToSkip, setVotesToSkip] = useState(2);
    const [guestCanPause, setGuestCanPause] = useState(false);
    const [isHost, setIsHost] = useState(false);
    const {roomCode} = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        // Função para obter os detalhes da sala
        function getRoomDetails() {
            fetch('/api/get-room?code=' + roomCode)
                .then((response) => response.json())
                .then((data) => {
                    setVotesToSkip(data.votes_to_skip); // Ajuste do nome da chave
                    setGuestCanPause(data.guest_can_pause); // Ajuste do nome da chave
                    setIsHost(data.is_host); // Ajuste do nome da chave
                });
        }

        getRoomDetails();
    }, [roomCode]); 

    function handleRoomButtonPressed() {
        fetch('/api/leave-room', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(() => {
            navigate('/'); // Redireciona para a página inicial
        }).catch((error) => {
            console.error('Error leaving room:', error);
        });
    }


    return (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
          sx={{ padding: 3 }}
        >
          <Typography variant="h4" component="h4" gutterBottom>
            Code: {roomCode}
          </Typography>
    
          <Box mt={2} mb={1}>
            <Typography variant="h6" component="h6">
              Votes: {votesToSkip}
            </Typography>
          </Box>
    
          <Box mb={1}>
            <Typography variant="h6" component="h6">
              Guest Can Pause: {guestCanPause.toString()}
            </Typography>
          </Box>
    
          <Box mb={1}>
            <Typography variant="h6" component="h6">
              Host: {isHost.toString()}
            </Typography>
          </Box>
    
          <Box mt={3}>
            <Button variant="contained" color="secondary" onClick={handleRoomButtonPressed}>
              Leave Room
            </Button>
          </Box>
        </Box>
      );
};

export default Room;
