import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import SignUp from './components/pages/SignUp'
import UserPage from './components/pages/user/UserPage'
  import UserEdit from './components/pages/user/UserEdit'
import OwnerPage from './components/pages/owner/OwnerPage'
  import OwnerEdit from './components/pages/owner/OwnerEdit'
import './App.scss';
import Admin from './components/pages/Admin'
import { AuthProvider} from './Auth'
import PrivateRoute from './PrivateRoute'


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
              <Route path="/ownerpage" component={OwnerPage} />
                <Route path="/owneredit" component={OwnerEdit} />
              </Switch>
            <Footer />
          </Router>
        </AuthProvider>
      </div>
  );
}

export default App;
