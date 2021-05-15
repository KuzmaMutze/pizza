import React, { useState } from 'react';

type PropsType = {
  items: Array<string>;
};
export const Categories: React.FC<PropsType> = ({ items }) => {
  let [isActive, setActive] = useState(0);

  return (
    <div className="categories">
      <ul>
        {items.map((item, index) => (
          <li
            className={isActive === index ? 'active' : ''}
            onClick={() => setActive(index)}
            key={`${item}_${index}`}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
