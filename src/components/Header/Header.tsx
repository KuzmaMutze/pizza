import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from './../../assets/img/pizza-logo.svg';
import { ButtonCard } from './ButtonCard';

type PropsType = {};
export const Header: React.FC<PropsType> = (props) => {
  return (
    <NavLink to="/">
      <div className="header">
        <div className="container">
          <div className="header__logo">
            <img width="38" src={logo} alt="Pizza logo" />
            <div>
              <h1>Pizza</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>
          <ButtonCard></ButtonCard>
        </div>
      </div>
    </NavLink>
  );
};
