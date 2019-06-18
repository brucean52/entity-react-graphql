import React from 'react';
import { Switch } from 'react-router'
import { Route, Link } from 'react-router-dom';
import Button from 'antd/lib/button';
import Home from './pages/Home';
import EntityDetail from './pages/Entity-Detail';
import Test from './pages/Test';
import './App.scss';

function App() {
  return (
    <div className="app">
        <ul className="nav">
          <li><h1>Entity Playground</h1></li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/test">GraphQL Test</Link>
          </li>
        </ul>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/entities/:title" component={EntityDetail}/>
        <Route path="/test" exact component={Test} />
      </Switch>
    </div>
  );
}

export default App;
