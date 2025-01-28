import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:3100/')
            .then(res => res.text())
            .then(data => setMessage(data));
    }, []);

    return (
        <div className="App">
            <h1>{message}</h1>
        </div>
    );
}

export default App;