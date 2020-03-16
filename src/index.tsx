import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

//TODO: Fix formatting issues with ToDos. attempt to use css flexbox
//TODO: format Dialogs boxes.
//TODO: Add validation to ToDo name, max character length of 32 characters.
//TODO: Fix accessability issues with button labels
//TODO: add documentation comments
//TODO: move all components to their own folders, write tests using jest and react-testing-library
//TODO: Write readme.md

//TODO: ?? attempt to implement the notifications Api ??
