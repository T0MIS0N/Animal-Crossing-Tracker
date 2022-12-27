import React, { useState, useEffect } from "react";
import "../Style.css";
import CritterDataService from "../services/critter.js";
import { Link } from "react-router-dom";
import Filter from "../services/filter";

//TODO: Organize code to keep bits that utilize our filter together and limit any interacting parts as much as possible.

var filter = new Filter(false, false, false, false, false, false, false, "bugs", []);

//TODO: Learn more about react component lifespan.
const CritterGrid = props => {

  const [critters, setCritters] = useState([]);

  //TODO: Research useEffect hooks to learn the ins and outs
  useEffect(() => {
    if (filter.critterType === 'bugs')
      retrieveBugs();
    else if (filter.critterType === 'fish')
      retrieveFish();
    else if (filter.critterType === 'sea-creatures')
      retrieveSeaCreatures();
  });

  //TODO: Understand what this does
  const retrieveBugs = () => {
      const bugsData = fetch('/Json/Bugs.json').then(response => {
        return response.json()
      })
      .catch(e => {
        console.log(e);
      })

      bugsData.then(res =>{
        setCritters(res)
      })
  };

  //TODO: Understand what this does
  const retrieveFish = () => {
    const fishData = fetch('/Json/Fish.json').then(response => {
      return response.json()
    })
    .catch(e => {
      console.log(e);
    })

    fishData.then(res =>{
      setCritters(res)
    })
  };

  //TODO: Understand what this does
  const retrieveSeaCreatures = () => {
    const diveData = fetch('/Json/Sea_Creatures.json').then(response => {
      return response.json()
    })
    .catch(e => {
      console.log(e);
    })

    diveData.then(res =>{
      setCritters(res)
    })
  };

  //This is the page HTML returned
  //TODO: Separate components for more modularity in code
  return (
    <div className="content">
      <div className="critter-table">
        <div className="table-bar">
          <div className="critter-group">
            <a onClick={() => filter.changeCritterType("bugs")}><img src="/Images/UI/BugIcon.png"></img></a>
            <a onClick={() => filter.changeCritterType("fish")}><img src="/Images/UI/FishIcon.png"></img></a>
            <a onClick={() => filter.changeCritterType("sea-creatures")}><img src="/Images/UI/DiveIcon.png"></img></a>
          </div>
          <div className="filter-div">
            <a onClick={() => toggleFilterPane()}><img src="/Images/UI/FlowerIcon.png"></img></a>
            <div className="filter-pane" id="filter-pane">
              <h3>Filter</h3>
              <h4>Not Donated<input id="donated" onClick={() => { filter.donated = document.getElementById("donated").checked; /*console.log(filter.collectedArray)*/ }} type="checkbox" /></h4>
              <h4>Available Today<input id="today" onClick={() => { filter.activeToday = document.getElementById("today").checked }} type="checkbox" /></h4>
              <h4>Available Right Now<input id="right-now" onClick={() => { filter.activeNow = document.getElementById("right-now").checked }} type="checkbox" /></h4>
              <h4>Location<input id="location" onClick={() => { filter.location = document.getElementById("location").checked }} type="checkbox" /></h4>
              <h5>
                <input type="radio" name="location" id="" value="" />Anywhere
                <input type="radio" name="location" id="" value="" />Trees
                <input type="radio" name="location" id="" value="" />Tree Stumps<br />
                <input type="radio" name="location" id="" value="" />Flowers
                <input type="radio" name="location" id="" value="" />Rocks
                <input type="radio" name="location" id="" value="" />Water
                <input type="radio" name="location" id="" value="" />Etc.
              </h5>
              <h4>Weather<input id="weather" onClick={() => { filter.weather = document.getElementById("weather").checked }} type="checkbox" /></h4>
              <h5>
                <input type="radio" name="weather" id="" value="" />Any Weather
                <input type="radio" name="weather" id="" value="" />Absent in Rain
                <input type="radio" name="weather" id="" value="" />Rain
              </h5>
              <h4>Spawn Condition<input id="spawn-condition" onClick={() => { filter.spawnCondition = document.getElementById("spawn-condition").checked }} type="checkbox" /></h4>
              
              <h4>Price<input id="price" onClick={() => { filter.price = document.getElementById("price").checked }} type="checkbox" /></h4>
              
              <hr></hr>
              <h3>Sort</h3>
              <h4>Alphabetical</h4>
              <h4>Price</h4>
              <h5>Lowest to Highest</h5>
              <h5>Highest to Lowest</h5>
            </div>
          </div>

        </div>

        <div className="grid">
          {filter.filterCritters(critters).map((critter) => {
            return (
              CritterItem(critter)
            )
          })}
        </div>

      </div>
    </div>
  );
}

//This function returns an HTML item for the critter grid.
//TODO: Separate this to a new file for modularity
function CritterItem(critter) {
  if (filter.critterType === 'bugs')
    var imageName = "/Images/Insects/" + critter.Name + ".png"
  if (filter.critterType === 'fish')
    var imageName = "/Images/Fish/" + critter.Name + ".png"
  if (filter.critterType === 'sea-creatures')
    var imageName = "/Images/SeaCreatures/" + critter.Name + ".png"
  return (
    //This key attribute on the grid items is ESSENTIAL to let the app know which component is which to allow it to
    //Understand what to rerender and when.
    <div className="grid-item" key={critter.Name+"Item"}>
      <table className="grid-table">
        <tbody>
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
            {bugAndFishRows(critter)}
            <h4>{critter.SpawnCondition}</h4>
            <hr />
            <h4>{critter.Price}<img src="/Images/UI/BellsIcon.png" height="30px" width="30px"></img></h4>
            {setDonatedCheckHTML(critter.Name)}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}

function toggleFilterPane(){
  var filterPane = document.getElementById("filter-pane")
  if(filterPane.style.visibility === "hidden")
    filterPane.style.visibility = "visible"
  else
    filterPane.style.visibility = "hidden"
}

function bugAndFishRows(critter) {
  if (filter.critterType === 'bugs') {
    return (
      <div>
        <h4>{critter.Location}</h4>
        <hr />
        <h4>{critter.Weather}</h4>
        <hr />
      </div>
    )
  }
  if (filter.critterType === 'fish') {
    return (
      <div>
        <h4>{critter.Location}</h4>
        <hr />
        <h4>{critter.Weather}</h4>
        <hr />
        <h4>{critter.Size}</h4>
        <hr />
      </div>
    )
  }
  if (filter.critterType === 'sea-creatures') {
    return (
      <div>
        <h4>{critter.Size}</h4>
        <hr />
        <h4>{critter.Speed}</h4>
        <hr />
      </div>
    )
  }
}

function setDonatedCheckHTML(critterName) {
  if (filter.collectedArray.includes(critterName))
    return (<h4>Donated <input type="checkbox" id={critterName + "CB"} onClick={() => filter.pressDonatedCheckbox(critterName)} defaultChecked /></h4>)
  else
    return (<h4>Donated <input type="checkbox" id={critterName + "CB"} onClick={() => filter.pressDonatedCheckbox(critterName)} /></h4>)
}

export default CritterGrid;