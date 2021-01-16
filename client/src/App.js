import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

import Navbar from './components/layouts/Navbar';
import Home from './components/pages/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/routing/PrivateRoute';

import { Provider } from 'react-redux';
import store from './store';
// Utility
import setAuthToken from './utils/setAuthToken';

import './App.css';

// if (localStorage.token) {
//   setAuthToken(localStorage.token);
// }

function App() {
  // useEffect instead of addEventListener to init materialize since useEffect runs automatic
  useEffect(() => {
    // Init Materialize JS so I can use modals
    M.AutoInit();
  });

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <div className='container'>
            <Switch>
              <PrivateRoute exact path='/' component={Home} />
              {/* <Route exact path='/' component={Home} /> */}
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
