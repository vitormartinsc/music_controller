import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Room() {
    const [votesToSkip, setVotesToSkip] = useState(2);
    const [guestCanPause, setGuestCanPause] = useState(false);
    const [isHost, setIsHost] = useState(false);
    const {roomCode} = useParams();


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

    return(
        <div>
            <h3>{roomCode}</h3>
            <p>Votes: {votesToSkip}</p>
            <p>Guest Can Pause: {guestCanPause.toString()}</p>
            <p>Host: {isHost.toString()}</p>
        </div>
    );
};

export default Room;
