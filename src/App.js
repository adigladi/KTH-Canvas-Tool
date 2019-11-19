import React from 'react';
import './App.css';
import Sidebar from './components/sidebar'
import Home from './components/course/home';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Home />
    </div>
  );
}

export default App;
