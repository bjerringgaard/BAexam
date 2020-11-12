import React from 'react';
import ExpoItems from '../layout/ExpoItems';
import { Link, Route } from "react-router-dom"
//import { BrowserRouter as Router, Route } from 'react-router-dom';
import firebase from '../../Firebase'
import './Home.scss';
//import HomePage from './components/pages/Home';

function Home () {
  return (
      <div className="grid-x main-area home-component">
          <div className="cell">
          <h1>Home Component</h1>
              <p>Fusce molestie vestibulum ligula id facilisis. Mauris dapibus neque a neque eleifend, ac egestas lectus vestibulum. Praesent id lobortis odio. Donec suscipit massa sed elit consectetur efficitur. Vestibulum suscipit lacinia eros, eu imperdiet ex ultrices eu. Mauris ligula dolor, imperdiet et eleifend quis, viverra ut eros. Fusce ac magna tortor. Nulla quis accumsan tellus, et elementum odio. Cras finibus, turpis eu semper pharetra, justo elit gravida magna, eu convallis velit dui sit amet turpis. Donec posuere tristique sapien ac pulvinar. Pellentesque ut congue nulla. Pellentesque vel interdum sem.</p>
              
          </div>
          <div className="cell">
            
            <ExpoItems />
          </div>
          
      </div>
  );
}

export default Home;
