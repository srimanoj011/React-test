import React from 'react';
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

import { ConnectedRouter as Router } from "connected-react-router"
import { Switch, Route, Redirect } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"
import './App.css';
import store, { history, persistor } from './store';
import Products from "./components/products/Products"
import Login from "./components/login/login"

/**
 * Handled basic validations
 */


function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={Login} />
        <ProtectedRoute path="/products" component={Products} />
        <Route
          path="/"
          exact
          render={props => <Redirect to="/products" {...props} />}
        />
      </Switch>
    </Router>
  );
}


class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    )
  }
}

export default App;
