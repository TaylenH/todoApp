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

//ToDo: Fix formatting issues with ToDos. attempt to use css flexbox
//ToDo: Find and replace all spelling errors in ui
// ToDo is ToDo and Pomodoro is Pomodoro
//ToDo: Choose colors for ToDo items that have high contrast with text color
//ToDo: format Dialogs boxes. ToDoDialog is too large for Cell Phone ViewPorts
//ToDo: Add validation to ToDo name, max character length of 32 characters.
//ToDo: Fix accessability issues with button labels
//ToDo: add documentation comments
//ToDo: move all components to their own folders, write tests using jest and react-testing-library
//ToDo: Write readme.md

//ToDo: ?? attempt to implement the notifications Api ??
