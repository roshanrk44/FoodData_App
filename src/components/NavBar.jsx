import React,{ useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Body from "./Body.jsx"
import "./NavBar.css"
import Input from './Input.jsx';
export default function NavBar() {
    
   
  return (
    <div>
        <nav>
            <Link to="./"><div><img src='https://img.icons8.com/?size=100&id=84005&format=png&color=FFFFFF' width="30px" height="30px"/>
            <h2>Home</h2> </div></Link>    
        </nav>   
    </div>
  )
}
