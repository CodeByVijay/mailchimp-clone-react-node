import React, { useState } from 'react';
import { useCookies } from 'react-cookie'
import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/login.css'
import '../assets/css/main.css'
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import axios from 'axios';
import Logo from '../components/Logo';

function Login() {
    const [passType, setPassType] = useState("password")
    const [passText, setpassText] = useState("Show")
    const [username, setusername] = useState("")
    const [passInput, setpassInput] = useState("")
    const [refToken, setRefToken] = useCookies(['accessToken', 'refreshToken']);
    const [msg, setMsg] = useState(false)
    const [msgColor, setMsgColor] = useState('')

    const navigate = useNavigate();
    function togglePass() {
        if (passType === "password") {
            setPassType("text")
            setpassText('Hide')
            return;
        }
        setPassType("password")
        setpassText('Show')
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', {
                email: username,
                password: passInput
            });
            // console.log(response);
            let expires = new Date()
            expires.setTime(expires.getTime() + (24 * 60 * 60 * 1000))
            
            setRefToken('accessToken', response.data.accessToken, { path: '/', expires })
            setRefToken('refreshToken', response.data.refreshToken, { path: '/', expires })
            navigate("/admin/dashboard");
        } catch (error) {
            if (error.response) {
                setMsgColor("text-danger")
                setMsg(error.response.data.msg);
            }
        }
    }


    return (
        <>
            <div className="loginPage">
                <div className="formSection bg-light">
                    <div className="container">
                        <Logo />
                        <div className="errorSection">
                            <span className={msgColor}>{msg}</span>
                        </div>

                        <div className="loginForm">
                            <h2>Log In</h2>
                            <p>Need a Mailchimp account? <Link to="/sign-up">Create an account</Link></p>

                            <form onSubmit={handleLogin}>
                                <div className="form-group">
                                    <label htmlFor="">Username or Email</label>
                                    <input type="text" name="" id="username" className="form-control" placeholder="" value={username} onChange={(e) => setusername(e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <div className='pwtClass'>
                                        <label htmlFor="">Password</label>
                                        <span className='passwordEye' onClick={togglePass}>{passType === "password" ? <FaRegEyeSlash /> : <FaRegEye />} {passText}</span>
                                    </div>
                                    {/* <FaRegEyeSlash/><FaRegEye/> */}
                                    <input type={passType} name="" id="password" onChange={(e) => setpassInput(e.target.value)} className="form-control" placeholder="" value={passInput} />
                                </div>

                                <button className='btn w-100 mt-4 mb-3 loginButton'>Log In</button>
                            </form>

                            <div className="form-check">
                                <label className="form-check-label loginAgreeCheckBox">
                                    <input type="checkbox" className="form-check-input keepLogin" name="" id="" value="checkedValue" />
                                    Keep me Logged In
                                </label>
                            </div>

                            <div className="mt-4 impLinks">
                                <Link to="/forgot-username">Forgot Username?</Link> . <Link to="/forgot-password">Forgot password</Link> . <Link to="/not-found">Can't Log in</Link>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="imageSection">
                </div>

            </div>
        </>
    )
}

export default Login
