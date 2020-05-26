import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css"; //importing bootstrap

import * as V from 'victory';


//importing all the components
import NavigationBar from "./components/topNavBar"; //always use uppercase letters
// import HomePage from "./components/homePage"; //always use uppercase letters

ReactDOM.render(<App />, document.getElementById("root"));
setTimeout(() => {
  ReactDOM.render(<NavigationBar />, document.getElementById("root"));
}, 4000);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
