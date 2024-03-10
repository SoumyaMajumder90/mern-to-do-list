import React from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
        <button type="submit" onclick={() => {navigate("/submit")}}>Click Me!</button>
        <button type="submit" >Login</button>
        <Link to="/submit">
        <button>
          Go to Next Page
        </button>
        </Link>

        
      </form>
    </div>
  );
}