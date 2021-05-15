import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Categories } from '../components/Categories/Categories';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';
import { SortPopup } from '../components/SortPopup/SortPopup';
import { getPizza } from '../redux/app-reducer';
import { AppStateType } from '../redux/store';

type PropsType = {};
export const Home: React.FC<PropsType> = (props) => {
  let dispatch = useDispatch();

  let pizzas = useSelector((state: AppStateType) => state.app.pizzas);

  useEffect(() => {
    dispatch(getPizza());
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          items={['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']}></Categories>
        <SortPopup items={['популярности', 'цене', 'алфавиту']}></SortPopup>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {pizzas.map((pizza) => (
          <PizzaBlock pizza={pizza} />
        ))}
      </div>
    </div>
  );
};
