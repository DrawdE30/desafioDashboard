import React from 'react';
import { Link, NavLink, } from 'react-router-dom';
import GridViewIcon from '@mui/icons-material/GridView';
import ReorderIcon from '@mui/icons-material/Reorder';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const Sidebar = ({ isToggled, handleToggle, }) => {
  return (
    <div id="nav-bar">
      <input id="nav-toggle" type="checkbox"
        checked={isToggled}
        onChange={handleToggle}
      />
      <div id="nav-header">
        <a id="nav-title" href="">
          <svg
            width="100"
            height="30"
            viewBox="0 0 110 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M28.8517 22.5101C33.8779 21.1825 37.5735 16.7376 37.5735 11.4583C37.5735 5.23989 32.4481 0.178564 26.0589 0.00605301V0H7.64995H0L6.34956 7.63688H7.64995V7.6389H25.7781C27.9333 7.66916 29.671 9.36703 29.671 11.4573C29.671 13.5668 27.902 15.2768 25.7197 15.2768H22.8382H12.7002L27.4355 33H37.5724L28.8517 22.5101Z" fill="rgba(255, 255, 255, 1)"></path>
            <path d="M8.53644 32.9974C11.4172 32.9974 13.7526 30.7402 13.7526 27.9557C13.7526 25.1713 11.4172 22.9141 8.53644 22.9141C5.65565 22.9141 3.32031 25.1713 3.32031 27.9557C3.32031 30.7402 5.65565 32.9974 8.53644 32.9974Z" fill="rgba(255, 255, 255, 1)"></path>
          </svg>
        </a>
        <label htmlFor="nav-toggle"><span id="nav-toggle-burger"></span></label>
        <hr />
      </div>
      <div id="nav-content">
        <NavLink to="/">
          <div className="nav-button"><GridViewIcon className='fas' /><span>DASHBOARD</span></div>
        </NavLink>
        <div className="nav-button"><ReorderIcon className='fas' /><span>MY TASK</span></div>
        <NavLink to="/settings">
          <div className="nav-button"><ManageAccountsIcon className='fas' /><span>SETTINGS</span></div>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
