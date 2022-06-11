import React from "react";
import { Outlet, Link } from "react-router-dom";

function Navbar() {
	return (
		<div className="navContainer">
			<nav id="navabar">
			<Link to="/"><img src="snaggl_logo_v2.svg" alt="" id="logo"/></Link>
			</nav>
			<div className="line"></div> 
			<Outlet />
		</div>
	);
}

export default Navbar;