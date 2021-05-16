import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSortBy } from '../../redux/filter-reducer';
import { SortPopupItem } from '../../types/type';

type PropsType = {
  items: Array<SortPopupItem>;
};

export const SortPopup: React.FC<PropsType> = ({ items }) => {
  let dispatch = useDispatch();
  let sortRef = useRef<HTMLDivElement | null>(null);

  let [isActive, setIsActive] = useState(false);
  let [classActive, setClassActive] = useState(0);

  const activeLable = items[classActive].name;

  let toggleVisiblePopup = (index: number, bool: boolean, type: string) => {
    setClassActive(index);
    setIsActive(bool);
    dispatch(setSortBy(type));
  };

  let handleOutsideClick = (e: any) => {
    if (!e.path.includes(sortRef.current)) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          className={isActive ? 'rotate' : ''}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsActive(!isActive)}>{activeLable}</span>
      </div>
      {isActive && (
        <div className="sort__popup">
          <ul>
            {items.map((item, index) => (
              <li
                onClick={() => toggleVisiblePopup(index, !isActive, item.type)}
                className={index === classActive ? 'active' : ''}
                key={index}>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
