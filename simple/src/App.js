//import React from 'react';
import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import Form from './components/Form';
import Login from './components/Login';
import Passengerdetails from './components/Passengerdetails';
import Selectflight from './components/Selectflight';
import Signup from './components/Signup';
import FlightDetails from './components/FlightDetails';
import Admin from './components/Admin';
import AdminLogin from './components/AdminLogin';
import AdminPage from './components/AdminPage';
import AddFlight from './components/AddFlight';
import PrevBookings from './components/PrevBookings'
import { Link } from 'react-router';
import AddAdmin from './components/AddAdmin';
import ReactDOM from 'react-dom'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
class App extends Component {

        render()
        {
          return(
         <Router>
           <Switch>
             <Route exact path="/" component={Login}/>
             <Route exact path="/form" component={Form}/>
             <Route exact path="/select" component={Selectflight}/>
             <Route exact path="/signup" component={Signup}/>
             <Route exact path="/AdminLogin" component={AdminLogin}/>
             <Route exact path="/AdminPage" component={AdminPage}/>
             <Route exact path="/AddFlight" component={AddFlight}/>
             <Route exact path="/PrevBookings" component={PrevBookings}/>
             <Route exact path="/Addadmin" component={AddAdmin}/>
           </Switch>
         </Router>);
        }
  }
  export default App;
