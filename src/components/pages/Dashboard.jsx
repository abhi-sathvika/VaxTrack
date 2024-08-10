import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css"
import {  useNavigate } from 'react-router-dom'
import VaccineStatusTable from "./VaccineStatusTable";

export function Dashboard (){
  const [user, setUser]= useState([]);
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [vaccineStatus, setVaccineStatus] = useState([]);
  const userEmail = window.localStorage.getItem('userEmail')
  const userName = window.localStorage.getItem('userName')
  const userId = window.localStorage.getItem('userId');
  const navigate = useNavigate()
  const handleButtonClick = ()=>{
    return(
      navigate('/addchild')
    );
  }
  useEffect(() =>{
    axios.get(`https://vaccinationtrackerapi-gubzfrauhvhsbagj.southeastasia-01.azurewebsites.net/api/user/email/` + userEmail).then(responseUser => {
      if(responseUser.data ===null){

      }
      setUser(responseUser.data);
    }).catch(error =>{console.error('FetchUserError: ', error)});

    axios.get(`https://vaccinationtrackerapi-gubzfrauhvhsbagj.southeastasia-01.azurewebsites.net/api/user/children/email/` + userEmail).then(responseChildren => {
      setChildren(responseChildren.data);
      setSelectedChild(responseChildren.data[0]);
      }).catch(error =>{console.error('FetchChildrenError: ', error)});

    axios.get(`https://vaccinationtrackerapi-gubzfrauhvhsbagj.southeastasia-01.azurewebsites.net/api/vaccinestatus/parent/`+userId).then(responseVaccineStatus => {
      setVaccineStatus(responseVaccineStatus.data);}).catch(error =>{console.error('FetchVaccineStatusError: ', error)});
    
  },[]);



return (
  <>
  <div className="dashboard">
    <div className="overview">
      <h1 className="title">Welcome to the Dashboard, {userName}</h1>
      <br />
    </div>

    <div className="dropdownsection">
      {
        selectedChild?.id && (
        <div>
          <h2>Vaccination Status for    
            <select className="dropdown" id="userDropdown" onChange={(e) =>{
            const selc = children.find(c => c.firstName === e.target.value);
            setSelectedChild(selc);
            }}>
                {     
                children.map(child => (
                  <option key={child.Id} value={child.Id}>{child.firstName}</option>
                ))
                }
            </select>
            <button className="dropdown" onClick={handleButtonClick}>Add Child</button>
          </h2>
          <VaccineStatusTable selectedChild={selectedChild?.id} />
        </div>
      )}
    </div>
 
    </div>

  </>


) 
};