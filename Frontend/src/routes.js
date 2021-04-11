import React from 'react'
import {Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Contacts from './containers/Contacts';
import Contact from './containers/Contact';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Contacts} />
    <Route path="/:id" component={Contact} />
  </Route>
)
