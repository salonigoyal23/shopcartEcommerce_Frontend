import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import axios from 'axios';

import InputControl from "../InputControl/InputControl";
import { auth } from "../config";

import styles from "./Signup.module.css";

function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.name || !values.email || !values.password) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    axios.post('http://localhost:5000/register', values)
    .then(response => {
        console.log(response);
        console.log(response.data);
        navigate("/login");
    })
    .catch((error) => {
      setSubmitButtonDisabled(false);
      setErrorMsg(error.message);
      console.log(error)
    });
    console.log(values);
    // createUserWithEmailAndPassword(auth, values.email, values.pass)
    //   .then(async (res) => {
    //     setSubmitButtonDisabled(false);
    //     const user = res.user;
    //     await updateProfile(user, {
    //       displayName: values.name,
    //     });
    //     navigate("/login");
    //   })
    //   .catch((err) => {
    //     setSubmitButtonDisabled(false);
    //     setErrorMsg(err.message);
    //   });
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Signup</h1>

        <InputControl
          label="Name"
          placeholder="Enter your name"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
        />
        <InputControl
          label="Email"
          placeholder="Enter email address"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <InputControl
          label="Password"
          placeholder="Enter password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, password: event.target.value }))
          }
        />

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button onClick={handleSubmission} disabled={submitButtonDisabled}>
            Signup
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;