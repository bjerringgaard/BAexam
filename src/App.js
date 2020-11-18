import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import SignUp from './components/pages/SignUp'
import UserPage from './components/pages/user/UserPage'
  import UserEdit from './components/pages/user/UserEdit'
import CompanyPage from './components/pages/company/CompanyPage'
import About from './components/pages/About'
import './App.scss';
import Admin from './components/pages/Admin'
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
              <Route path="/" exact component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={SignUp} />
              <PrivateRoute path="/admin" component={Admin} />
              <Route path="/userpage" component={UserPage} />
                <Route path="/useredit" component={UserEdit} />
              <Route path="/testpage" component={TestingFirebase} />
              <Route path="/company/:companyID" component={CompanyPage} />
              <Route path="/about" component={About}/>
              </Switch>
            <Footer />
          </Router>
        </AuthProvider>
      </div>
  );
}

export default App;
