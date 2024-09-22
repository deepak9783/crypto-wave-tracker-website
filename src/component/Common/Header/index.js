import React from "react";
import "./style.css";
import Button from "../Button";
import { NavLink } from "react-router-dom";
import AnchorTemporaryDrawer from "./drawer";

function Header() {
  return (
    <div className='navbar'>
      <h1 className='logo'>
        CrytoWaveTracker <span style={{color:"var(--blue)"}}>.</span>
      </h1>
     <div className='links'>
              <NavLink to="/">
              <p className="link">Home</p>
              </NavLink>
            
               <NavLink to="/Compare">
               <p className="link">Compare</p>
               </NavLink>
            
            <NavLink to="/Watchlist">
            <p className="link">Watchlist</p>
            </NavLink>
       
          <NavLink to="/Dashboard">
          <Button text={"Dashboard"}
            onClick={()=>console.log("btn clicked")}/>
          </NavLink>
           
     </div >
     <div className='mobile-drawer'>
          <AnchorTemporaryDrawer/> 
     </div>
    </div>
  )
}

export default Header;