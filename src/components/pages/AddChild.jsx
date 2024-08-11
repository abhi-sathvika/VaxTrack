import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import {  useNavigate } from 'react-router-dom';
import "./AddChild.css";

export function AddChild(){
  const [firstName, setFirstName]= useState([]);
  const [lastName, setLastName]= useState([]);
  const [dateOfBirth, setDateOfBirth]= useState([]);
  const [countryCode, setCountryCode]= useState([]);
  
  const userEmail = window.localStorage.getItem('userEmail')
  const userName = window.localStorage.getItem('userName')
  const userId = window.localStorage.getItem('userId');
  const [children, setChildren] = useState([]);
  const [vaccineStatus, setVaccineStatus] = useState([]);
  
  const navigate = useNavigate()
  const child = {
    type:'Child',
    parentId: userId,
    birthDate:dateOfBirth,
    firstName: firstName,
    lastName: lastName,
    id: uuid(),
    country:countryCode,
    entityType:'User'
  };
    const handleSubmit = async (e) => {
        e.preventDefault();

          await axios.post(`https://vaccinationtrackerapi-gubzfrauhvhsbagj.southeastasia-01.azurewebsites.net/api/user/child`, child)
          .then(response => 
            {

            setChildren(...children,child);
            axios.get(`https://vaccinationtrackerapi-gubzfrauhvhsbagj.southeastasia-01.azurewebsites.net/api/vaccinestatus/parent/`+userId).then(responseVaccineStatus => {
              setVaccineStatus(responseVaccineStatus.data);}).catch(error =>{console.error('FetchVaccineStatusError: ', error)});
            navigate('/dashboard');
          }
          ).catch(error =>{console.error('createChildError: ', error)});
      };
    return(
        <div>
        <form onSubmit={handleSubmit} className='input-form'>
          <h2>Provide your child details</h2>
          <ul>
            <input
              type="text" className="input-box" value={firstName}
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </ul>
          <ul>
            <input
              type="text" className="input-box" value={lastName}
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </ul>
          <ul>
            <input
              type="text" className="input-box" value={dateOfBirth}
              placeholder="yyyy-mm-dd"
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </ul>
          <ul>
            <input
              type="text" className="input-box" value={countryCode}
              placeholder="Country Code like US, IN"
              onChange={(e) => setCountryCode(e.target.value)}
            />
          </ul>
        <button type="submit" className="submit-button">Add Child</button>        
      </form>
      </div>
    )
}