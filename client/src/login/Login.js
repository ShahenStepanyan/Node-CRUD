import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'
function Login() {
  const dispatch = useDispatch()
  const navigat = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        dispatch({
          type: "edit-current-user-name",
          payload: {
              name: email,
              id: data.token
          }
      })
        navigat("/home")
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to log in');
    }
  };



  return (
    <div className="App">
      
        <div>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
}

export default Login;
