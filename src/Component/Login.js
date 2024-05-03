import React from "react";
function Login({ onLogin }) {
  return (
    <div className="login-container">
        <form className="login-form">
            <h2 className="login-title">Welcome to HMS</h2>        
            <div>
                <label className="label" for="email1">Your Email</label>
                <input className="login-email" id="email1" type="email" placeholder="johndoe@example.com" required />
            </div>
            <div>
                <label className="label" for="password1" >Enter Password</label>
                <input className="login-pass" id="password1" type="password" required />
            </div>
            <div>
                <input type="checkbox" id="remember" />
                <label for="remember">Remember me</label>
            </div>
            <button className="login-button" type="submit" onClick={onLogin}>Submit</button>
        </form>
    </div>
  );
}

export default Login;