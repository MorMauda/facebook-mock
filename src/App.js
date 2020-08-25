import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import axios from 'axios';

import Login from './Component/Login';
import ProfilePage from "./Component/ProfilePage";
import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import { getToken, removeUserSession, setUserSession } from './Utils/Common';





function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios.get(`http://localhost:4000/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  return (
      <div className="App">
        <BrowserRouter>
          <div>
            <div className="header">
              <NavLink activeClassName="active" to="/login"></NavLink><small>(Access with token only)</small>
            </div>
            <div className="content">
              <Switch>
                <Route exact path="/" component={Login} />
                <PublicRoute path="/login" component={Login} />
                <PrivateRoute path="/profilePage" component={ProfilePage} />


              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </div>
  );
}

export default App;