import React from 'react';
import './App.css';
import LoginForm from './Components/Autirization';
import  Profile from './Components/Profile';
import  Home from './Components/Home';
import IOT from './Components/IOT';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Registration from "./Components/Registration";

class App extends React.Component{
    render() {
        return(
            <Router>
        <div className="App">
        <Route path="/" exact component={LoginForm}/>
        <Route path="/registration" exact component={Registration}/>
        <Route path="/home" exact component={Home}/>
        <Route path="/iot" exact component={IOT}/>
        </div>
            </Router>
    );
    }
}

export default App;
