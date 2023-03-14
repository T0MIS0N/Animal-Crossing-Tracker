import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./Style.css";
import CritterGrid from "./components/critters-grid";
import ArtGrid from "./components/art-grid";
import FlowerGrid from "./components/flowers-grid"
import Social from "./components/social";
import Login from "./components/login";
import Settings from "./components/settings";
import About from "./components/about";

function App() {
  return (
    <div className="root">
      <div className="navbar">
        <div className="bar-items"><Link to="critters"><img className="navbar-image" alt="" src="/Images/UI/BugIcon.png"/></Link></div>
        <div className="bar-items"><Link to="art"><img className="navbar-image" alt="" src="/Images/UI/DiveIcon.png"/></Link></div>
        <div className="bar-items"><Link to="flowers"><img className="navbar-image" alt="" src="/Images/UI/FlowerIcon.png"/></Link></div>
        <div className="bar-items"><Link to="about"><img className="navbar-image" alt="" src="/Images/UI/DiveIcon.png"/></Link></div>
      </div>
      <Routes>
        <Route path="critters" element={<CritterGrid/>}/>
        <Route path="art" element={<ArtGrid/>}/>
        <Route path="flowers" element={<FlowerGrid/>}/>
        <Route path="social" element={<Social/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="settings" element={<Settings/>}/>
        <Route path="about" element={<About/>}/>
      </Routes>
    </div>
  );
}

export default App;
