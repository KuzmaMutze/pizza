import React from 'react';

import './scss/app.scss';
import { Header } from './components/Header/Header';
import { Home } from './pages/Home';
import { Route } from 'react-router-dom';
import { Cart } from './pages/Cart';

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header></Header>
        <div className="content">
          <Route exact path="/" component={Home} />
          <Route exact path="/cart" component={Cart} />
        </div>
      </div>
    </div>
  );
}

export default App;
