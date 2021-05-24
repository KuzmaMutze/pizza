import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Categories } from '../components/Categories/Categories';
import { LoaderPizzaBlock } from '../components/common/LoaderPizzaBlock';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';
import { SortPopup } from '../components/SortPopup/SortPopup';
import { getPizza } from '../redux/app-reducer';
import { addPizzaToCards } from '../redux/card-reducer';
import { AppStateType } from '../redux/store';
import { PizzaCart, PizzaType } from '../types/type';

type PropsType = {};
export const Home: React.FC<PropsType> = (props) => {
  let dispatch = useDispatch();

  let pizzas = useSelector((state: AppStateType) => state.app.pizzas);
  let cardItem = useSelector((state: AppStateType) => state.card.items);
  let isLoaded = useSelector((state: AppStateType) => state.app.isLoaded);
  let { category, sortBy } = useSelector((state: AppStateType) => state.filter);

  let addPizza = (
    id: number,
    name: string,
    imgURL: string,
    price: number,
    size: number,
    type: string,
  ) => {
    let obj = {
      id,
      name,
      imgURL,
      price,
      size,
      type,
    };
    dispatch(addPizzaToCards(obj));
  };

  useEffect(() => {
    dispatch(getPizza(category, sortBy));
    console.log(category, sortBy);
  }, [category, sortBy]);

  let [burger, setBurger] = useState(false);

  return (
    <div className="container">
      <div className=" burger" onClick={() => setBurger(!burger)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={`content__top ${burger ? 'burgerActive' : ''}`}>
        <Categories
          items={['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']}></Categories>
        <SortPopup
          items={[
            { name: 'популярности', type: 'popular' },
            { name: 'цене', type: 'price' },
            { name: 'алфавит', type: 'name' },
          ]}></SortPopup>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {!isLoaded ? (
        <div className="content__items">
          {pizzas.map((pizza: PizzaType) => (
            <PizzaBlock
              inCartCount={cardItem[pizza.id] && cardItem[pizza.id].items.length}
              onClickAddPizza={addPizza}
              pizza={pizza}
            />
          ))}
        </div>
      ) : (
        <div className="content__items">
          {Array(10)
            .fill(0)
            .map((_, index) => (
              <LoaderPizzaBlock key={index} />
            ))}
        </div>
      )}
    </div>
  );
};
