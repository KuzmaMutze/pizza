import React from 'react';
import ContentLoader from 'react-content-loader';

export const LoaderPizzaBlock = (props: any) => (
  <ContentLoader
    style={{ margin: '0 30px 0 0' }}
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="18" cy="108" r="3" />
    <circle cx="135" cy="125" r="115" />
    <rect x="-1" y="254" rx="0" ry="0" width="280" height="24" />
    <rect x="1" y="291" rx="6" ry="6" width="280" height="84" />
    <rect x="12" y="393" rx="0" ry="0" width="89" height="27" />
    <rect x="133" y="388" rx="19" ry="19" width="140" height="39" />
  </ContentLoader>
);
