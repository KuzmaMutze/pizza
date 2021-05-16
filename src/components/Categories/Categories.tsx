import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCategory } from '../../redux/filter-reducer';

type PropsType = {
  items: Array<string>;
};
export const Categories: React.FC<PropsType> = ({ items }) => {
  let [isActive, setActive] = useState<null | number>(null);
  let dispatch = useDispatch();

  let toggleCategories = (index: number | null) => {
    setActive(index);
    dispatch(setCategory(index));
  };

  return (
    <div className="categories">
      <ul>
        <li onClick={() => toggleCategories(null)} className={isActive == null ? 'active' : ''}>
          Все
        </li>
        {items.map((item, index) => (
          <li
            className={isActive === index ? 'active' : ''}
            onClick={() => toggleCategories(index)}
            key={`${item}_${index}`}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
