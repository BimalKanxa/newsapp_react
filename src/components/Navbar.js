// import PropTypes from 'prop-types'
import React, { Component } from 'react'
import './Navbar.css'

export class Navbar extends Component {
//   static propTypes = {}

  render() {
    return (
      <nav className="navbar">
    
      <div className="logo">The News Hub</div>
  
      <ul className="nav-links">
  
        
        <input type="checkbox" id="checkbox_toggle" />
        <label htmlFor="checkbox_toggle" className="hamburger">&#9776;</label>
  
       
        <div className="menu">
  
          <li><a href="/">Home</a></li>
          <li><a href="/">About</a></li>
  
          <li className="services">
            <a href="/">Categories</a>
  
          
            <ul className="dropdown">
              <li><a href="/">Dropdown 1 </a></li>
              <li><a href="/">Dropdown 2</a></li>
              <li><a href="/">Dropdown 2</a></li>
              <li><a href="/">Dropdown 3</a></li>
              <li><a href="/">Dropdown 4</a></li>
            </ul>
  
          </li>
  
          <li><a href="/">Top Deals</a></li>
          <li><a href="/">Contact</a></li>
        </div>
      </ul>
    </nav>
    
    )
  }
}

export default Navbar