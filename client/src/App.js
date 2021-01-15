import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

import { Provider } from 'react-redux';

import setAuthToken from './utils/setAuthToken';

import './App.css';

// if (localStorage.token) {
//   setAuthToken(localStorage.token);
// }

function App() {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
          </Switch>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
