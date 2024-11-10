import React from 'react';
import { render } from 'react-dom';
import HomePage from './Homepage';


function App(props) {
    return (
        <div>
            <HomePage></HomePage>
        </div>
        )
    }
    
const appDiv = document.getElementById('app');
render(<App name="Bob" />, appDiv);
