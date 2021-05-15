import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Categories } from '../components/Categories/Categories';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';
import { SortPopup } from '../components/SortPopup/SortPopup';
import { setFilter } from '../redux/filter-reducer';
import { AppStateType } from '../redux/store';
import { PizzaCart, PizzaType } from '../types/type';

type PropsType = {};
export const Home: React.FC<PropsType> = (props) => {
  let dispatch = useDispatch();

  let pizzas = useSelector((state: AppStateType) => state.app.pizzas);

  let addPizza = (pizza: PizzaCart) => {
    console.log(pizza);
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          items={['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']}></Categories>
        <SortPopup
          items={[
            { name: 'популярности', type: 'popular' },
            { name: 'цене', type: 'price' },
            { name: 'алфавит', type: 'alphabet' },
          ]}></SortPopup>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {pizzas.map((pizza: PizzaType) => (
          <PizzaBlock onClickAddPizza={addPizza} pizza={pizza} />
        ))}
      </div>
    </div>
  );
};
