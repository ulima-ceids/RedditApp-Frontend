import React from "react";
import './Welcome.css';
import { useState, useEffect } from 'react';
import { gapi } from "gapi-script";
import GoogleLogin from 'react-google-login';

function Welcome() {
  const clientID = "83139650099-3jt4la3jes1524763kfr7fffa1tj6pps.apps.googleusercontent.com"
  const [user, setUser] = useState({});
  const [loggeIn, setLoggetInfo] = useState(false); 

  const onSuccess = (response) => {
    setUser(response.profileObj);
    document.getElementsByClassName("google-login-button").hidden = true;
  }
  const onFailure = (response) => {
    console.log("Something went wrong");
  }
  const handleLogout  = () => {
    setUser({}); 
  }
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientID,
      });
    }
    gapi.load("client:auth2", start);
  });

  return (
    
      <div className="login-container">
        <div className="login-box">
          <img
            src="data:image/png;base64,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"
            className="logo"
          />
            <GoogleLogin
              className='google-login-button'
              clientId={clientID}
              onSuccess={onSuccess}
              onFailure={onFailure}
              buttonText="Iniciar sesión con Google"
              cookiePolicy={"single_host_origin"}
            />
            <button className="lr-button" onClick={handleLogout}>
                Registrarse
            </button>
          <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
        </div>
        <div className="signup-box">
          <p>¿No tienes una cuenta? <a href="#">Regístrate</a></p>
        </div>
      </div>
  );
}
export default Welcome; 