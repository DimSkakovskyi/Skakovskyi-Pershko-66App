import React, { useState } from 'react';
import './App.css';

const RegistrationForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("User registered:", username);
    };

    return (
        <div className="page-content">
            <h2 className="header">Register</h2>
            <form onSubmit={handleSubmit} className="wrapper">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegistrationForm;