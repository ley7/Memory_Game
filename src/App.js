import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './App.css';

import SingleEasy from './SingleEasy';
import SingleHard from './SingleHard';
import twoPlayer from './TwoPlayer';
import Dashboard from './Dashboard';

class App extends Component { 
  render() {
    return (
      <BrowserRouter>
			<div>
				<Switch>
          <Route path='/singleEasy' component={SingleEasy}></Route>
          <Route path='/singleHard' component={SingleHard}></Route>
          <Route path='/twoPlayer' component={twoPlayer}></Route>
          <Route component={Dashboard}></Route>
				</Switch>
			</div>
		</BrowserRouter>
    )
  }
}

export default App;
