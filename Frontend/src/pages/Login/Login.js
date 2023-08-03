import React, { useContext, useRef } from "react"
import styles from "./Login.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Alert from '@mui/material/Alert';

export default function Login() {
    const navigate = useNavigate();
    const [Shown, setShown] = useState(false);
    const [invalidPass, setInvalidPass] = useState(false);
    const [invalidUser, setInvalidUser] = useState(false);
    const togglePassword = () => {
        setShown(!Shown);
    };

    const email = useRef();
    const password = useRef();
    const { user, isFetching, error, dispatch } = useContext(AuthContext);
    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("https://acadin.herokuapp.com/auth/login", { email: email.current.value, password: password.current.value });
            // console.log(res);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            navigate('/');
        } catch (error) {
            console.error(error);
            if(error.response)
            {
                if(error.response.status === 400)
                    setInvalidPass(true);
                else if(error.response.status === 404)
                    setInvalidUser(true);
            }
            dispatch({ type: "LOGIN_FAILURE", payload: error });
        }

    }
    // console.log(user);
    return (
        document.body.style.backgroundColor = "white",
        <div className={styles.login}>
            <div className={styles.logo}>
                <span className={styles.loginLogo}>Acad</span>
                <span className={styles.designlogo}>In</span>
            </div>
            <div className={styles.loginbox}>
                <div className={styles.box}>
                    <span className={styles.log}>Login</span>
                    <input placeholder="Email" className={styles.loginInput} required ref={email} />
                    {invalidUser && <Alert severity="error" onClose={() => setInvalidUser(false)}>User Doesn't Exist</Alert>}
                    <div className={styles.loginInput}>
                        <input type={Shown ? "text" : "password"} placeholder="Password" className={styles.pass} required ref={password} />
                        <i className="fa-solid fa-eye" onClick={togglePassword}></i>
                    </div>
                    <button className={styles.loginButton} onClick={handleClick}>Log In</button>
                    <span className={styles.register}>New to AcadIn?
                        <Link to='/register' className={styles.regis}>Register Here</Link>
                    </span>
                    {invalidPass && <Alert severity="error" onClose={() => setInvalidPass(false)}>Incorrect Password Entered</Alert>}
                </div>
            </div>
        </div >
    )
}