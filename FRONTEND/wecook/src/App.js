import React from 'react';
import './App.css';

import Header from './Components/otherUI/Header';
import Login from './Components/user/Login';
import Routing from './router/Routing';
import Banner from './Components/otherUI/Banner';


function App() {
  return (
    <div>
      <Header/>
      <Banner/>
      <Routing/>
    </div>

  );
}

export default App;
