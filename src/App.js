import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import UserPage from './components/pages/user/UserPage'
import OwnerPage from './components/pages/owner/OwnerPage'
import './App.scss';
import Admin from './components/pages/Admin'


function App() {
  return (
      <div className="grid-container">
          <Router>
            <Header />
              <Switch>  
              <Route path="/" exact component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/admin" component={Admin} />
              <Route path="/userpage" component={UserPage} />
              <Route path="/ownerpage" component={OwnerPage} />
              </Switch>
            <Footer />
          </Router>
      </div>
  );
}

export default App;
