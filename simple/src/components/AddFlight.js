import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom'
import axios from 'axios';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import './styles.css';
import flight from '../AddAdmin.jpg';

var imag={
    backgroundImage: `url(${flight})`,
    position: "absolute",
    height: "100%",
    width: "100%"
};

class AddFlight extends Component
{
constructor(props) {
    super(props)

    this.state = {
        source: "",
        destination: "",
        departure: "",
        arrival: "",
        fare: "",
        seat:"",
        flightno:"",
        date:"",
        errormsg:""
    }
    this.handleSubmit=this.handleSubmit.bind(this)
}
Flightnohandler = (event) => {
    this.setState({
        flightno: event.target.value
    })
}
Sourcehandler = (event) => {
    this.setState({
        source: event.target.value
    })
}
Datehandler = (event) => {
    this.setState({
        date: event.target.value
    })
}
Destinationhandler = (event) => {
    this.setState({
        destination: event.target.value
    })
}
Arrivalhandler = (event) => {
    this.setState({
        arrival: event.target.value
    })
}
Farehandler = (event) => {
    this.setState({
        fare: event.target.value
    })
}
Seathandler = (event) => {
    this.setState({
        seat: event.target.value
    })
}
Departurehandler = (event) => {
    this.setState({
    departure: event.target.value
    })
}
validate = () => {
    let errorMsg="";
    if((this.state.source===this.state.destination))
    {
        errorMsg='From and to positions cannot be same';
    }
    else
    {
      errorMsg='';
      this.setState({errorMsg});
    }
    if(errorMsg)
    {
        this.setState({errorMsg});
        return false;
    }
    return true;
}
handleSubmit = (event) => {
    // alert(`${this.state.email} Registered Successfully !!!!`)
    this.setState({
        source: "",
        destination: "",
        departure: "",
        arrival: "",
        fare: "",
        seat: "",
        flightno:""
    })
    
    event.preventDefault();
    console.log(this.state);
    const isvalid=this.validate();
    if(isvalid)
    {
    axios.defaults.headers.common['Authorization'] = read_cookie('admin_token');
    axios.post('http://172.26.65.39:1011/flight/addflight',this.state)
    .then(response => {
         console.log(response.data.code)
         if(response.data.code=="200")
         {
             alert(`Flight added successfully`)
             this.props.history.push('/AdminPage');

         }
         else if( response.data.code=="409")
         {
            alert(`Error or flight already exists`)
         }
         this.setState({posts:response.data})
     })
     .catch(error => {
         console.log(error)
     
     })
    }
 }
render() {
    if(read_cookie('admin_token')=='')
    {
        return (
            <div>
                <Redirect to='/AdminLogin' />
            </div>
        )
        
    }
    else
    {
        return (
            <div style={imag}>
            
                <form onSubmit={this.handleSubmit}>
                    <h1><center className="hea">Enter Flight Details</center></h1>
                    <section className="adfli">
                        <br/>
                    <label>&nbsp;&nbsp;&nbsp;&nbsp;Source :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label> <input required type="text" value={this.state.source} onChange={this.Sourcehandler} placeholder="Source..." /><br /><br/>
                    <label>&nbsp;&nbsp;&nbsp;&nbsp;Destination :&nbsp;&nbsp;&nbsp;</label> <input required type="text" value={this.state.destination} onChange={this.Destinationhandler} placeholder="Destination..." /><br /><br/>
                    <center>{this.state.errorMsg ? (
                    <div style={{ color: "red" }}> {this.state.errorMsg} </div>
                  ) : null}
                  </center>
                    <label>&nbsp;&nbsp;&nbsp;&nbsp;Departure :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label> <input required type="time" value={this.state.departure} onChange={this.Departurehandler} placeholder="Departure..." /><br /><br/>
                    <label>&nbsp;&nbsp;&nbsp;&nbsp;Arrival :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label> <input required type="time" value={this.state.arrival} onChange={this.Arrivalhandler} placeholder="Arrival..." /><br /><br/>
                    <label>&nbsp;&nbsp;&nbsp;&nbsp;Date :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                    <input type="date"
                    value={this.state.date}
                    onChange={this.Datehandler}
                    placeholder="Date..."/>
                    <br /><br/>
                    <label>&nbsp;&nbsp;&nbsp;&nbsp;Fare :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label> <input required type="number" min="2000" value={this.state.fare} onChange={this.Farehandler} placeholder="Fare..." /><br /><br/>
                    <label>&nbsp;&nbsp;&nbsp;&nbsp;Seat :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label> <input required type="number" min="0" value={this.state.seat} onChange={this.Seathandler} placeholder="Seat..." /><br /><br/>
                    <label>&nbsp;&nbsp;&nbsp;&nbsp;Flight Number :</label> <input required type="number" min="0" value={this.state.flightno} onChange={this.Flightnohandler} placeholder="Flight number..." /><br /><br/>
                    
                    
                    
                    &nbsp;&nbsp;&nbsp;&nbsp;<input type="submit" value="Submit" />
                    </section>
                </form>
    
            </div>
        )
    }
} 
}
export default AddFlight