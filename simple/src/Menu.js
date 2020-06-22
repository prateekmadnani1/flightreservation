

import React from 'react';
//import './Menu.css';

import { Link } from 'react-router-dom';

const Menu = () =>{

 return(
  <div>
   <nav className="navstyle">
    <ul>
       <li> <Link to="">  Home </Link> </li>
       <li> <Link to="About"> About </Link> </li>
       <li> <Link to="Contact"> Contact  </Link> </li>
    </ul>
   </nav>
  </div>
 )

} 

export default Menu;