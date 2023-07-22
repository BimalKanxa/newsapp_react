import './App.css';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'


import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';


// import NewsItem from './components/NewsItem';


const App = () => {

  let pageSize = 11

  let apiKey = process.env.REACT_APP_NEWS_API
 
 const [progress,   setProgress] = useState(10)

    return (
      
      <div>
      <Router>
        
          <Navbar/>
          <LoadingBar
        color='#f11946'
        progress={ progress}
        height='3px'
       
        />
          <Routes>
            <Route exact path='/' element={<News   setProgress={ setProgress} apiKey={ apiKey}  key='general'  pageSize={ pageSize} country='in' category='general' />} />

            <Route exact path='/business' element={<News   setProgress={ setProgress} apiKey={ apiKey}   key='business' pageSize={ pageSize} country='in' category='business' />} />

            <Route exact path='/entertainment' element={<News   setProgress={   setProgress} apiKey={ apiKey}  key='entertainment'  pageSize={ pageSize} country='in' category='entertainment' />} /> 

            <Route exact path='/health'  element={<News   setProgress={   setProgress} apiKey={ apiKey}  key='health' pageSize={ pageSize} country='in' category='health' />} />

            <Route exact path='/science' element={<News   setProgress={   setProgress} apiKey={ apiKey}  key='science' pageSize={ pageSize} country='in' category='science' />} />

            <Route exact path='/sports'  element={<News   setProgress={   setProgress} apiKey={ apiKey}  key='sports' pageSize={ pageSize} country='in' category='sports' />} />

            <Route exact path='/technology' element={<News   setProgress={   setProgress} apiKey={ apiKey}  key='technology' pageSize={ pageSize} country='in' category='technology' />} />
          </Routes>

          </Router>
      </div>
          
    )
  }

export default App;

  

