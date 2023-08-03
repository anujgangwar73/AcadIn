import React, { useRef } from "react"
import styles from "./Register.module.css"
import { useState } from "react"
import {Link} from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';

export default function Register() {
    const navigate = useNavigate();
    const [Shown, setShown] = useState(false);
    const [userExists, setUserExists] = useState(false);
    const togglePassword = () => {
        setShown(!Shown);
    };
    
    const username = useRef();
    const email = useRef();
    const password = useRef();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const user = {
            username: username.current.value,
            email: email.current.value,
            password: password.current.value
        };
        try {
            const res = await axios.post("https://acadin.herokuapp.com/auth/register", user);
            
            navigate("/login");
        } catch (error) {
            if(error.response)
            {
                if(error.response.status == 400)
                    setUserExists(true);
                console.log(error.response.data);
            }
            else
                console.error(error);
        }
    }
    return (
        document.body.style.backgroundColor = "white",
        <div className={styles.register}>
            <div className={styles.logo}>
                <span className={styles.registerLogo}>Acad</span>
                <span className={styles.designlogo}>In</span>
            </div>
            <div className={styles.registerbox}>
                <div className={styles.box}>
                    <span className={styles.regis}>Sign Up</span>
                    <input placeholder="Name" className={styles.registerInput} required ref={username}/>
                    <input placeholder="Email" className={styles.registerInput} required ref={email} />
                    {userExists && <Alert severity="error" onClose={() => setUserExists(false)}>User already exists</Alert>}
                    <div className={styles.registerInput}>
                        <input type={Shown ? "text" : "password"} placeholder="Password" className={styles.pass} required ref={password} />
                        <i className="fa-solid fa-eye" onClick={togglePassword}></i>
                    </div>
                    <button className={styles.registerButton} onClick={handleSubmit}>Register</button>
                    <span className={styles.login}>Already on AcadIn?
                        <Link to="/login" className={styles.log}>Login</Link>
                    </span>
                </div>
            </div>
        </div >
    )
}