import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Login from './components/pages/Login'
import SignUp from './components/pages/SignUp'
import UserPage from './components/pages/user/UserPage'
import CompanyPage from './components/pages/company/CompanyPage'

import './App.scss';
import Admin from './components/pages/admin/Admin'
import { AuthProvider} from './Auth'
import PrivateRoute from './PrivateRoute'
import TestingFirebase from './components/pages/TestingFirebase';


function App() {
  return (
      <div className="grid-container">
       {/* GIVER ADGANG TIL OM BRUGEREN ER LOGGET IND ELLER EJ VED BRUG AF CONTEXT API */}
        <AuthProvider>
          <Router>
            <Header />
              <Switch>  
              <Route path="/" exact component={Login} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
              <PrivateRoute path="/admin" component={Admin} />
              <PrivateRoute path="/userpage" component={UserPage} />
              <Route path="/testpage" component={TestingFirebase} />
              <Route path="/company/:companyID" component={CompanyPage} />
              </Switch>
            <Footer />
          </Router>
        </AuthProvider>
      </div>
  );
}

export default App;
