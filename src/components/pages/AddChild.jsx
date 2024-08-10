import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { Link, useNavigate } from 'react-router-dom'

export function AddChild(){
  const [firstName, setFirstName]= useState([]);
  const userEmail = window.localStorage.getItem('userEmail')
  const userName = window.localStorage.getItem('userName')
  const userId = window.localStorage.getItem('userId');
  const [children, setChildren] = useState([]);
  const navigate = useNavigate()
  const child = {
    type:'Child',
    parentId: userId,
    birthDate:'2020-04-05',
    firstName: 'Luckyy',
    lastName: 'GG',
    id: uuid(),
    country:'US',
    entityType:'User'
  };
    const handleSubmit = async (e) => {
        e.preventDefault();
          console.log(child);
          await axios.post(`https://vaccinationtrackerapi-gubzfrauhvhsbagj.southeastasia-01.azurewebsites.net/api/user/child`, child)
          .then(response => 
            {
            console.log(response.data);
            setChildren(...children,child);
            navigate('/dashboard');
          }
          ).catch(error =>{console.error('createChildError: ', error)});
      };
    return(
        <div>
        <form onSubmit={handleSubmit} className='input-form'>
          <ul>
        <input
          type="text" className="input-box" value={firstName}
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        /></ul>
        <ul>
        <input
          type="text" className="input-box" value={firstName}
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        /></ul>
        <ul>
        <input
          type="text" className="input-box" value={firstName}
          placeholder="yyyy-mm-dd"
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
        </ul>
        
        <button type="submit" className="submit-button">Submit</button>        
      </form>
      </div>
    )
}