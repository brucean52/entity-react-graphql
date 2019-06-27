import React from 'react';
import { Switch } from 'react-router'
import { Route, Link } from 'react-router-dom';
import Button from 'antd/lib/button';
import Home from './pages/Home';
import EntityDetail from './pages/Entity-Detail';
import DiagramComponent from './pages/Diagram';
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
            <Link to="/diagram">Diagram</Link>
          </li>
        </ul>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/entities/:title" component={EntityDetail}/>
        <Route path="/diagram" exact component={DiagramComponent} />
      </Switch>
    </div>
  );
}

export default App;
