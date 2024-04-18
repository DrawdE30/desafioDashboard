import React, { useState, } from 'react';
import { Route, Routes, } from "react-router-dom";
import './styles/style.css';
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import Sidebar from './components/Frame/SideBar';


function App() {
  const [isToggled, setIsToggled] = useState(false);
  const handleToggle = () => setIsToggled(!isToggled);
  return (
    <div>
      <Sidebar isToggled={isToggled} handleToggle={handleToggle} />
      <div className={`body-content ${isToggled ? 'toggled' : ''}`}>
        <BodyWeb />
      </div>
    </div>
  );
}

function BodyWeb({ }) {
  const pathInit = null;
  return (
    <div style={{ height: "100%", }}>
      <Routes>
        <Route path={`${(pathInit || '/')}`} element={<Dashboard />}></Route>
        <Route path={`${(pathInit || '/settings')}`} element={<Settings />}></Route>
        <Route path="*" element={<NotFound pathInit={pathInit} />} />
      </Routes>
    </div>
  )
}

export default App;