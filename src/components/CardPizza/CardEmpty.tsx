import React from 'react';
import { NavLink } from 'react-router-dom';

import cardEmptyImg from '../../assets/img/empty-cart.png';

type PropsType = {};
export const CardEmpty: React.FC<PropsType> = (props) => {
  return (
    <div className="container container--cart">
      <div className="cart cart--empty">
        <h2>Корзина пустая 😕</h2>
        <p>
          Вероятней всего, вы не заказывали ещё пиццу.
          <br />
          Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>
        <img src={cardEmptyImg} alt="Empty cart" />
        <NavLink to="/" className="button button--black">
          Вернуться назад
        </NavLink>
      </div>
    </div>
  );
};
