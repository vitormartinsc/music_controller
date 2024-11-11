import React, { Component } from "react";
import CreateRoomPage from "./CreateRoomPage";
import RoomJoinPage from "./RoomJoinPage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Room from "./Room";

function HomePage(props) {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<p>This is the home Page</p>} />
                <Route path="/join" element={<RoomJoinPage />} />
                <Route path="/create" element={<CreateRoomPage />} />
                <Route path='/room/:roomCode' element={<Room></Room>} />
            </Routes>
        </Router>
    );
}

export default HomePage;