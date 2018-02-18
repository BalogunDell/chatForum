import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Import assets=
import './assets/js/fetcher';
import './assets/css/style';

// Import components

import Home from './components/presentationalComponents/Home';
import Authentication from './components/containerComponents/Authentication';
import ChatComponent from './components/containerComponents/ChatComponent';
/**
 * 
 * @class App
 * 
 * @description Main entry point of the app
 * 
 * @extends {React.Component}
 */
class App extends React.Component {
  render() {
    return(
      <div>
        <BrowserRouter>
          <Switch> 
            <Route path= "/" exact component={Home}/>
            <Route path= "/home" exact component={Home}/>
            <Route path= "/login" exact component={Authentication}/>
            <Route path= "/register" exact component={Authentication}/>
            <Route path= "/chat" exact component={ChatComponent}/>
            <Route path ="*" render={() => 
              <h4>Page does not exist</h4>
            }/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
render(
  <App/>,
  document.getElementById('root')
);