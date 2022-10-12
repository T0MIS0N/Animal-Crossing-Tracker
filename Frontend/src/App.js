import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./Style.css";
import CritterGrid from "./components/critters-grid";
import FlowerGrid from "./components/flowers-grid"
import Social from "./components/social";
import Login from "./components/login";
import Settings from "./components/settings";

function App() {
  return (
    <div className="root">
      <div className="navbar">
        <div className="bar-items"><Link to="critters">Critters</Link></div>
        <div className="bar-items"><Link to="flowers">Flowers</Link></div>
        <div className="bar-items"><Link to ="social">Social</Link></div>
        <div className="bar-items"><Link to ="login">Login</Link></div>
        <div className="bar-items"><Link to ="settings">Settings</Link></div>
      </div>
      <Routes>
        <Route path="critters" element={<CritterGrid/>}/>
        <Route path="flowers" element={<FlowerGrid/>}/>
        <Route path="social" element={<Social/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="settings" element={<Settings/>}/>
      </Routes>
    </div>
  );
}

export default App;
