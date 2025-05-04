import React, { useState } from 'react';
import { apiService } from './services/apiService';
import './App.css';

function App() {
    const [name, setName] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        if (name.trim()) {
            try {
                const loginResponse = await apiService.login(name);
                const userDataResponse = await apiService.getUserData(name);
                setUserData(userDataResponse);
                setIsLoggedIn(true);
                setError(null);
            } catch (err) {
                setError('Login failed. Please try again.');
                console.error(err);
            }
        } else {
            alert('Please enter your name');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setName('');
        setUserData(null);
        setError(null);
    };

    return (
        <div className="App" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f0f2f5'
        }}>
            {error && (
                <div style={{
                    color: 'red',
                    marginBottom: '20px',
                    textAlign: 'center'
                }}>
                    {error}
                </div>
            )}
            {!isLoggedIn ? (
                <div style={{
                    backgroundColor: 'white',
                    padding: '30px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    textAlign: 'center'
                }}>
                    <h1>Welcome to Your App</h1>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            margin: '15px 0',
                            borderRadius: '5px',
                            border: '1px solid #ddd'
                        }}
                    />
                    <button 
                        onClick={handleLogin}
                        style={{
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Login
                    </button>
                </div>
            ) : (
                <div style={{
                    backgroundColor: 'white',
                    padding: '30px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    textAlign: 'center',
                    maxWidth: '400px',
                    width: '100%'
                }}>
                    <h1>Hello, {name}!</h1>
                    {userData && (
                        <div>
                            <p><strong>Email:</strong> {userData.email || 'Not provided'}</p>
                            <p><strong>Location:</strong> {userData.location || 'Not specified'}</p>
                        </div>
                    )}
                    <button 
                        onClick={handleLogout}
                        style={{
                            backgroundColor: '#f44336',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginTop: '15px'
                        }}
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}

export default App;