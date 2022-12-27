import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import '../assets/css/signup.css'
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import Logo from '../components/Logo';
import validator from 'validator'
import axios from "axios";

function Signup() {
  const [passType, setPassType] = useState("password")
  const [passText, setpassText] = useState("Show")
  const [username, setusername] = useState("")
  const [email, setEmail] = useState("")
  const [passInput, setpassInput] = useState("")
  const [checkBox, setcheckBox] = useState(false)
  const [msg, setMsg] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [msgColor, setMsgColor] = useState('')


  const handleEmail = async (e) => {
    const emailVal = e.target.value;
    setEmail(emailVal);

    if (emailVal.length > 0) {
      if (validator.isEmail(emailVal)) {
        const emailExiest = await axios.post('http://localhost:5000/check-email', {
          email: emailVal,
        });
        if (emailExiest.data.msg === 'success') {
          setMsgColor('text-primary')
          setEmailError("Email already exist.")
          setusername('')
        } else {
          setMsgColor('')
          setEmailError(false)
          setusername(emailVal)
        }

      } else {
        setMsgColor('text-danger')
        setEmailError('Enter valid Email!')
        setusername('')
      }
    } else {
      setMsgColor('')
      setEmailError(false)
    }
  }

  const handleUsername = async (e) => {
    const userCurrentVal = e.target.value;
    setusername(userCurrentVal)
    // console.log(userCurrentVal);
  }


  function togglePass() {
    if (passType === "password") {
      setPassType("text")
      setpassText('Hide')
      return;
    }
    setPassType("password")
    setpassText('Show')
  }

  function handleCheckbox() {
    setcheckBox(!checkBox)
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post('http://localhost:5000/register', {
        email: email,
        username: username,
        password: passInput,
        emailCheckBox: checkBox
      });
      setEmail('')
      setpassInput('')
      setcheckBox(false)
      setusername('')

      setMsgColor('text-success')
      setMsg(data.data.msg);
    } catch (error) {
      if (error.response) {
        setMsgColor('text-danger')
        setMsg(error.response.data.msg);
      }
    }
  }

  return (
    <div>
      <div className="signupPage">
        <div className="signupFormSection">
          <div className="container">
            <Logo />
            <div className="signupForm">
              <h2>Sign Up for Mailchimp</h2>
              <p>Create a free account or <Link to="/">Login</Link></p>

              <span className={msgColor}>{msg}</span>
              <form onSubmit={handleSignUp}>
                <div className="form-group">
                  <label htmlFor="">Email</label>
                  <input type="text" name='email' className="form-control" placeholder="Email" value={email} onChange={handleEmail} />
                  <span className={msgColor}>{emailError}</span>
                </div>

                <div className="form-group">
                  <label htmlFor="">Username</label>
                  <input type="text" name='username' className="form-control" placeholder="Username" value={username} onChange={handleUsername} />
                </div>

                <div className="form-group">
                  <div className='pwtClass'>
                    <label htmlFor="">Password</label>
                    <span className='passwordEye' onClick={togglePass}>{passType === "password" ? <FaRegEyeSlash /> : <FaRegEye />} {passText}</span>
                  </div>
                  <input type={passType} name="password" className="form-control" placeholder="Password" onChange={(e) => setpassInput(e.target.value)} value={passInput} />
                </div>

                <div className="form-check">
                  <label className="form-check-label agreeCheckBox" htmlFor="confCheck">
                    <input type="checkbox" className="form-check-input" id='confCheck' value={checkBox} onChange={(e) => handleCheckbox()} />
                    I don't want to receive emails about Mailchimp and related Intuit product and feature updates, marketing best practices, and promotions from Mailchimp.
                  </label>
                </div>

                <p className='agreement'>By creating an account, you agree to our Terms and have read and acknowledge the Global Privacy Statement.</p>

                <button className='signupBtn'>Sign Up</button>
              </form>

              <div className="signUpFoot">
                &copy; 2022-23
              </div>
            </div>
          </div>
        </div>
        <div className="signupImageSection"></div>
      </div>
    </div>
  )
}

export default Signup
