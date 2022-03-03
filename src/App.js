import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Home from "./components";
import { ToastContainer } from 'react-toastify';
import { Provider } from "react-redux";
import AddMaintenance from './components/AddMaintenance';
import store from "./redux/store";

import 'react-toastify/dist/ReactToastify.css';

const Routing = () => {
  return (
    <React.Fragment>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
            <Route exact path="/">
          {
            localStorage.getItem("token") ? <Home /> :<Redirect to="/login" /> 
          }
          </Route> : 
          <Route path="/add-maintenance">
            <AddMaintenance />
          </Route>
        </Switch>
    </React.Fragment>
  )
}


function App() {
  return (
    <React.Fragment>
      <Provider store={store}>
        <BrowserRouter>
          <Routing/>
        </BrowserRouter>
      </Provider>
          <ToastContainer />
    </React.Fragment>
  );
}

export default App;