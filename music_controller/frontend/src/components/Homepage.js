import React, { Component } from "react";
import CreateRoomPage from "./CreateRoomPage";
import RoomJoinPage from "./RoomJoinPage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function HomePage(props) {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<p>This is the home Page</p>} />
                <Route path="/join" element={<RoomJoinPage />} />
                <Route path="/create" element={<CreateRoomPage />} />
            </Routes>
        </Router>
    );
}

export default HomePage;