import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {useState} from "react"
import "./Home.css";

export function Home() {

  const [username, setUsername] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const navigate = useNavigate()

  axios.defaults.withCredentials = true;
  const handleGoogleSuccess = (response) => {

      const userObject = jwtDecode(response.credential);
      localStorage.setItem('user', JSON.stringify(userObject));
      const { name, sub, email,family_name, given_name } = userObject;
      setUserEmail(email)
      setUsername(name)
      window.localStorage.setItem("userEmail", email)
      window.localStorage.setItem("userId", sub)
      window.localStorage.setItem("userName", name)
      window.localStorage.setItem("firstName", given_name)
      window.localStorage.setItem("lastName", family_name)
      
      navigate('/dashboard')
  }
  return(
<div className='homepage'>
            <div className='intro'>

            <h2>Welcome to VaxTrack!!</h2>
                <p>
Welcome to Vaccine Tracker – Your Ultimate Partner in Safeguarding Your Child's Health!

In the hustle and bustle of parenting, keeping track of your child’s vaccinations can be overwhelming. That's where we come in. Vaccine Tracker is your dedicated companion, designed to make vaccination management effortless, accurate, and stress-free. Our user-friendly platform empowers you with personalized schedules, timely reminders, and comprehensive records, ensuring your child stays protected against preventable diseases.

Join us in this vital journey towards a healthier future. With Vaccine Tracker, you can focus on what matters most – cherishing every moment with your little one, knowing their health is in safe hands.</p>
            </div>
            <div className="googlelogin">
                <h3>Login with Google to continue</h3>
                
                <GoogleLogin 
                    onSuccess={handleGoogleSuccess}
                    onError ={() => {
                    console.log("Login Failed");
                    }}
                />

            </div>
        </div>
  );
}