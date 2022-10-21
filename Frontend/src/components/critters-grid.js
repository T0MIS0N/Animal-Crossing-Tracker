import React, { useState, useEffect } from "react";
import "../Style.css";
import CritterDataService from "../services/critter.js";
import { Link } from "react-router-dom";

const CritterGrid = props => {

  const [critters, setCritters] = useState([]);

  //TODO: Understand this hook
  useEffect(() => {
    retrieveBugs();
  });

  //TODO: Understand what this does
  const retrieveBugs = () => {
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

  //This is the page HTML returned
  return (
    <div className="content">
      <div className="critter-table">
        <div className="grid">
          {filterCritters(critters).map((critter) => {
            return (
              CritterItem(critter)
            )
          })}
        </div>
        <div className="filter-pane">
          <h3>Filter</h3>
          <h4>Not Donated<input id="donated" type="checkbox"/></h4>
          <h4>Available Today<input id="today" type="checkbox"/></h4>
          <h4>Available Right Now<input id="right-now" type="checkbox"/></h4>
          <h4>Location</h4>
          <h4>Weather</h4>
          <h4>Spawn Condition</h4>
          <h4>Price</h4>
          <hr></hr>
          <h3>Sort</h3>
          <h4>Alphabetical</h4>
          <h4>Price</h4>
          <h5>Lowest to Highest</h5>
          <h5>Highest to Lowest</h5>
        </div>
      </div>
    </div>
  );
}

//This function returns an HTML item for the critter grid.
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

function filterCritters(critterArray){
  if(document.readyState === "complete" && document.getElementById("today").checked)//TODO: Find best practices for javascript/react when one needs to call elements before they're rendered in HTML
    {
    var filteredArray = new Array
    critterArray.map((critter) => {
      if(isCritterActiveToday(critter, true))
        filteredArray.push(critter)
    })
      return filteredArray
    }else{
      return critterArray
    }
}

function isCritterActiveToday(critter, isNorthIsland){
  //First, we set the date based on island type since there are different dates for hemispheres
  var critterDate = critter.NorthMonths
  if(!isNorthIsland)
    critterDate = critter.SouthMonths
  //If our critter's date is all year, it means it's going to be active today, so we can return true now without any other checks
  if(critterDate === "All year"){
    return true
  }
  //If the critter has a date range, we need the current date to see if it's active. These 2 variables hold the current date
  var currentDate = new Date()
  var currentMonth = currentDate.getMonth()
  //Some dates have the ; character which means there's two date sets. In this case, we must check both, but otherwise only need to check one
  if(critterDate.includes(';')){
    //The date string is split at ';' so both dates can be checked
    var dateArray = critterDate.split(';')
    //If the current date is in either range, the function returns true as that critter is active today.
    if(isDateInRange(dateArray[0], currentMonth) || isDateInRange(dateArray[1], currentMonth))
      return true
  }else{
    //If there's one date, we simply check that one and if the current date is in that range, the function returns true.
    if(isDateInRange(critterDate,currentMonth))
    return true
  }
  return false
}

//This function checks a date range and singular months to see if the current date is in that range or equal to the singular month. If true is returned, the critter is active today.
function isDateInRange(critterDate, currentMonth){
  //If critter date contains '-' then it means it's a date range and two values need to be checked to see if the current date falls in the range.
  if(critterDate.includes('–')){
    //The date string is split into an array to allow the checking of both months in the range as numbers.
    var dateArray = critterDate.split('–')
    //Using the date array data, the months are converted to number values to allow checking them against the current date.
    var dateNumArray = [monthToNum(dateArray[0]),monthToNum(dateArray[1])]
    //TODO: Find a good way to comment our methodology is these if conditions.
    if(dateNumArray[0] < dateNumArray[1]){
      if(currentMonth <= dateNumArray[1] && currentMonth >= dateNumArray[0])
        return true
    }
    if(dateNumArray[0] > dateNumArray[1]){
      if(currentMonth >= dateNumArray[0] || currentMonth <= dateNumArray[1])
      return true
    }
  }
  //If critter date doesn't contain '-' then it means the date is a single month, so the date is converted to a number and checked against the current date
  else{
    //If the month is equal to the current month, the critter is active today
    if(monthToNum(critterDate) === currentMonth)
      return true
  }
  //If true is never returned in this function, the critter isn't active today and false is returned.
  return false
}

//This function returns numbers based on month abbreviation. Ex: Jan returns 0, Dec returns 11
function monthToNum(monthStr){
  //If the month string has white spaces, it is stripped out to prevent errors in this function.
  if(monthStr.includes(' '))
    monthStr = monthStr.replace(' ','')
  //This switch statement returns a number representation of a month abreviation string.
  switch(monthStr){
    case "Jan":
      return 0
    case "Feb":
      return 1
    case "Mar":
      return 2
    case "Apr":
      return 3
    case "May":
      return 4
    case "Jun":
      return 5
    case "Jul":
      return 6
    case "Aug":
      return 7
    case "Sep":
      return 8
    case "Oct":
      return 9
    case "Nov":
      return 10
    case "Dec":
      return 11
  }
}

export default CritterGrid;