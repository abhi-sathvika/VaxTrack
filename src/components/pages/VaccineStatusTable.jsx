import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";


function VaccineStatusTable(props) {
    const [vaccineStatus, setVaccineStatus] = useState([]);
    const userId = window.localStorage.getItem('userId');
useEffect(() =>{
    axios.get(`https://vaccinationtrackerapi-gubzfrauhvhsbagj.southeastasia-01.azurewebsites.net/api/vaccinestatus/parent/` + userId).then(responseVaccineStatus => {
      console.log(responseVaccineStatus.data);
      setVaccineStatus(responseVaccineStatus.data);}).catch(error =>{console.error('FetchVaccineStatusError: ', error)});
    
  },[]);

const ActionButton = (props) => {
    if ((Date(props.vac.plannedDate) < Date.now) &&  props.vac.status === "Pending"){
        return(
          <div><button onClick={() => {
            const url = "https://vaccinationtrackerapi-gubzfrauhvhsbagj.southeastasia-01.azurewebsites.net/api/vaccinestatus/markcomplete/" + props.vac.id;
            axios.put(url).catch(error =>{console.error('FetchVaccineStatusError: ', error)});
                
                props.vac.status = "Completed";
                setVaccineStatus(vaccineStatus.map(v => v.id ===props.vac.id ? {...vaccineStatus[v.id], status:"Completed"} : v));
                
          }
            }
          >Mark Complete</button></div>
        );
      }
      else{
        return(
          <div></div>
        )
      }
}

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Recommended Date</th>
            <th>Actual Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            vaccineStatus.filter(v => v.userId === props.selectedChild).map(vac => {
              return(
                <tr>
                  <td>{vac.vaccinationName}</td>
                  <td>{vac.plannedDate}</td>
                  <td>{vac.actualDate}</td>
                  <td>{vac.status}</td>
                  <td>
                    <span className="actions">
                        
                      <ActionButton vac={vac} setVaccineStatus={() => setVaccineStatus} />
                    </span>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
       
    </div>
  )
}
export default VaccineStatusTable;
