import React from "react";
import { auth, provider, signInWithPopup } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      navigate("/"); // Redirect to home after login
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "35vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1
        style={{ fontSize: "30px", fontWeight: "bold", fontFamily: "Gabarito" }}
      >
        Login
      </h1>
      <button
        onClick={handleLogin}
        style={{
          padding: "10px 20px",
          fontSize: "20px",
          borderRadius: "10px",
          border: "none",
          backgroundColor: "black",
          color: "white",
          fontFamily: "Gabarito",
        }}  
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
