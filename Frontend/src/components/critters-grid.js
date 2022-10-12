import React, {useState, useEffect} from "react";
import "../Style.css";
import CritterDataService from "../services/critter.js";
import {Link} from "react-router-dom";


const CritterGrid = props => {

  const [critters, setCritters] = useState([]);

    useEffect(()=>{
      retrieveBugs();
    });

    const retrieveBugs = () =>{
      CritterDataService.getAll()
      .then(response => {
        console.log(response.data);
        //This line sets the critters to the response's data. The .bugs part specifies it wants the array called "bugs"
        setCritters(response.data.bugs);
      })
      .catch(e => {
        console.log(e);
      })
    };

    return(
    <div className="content">
      <div className="grid">
        {critters.map((critter)=>{
          return(
            CritterItem(critter)
          )
        })}
      </div>
    </div>
  );
}

function CritterItem(critter) {
  var imageName = "/Images/Insects/" + critter.Name + ".png"
  return (
    <div className="grid-item">
      <table className="grid-table">
        <tr>
          <td>
            <img src={imageName}></img>
          </td>
          <td className="info-cell">
            <h4>{critter.Name}</h4>
            <hr />
            <h4>{critter.Description}</h4>
            <hr />
            <h4>{critter.NorthMonths}</h4>
            <hr />
            <h4>{critter.Time}</h4>
            <hr />
            <h4>{critter.Location}</h4>
            <hr />
            <h4>{critter.Weather}</h4>
            <hr />
            <h4>{critter.SpawnCondition}</h4>
            <hr />
            <h4>{critter.Price}<img src="/Images/UI/BellsIcon.png" height="30px" width="30px"></img></h4>
          </td>
        </tr>
      </table>
    </div>
  )
}

export default CritterGrid;
