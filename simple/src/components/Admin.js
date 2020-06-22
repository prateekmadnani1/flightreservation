import React, { Component } from 'react';
import axios from 'axios';
class Admin extends Component
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
        flightno:""
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
handleSubmit = (event) => {
    alert(`${this.state.email} Registered Successfully !!!!`)
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
    axios.post('http://172.26.65.39:1010/addflight',this.state)
    .then(response => {
         console.log(response)
         this.setState({posts:response.data})
     })
     .catch(error => {
         console.log(error)
         //this.setState({errorMsg:'error in retrieving data'})
     
     })
 }
render() {
    return (
        <div>

            <form onSubmit={this.handleSubmit}>
                <h1><center>Admin page</center></h1>
                <label>Source :</label> <input type="text" value={this.state.source} onChange={this.Sourcehandler} placeholder="Source..." /><br /><br/>
                <label>Destination :</label> <input type="text" value={this.state.destination} onChange={this.Destinationhandler} placeholder="Destination..." /><br /><br/>
                <label>Departure :</label> <input type="text" value={this.state.departure} onChange={this.Departurehandler} placeholder="Departure..." /><br /><br/>
                <label>Arrival :</label> <input type="text" value={this.state.arrival} onChange={this.Arrivalhandler} placeholder="Arrival..." /><br /><br/>
                <label>Fare :</label> <input type="text" value={this.state.fare} onChange={this.Farehandler} placeholder="Fare..." /><br /><br/>
                <label>Seat :</label> <input type="text" value={this.state.seat} onChange={this.Seathandler} placeholder="Seat..." /><br /><br/>
                <label>Flight Number :</label> <input type="text" value={this.state.flightno} onChange={this.Flightnohandler} placeholder="Flight number..." /><br /><br/>
                
                
                <input type="submit" value="Submit" />
            </form>

        </div>
        
    )
} 
}
export default Admin