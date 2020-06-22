import React, { Component } from 'react';
import axios from 'axios';
const prope={
    backgroundColor: '#deb887',
    height: '750px'
  }
class Passengerdetails extends Component
{
constructor(props) {
    super(props)

    this.state = {
        Mail: "",
        Name: "",
        flightno:" "
    }
  }
  Fhandler = (event) => {
    this.setState({
        flightno: event.target.value
    })
}
  Mailhandler = (event) => {
    this.setState({
        Mail: event.target.value
    })
}
Namehandler = (event) => {
    this.setState({
        Name: event.target.value
    })
}
handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    axios.post('https://jsonplaceholder.typicode.com/posts',this.state)
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
            <section style={prope}>
            <form onSubmit={this.handleSubmit}>
                <h1><center>Passenger Details</center></h1>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label>Flight Number :</label> <input type="text" value={this.state.flightno} onChange={this.Fhandler} placeholder="Flight no..." /><br /><br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label>Name :</label> <input type="text" value={this.state.Name} onChange={this.Namehandler} placeholder="Name..." /><br /><br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label>Mail :</label> <input type="text" value={this.state.Mail} onChange={this.Mailhandler} placeholder="Mail..." /><br /><br />
                <input type="submit" value="Submit" /><br />
              </form>
              </section>
          </div>);
  }
}
export default Passengerdetails