


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import axios from 'axios';

import InputControl from "../InputControl/InputControl";


import styles from "./Login.module.css";
import { auth } from "../config";
import LoginGoogle from "./LoginGoogle";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.email || !values.password) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    axios.post('http://localhost:5000/login', values)
    .then(response => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('name', response.data.name);
        navigate("/");
    })
    .catch((error) => {
      setSubmitButtonDisabled(false);
      setErrorMsg(error.response.data.message);
    });
    // signInWithEmailAndPassword(auth, values.email, values.pass)
    //   .then(async (res) => {
    //     setSubmitButtonDisabled(false);
        
    //     navigate("/");
    //   })
    //   .catch((err) => {
    //     setSubmitButtonDisabled(false);
    //     setErrorMsg(err.message);
    //   });
  };
  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Login</h1>

        <InputControl
          label="Email"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
          placeholder="Enter email address"
        />
        <InputControl
          label="Password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, password: event.target.value }))
          }
          placeholder="Enter Password"
        />

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button disabled={submitButtonDisabled} onClick={handleSubmission}>
            Login
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/signup">Sign up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
