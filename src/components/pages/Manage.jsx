import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Manage.css"


import { useNavigate } from 'react-router-dom'



export function Manage (){
  const [user, setUser]= useState([]);
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const userEmail = window.localStorage.getItem('userEmail')
  const userId = window.localStorage.getItem('userId')
  const navigate = useNavigate()

  const handleButtonClick = ()=>{
    return(
      navigate('/addchild')
    );
  }
  useEffect(() =>{
    axios.get(`https://vaccinationtrackerapi-gubzfrauhvhsbagj.southeastasia-01.azurewebsites.net/api/user/email/` + userEmail).then(responseUser => {setUser(responseUser.data);}).catch(error =>{console.error('FetchUserError: ', error)});
    axios.get(`https://vaccinationtrackerapi-gubzfrauhvhsbagj.southeastasia-01.azurewebsites.net/api/user/children/email/` + userEmail).then(responseChildren => {
      setChildren(responseChildren.data);
      setSelectedChild(responseChildren.data[0]);
      }).catch(error =>{console.error('FetchChildrenError: ', error)});
    
  },[]);

return (
  <>
  <div className="manage">


    <h1 className="title">Add/update children details, {user.firstName}</h1>
  
    <div className="table-wrapper">
      <button onClick={handleButtonClick}>Add Child</button>
      <table className="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            children.map(c => {
              return(
                <tr>
                  <td>{c.firstName}</td>
                  <td>{c.lastName}</td>
                  <td>{c.birthDate}</td>
                  <td>{c.country}</td>
                  <td>
                    <span className="actions">

                    </span>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
       
    </div>
    </div>

  </>


) 
};

