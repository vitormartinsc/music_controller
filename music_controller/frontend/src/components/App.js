import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './Homepage';
import CreateRoomPage from './CreateRoomPage';
import RoomJoinPage from './RoomJoinPage';
import Room from './Room';



function App() {
    const [roomCode, setRoomCode] = useState(null)

    async function fetchRoomCode() {
        fetch('/api/user-in-room')
            .then((response) => response.json())
            .then((data) => setRoomCode(data.code))
            .catch((error) => console.error("Error fetching room code:", error));
    }

    useEffect(() => {
        fetchRoomCode();
    }, []); 

    return (
        <div className='center'>
            <Router>
                <Routes>
                    <Route path="/" 
                    element={ roomCode ? <Navigate to={`/room/${roomCode}`} /> : <HomePage /> }
                    />
                    <Route path="/join" element={<RoomJoinPage />} />
                    <Route path="/create" element={<CreateRoomPage />} />
                    <Route path="/room/:roomCode" element={<Room />} />
                </Routes>
            </Router>
        </div>
    );
}

const appDiv = document.getElementById('app');
render(<App />, appDiv);
