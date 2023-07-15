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


          <div className="menu" >

            <li><a href="/">Home</a></li>
            <li><a href="/">About</a></li>
            <li className="services"><a href="/">Business</a></li>
            <li className="services"><a href="/">Entertainment</a></li>
            <li className="services"><a href="/">General</a></li>
            <li className="services"><a href="/">Health</a></li>
            <li className="services"><a href="/">Science</a></li>
            <li className="services"><a href="/">Sports</a></li>
            <li className="services"><a href="/">Technology</a>
            </li>

          </div>
        </ul>
      </nav>

    )
  }
}

export default Navbar