import React from 'react';
import './Header.css';
import { TiWeatherPartlySunny } from 'react-icons/ti';

function Header() {
  return (
    <div className="container">
      <div className="header">
        <h1 className="header-title">
          <TiWeatherPartlySunny />
          ClimaSphere Weather App
        </h1>
      </div>
    </div>
  );
}

export default Header;
