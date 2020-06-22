import React, { Component } from 'react';
import axios from 'axios';
import { withRouter, Redirect,Link } from 'react-router-dom'
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import './styles.css';
import flight from '../AddAdmin.jpg';

var imag={
    backgroundImage: `url(${flight})`,
    position: "absolute",
    height: "100%",
    width: "100%",
    overflow: "scroll"
};

class AdminPage extends Component
{
constructor(props) {
    super(props)

    this.state = {
        // remove:"false",
        // val: 0,
    //     destination: "",
    //     departure: "",
    //     arrival: "",
    //     fare: "",
    //     seat:"",
        flightno:"",
        doShow:"true",
        posts:[]
     }
    // this.handleSubmit=this.handleSubmit.bind(this)
}
addFlight = () => {
    console.log("Button clicked...")
    this.props.history.push('/AddFlight')
    
}

flightnoHandler = (event) => {
    this.setState({
        flightno: event.target.value
    })
}

show = (event) => {
    this.setState({
        flightno: event.target.value
    })
    console.log("Show")
    axios.defaults.headers.common['Authorization'] = read_cookie('admin_token');
    axios.get('http://172.26.65.39:1011/flight/findall')
   .then(response => {
        console.log(response)
        console.log(this.state.flightno)
        this.setState({posts:response.data.body})
        if(response.data.code=="200")
        {
            this.state.doShow="true"
            // alert(response.data.body)
        }
        else if(response.data.code=="403")
        {
            alert(response.data.body)
        }
        // this.setState({posts:response.data})


    })
    .catch(error => {
        console.log(error)
        //this.setState({errorMsg:'error in retrieving data'})
    
    })
}


removeFlight = () => {
    console.log("Button clicked...")
    axios.defaults.headers.common['Authorization'] = read_cookie('admin_token');
    axios.post('http://172.26.65.39:1011/flight/removeflight',this.state)
   .then(response => {
        console.log(response)
        console.log(this.state.flightno)
        if(response.data.code=="200")
        {
            alert(response.data.body)
        }
        else if(response.data.code=="412")
        {
            alert(response.data.body)
        }
        else if(response.data.code=="405")
        {
            alert(response.data.body)
        }
        // this.setState({posts:response.data})


    })
    .catch(error => {
        console.log(error)
        //this.setState({errorMsg:'error in retrieving data'})
    
    })
      
    
    // this.props.history.push('/removeFlight')
}

logout = () => {
    console.log("Button clicked...")
    delete_cookie('admin_token');
    this.props.history.push('/AdminLogin')
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
        const {source,destination,date,errorMsg,posts,from,to}=this.state;
        if(this.state.doShow=="true")
        {
            return (
                // <section className="adp">
                <div style={imag}>
                    <br/>
                    <br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<button onClick={this.addFlight.bind(this)}>Add Flight</button>
                <br/><br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<button onClick={this.removeFlight.bind(this)}>Remove Flight&nbsp;&nbsp;&nbsp;</button>
                {/* <input value={this.state.flightno}></input> */}
                &nbsp;&nbsp;&nbsp;<input type="text" value={this.state.flightno} onChange={this.flightnoHandler} placeholder="Enter Flight No to be deleted" />
                <br/><br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<button onClick={this.show.bind(this)}>Show all Flights</button>
                <br/><br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<button className="sbut" onClick={this.logout.bind(this)}>Logout</button>
                <Link to={"/Addadmin"}><input type="button" value="Add Admin" /></Link>
                <br/><br/><br/>
                 
                  {posts.map(post=> 
                  <ul >
                      <div className="show2"><li key={post.flightno}>
                          <div>&nbsp;Flight Number : {post.flightno} | Date : {post.date} | Source : {post.source} | Destination : {post.destination} | Departure time : {post.departure} | Arrival time : {post.arrival} | Fare : {post.fare}<br/></div>
                      </li>
                      {/* <input type="button" value="Select" onClick={() => this.select(post)}/> */}
                      </div>
                      </ul>)}               
              
            </div>
            // </section>
            )
            
        }

        else
        {
            return (
                <div className="adl" style={imag}>
                    <button onClick={this.addFlight.bind(this)}>Add Flight</button>
                    <br></br>
                    <button onClick={this.removeFlight.bind(this)}>Remove Flight</button>
                    {/* <input value={this.state.flightno}></input> */}
                    <input type="text" value={this.state.flightno} onChange={this.flightnoHandler} placeholder="Enter Flight No to be deleted" />
                    <br></br>
                    <button onClick={this.show.bind(this)}>Show all Flights</button>
                    <br></br>
                    <button className="sbut" onClick={this.logout.bind(this)}>Logout</button>
                    <Link to={"/Addadmin"}><input type="button" value="Add Admin" /></Link>
                    
                </div>
                
            )
        }

    }
} 
}
export default withRouter(AdminPage);