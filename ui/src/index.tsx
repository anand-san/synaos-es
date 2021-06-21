import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import {routes, RouteProps} from "./routes"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        {routes.map((el: RouteProps) => <Route key={el.name} exact={el.path==="/"} path={el.path} component={el.component} />)}
        <Redirect from="*" to="/error" />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
