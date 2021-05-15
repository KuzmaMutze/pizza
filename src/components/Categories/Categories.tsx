import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../../redux/filter-reducer';

type PropsType = {
  items: Array<string>;
};
export const Categories: React.FC<PropsType> = ({ items }) => {
  let [isActive, setActive] = useState(0);
  let dispatch = useDispatch();

  let toggleCategories = (index: number) => {
    setActive(index);
    dispatch(setFilter(index));
  };

  return (
    <div className="categories">
      <ul>
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
