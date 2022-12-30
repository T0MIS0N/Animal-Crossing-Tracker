import React, { useState, useEffect } from "react";
import "./critter-grid.css";
import Filter from "../services/filter";
import CritterItem from "./critter-item";
import FilterSettings from "./filter-settings";
//import CritterDataService from "../services/critter.js";
//import { Link } from "react-router-dom";

//TODO: Organize code to keep bits that utilize our filter together and limit any interacting parts as much as possible.

var filter = new Filter(false, false, false, false, false, false, false, "bugs", []);
var critterItem = new CritterItem(filter);
var filterSettings = new FilterSettings(filter);

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

    bugsData.then(res => {
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

    fishData.then(res => {
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

    diveData.then(res => {
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
            <button onClick={() => filter.changeCritterType("bugs")}><img src="/Images/UI/BugIcon.png" alt=""></img></button>
            <button onClick={() => filter.changeCritterType("fish")}><img src="/Images/UI/FishIcon.png" alt=""></img></button>
            <button onClick={() => filter.changeCritterType("sea-creatures")}><img src="/Images/UI/DiveIcon.png" alt=""></img></button>
          </div>
          {filterSettings.filterPane()}
        </div>
        <div className="grid">
          {filter.filterCritters(critters).map((critter) => {
            return (
              critterItem.critterCard(critter)
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default CritterGrid;