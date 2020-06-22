import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
const prope={
    backgroundColor: '#deb887',
    height: '750px'
  }
class FlightDetails extends Component
{ 
constructor(props) 
{
    super(props)

    this.state = 
    {
       
        posts: [],
        errorMsg:''
         
    
    }
    //this.handleSubmit=this.handleSubmit.bind(this)
  }
  componentDidMount()
  {
      axios.get('http://172.26.65.39:1010/findall')
      .then(response => {
          console.log(response)
          this.setState({posts:response.data})
      })
      .catch(error => {
          console.log(error)
          this.setState({errorMsg:'error in retrieving data'})
          
      })
      
  }
  render() {
      const {posts,errorMsg}=this.state;
    return (
        <div>
            <section style={prope}>
            
                {posts.map(post=> 
                    <div><div key={post.id}>
                        <div>Company name : {post.company} <br/>| Departure time : {post.departure} <br/>| Arrival time : {post.arrival} <br/>| Duration : {post.duration} <br/>| Fare : {post.fare} <br/>| Flight Number : {post.flightno} <br/>| From : {post.from} <br/>| To : {post.to} <br/></div>
                    </div>
                    
                    </div>)}               
            
            <input type="button" value="book" />
                
            {errorMsg ? <div>{errorMsg}</div>:null}
            </section>
        </div>
    )
  }
}

export default FlightDetails