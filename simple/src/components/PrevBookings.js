import React, { Component } from 'react';
import { Link, Redirect } from 'react-router';
import axios from 'axios';
import Form from './Form'; 
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import flight from '../AddAdmin.jpg'; 

const prope={
    backgroundColor: '#deb887',
    height: '750px'
  }

  var imag={
    backgroundImage: `url(${flight})`,
    position: "absolute",
    height: "100%",
    width: "100%",
    overflow: "auto"
  };

  const initialstate = {
    Mail: "",
    Name: "",
    emailerror:"",
    nameerror:"",
    flightno:"",
    flight_id:"",
    posts:[],
    from:'',
    to:'',
    booking_id:"",
    booking_exists:"false",
    prev_book:"false"
    //valid:"failure"
  }
class Selectflight extends Component
{ 
    constructor(props) {
    super(props)

    this.state = {
        Mail: "",
        Name: "",
        emailerror:"",
        nameerror:"",
        flightno:"",
        flight_id:"",
        posts:[],
        from:'',
        to:'',
        booking_id:"",
        booking_exists:"false",
        prev_book:""
        //valid:"failure"
    }
  }
  delete(book)
  {
    const cookie_key = 'token';
     var query = 'http://172.26.65.39:1011/booking/cancelbooking'; //showflight?source='+this.state.source+'&destination='+this.state.destination;
     axios.defaults.headers.common['Authorization'] = read_cookie(cookie_key);
     console.log(read_cookie(cookie_key))
     this.state.booking_id=book
     axios.post(query,this.state)
     .then(response => {
          console.log(response)
          // this.setState({posts:response.data.body})
          if(response.data.code==200)
          {
            
             alert(`cancelled`)
             this.props.history.push("/form")
          }
          else if(response.data.code==403)
          {
             alert(`error`)
            //  this.props.history.push("/")
          }
 
      })
      .catch(error => {
          console.log(error)
          this.setState({errorMsg:'error in retrieving data'})
        //   this.setState({errorMsg:'error in retrieving data'})
      
      })
  }

  load()
  {
    console.log(this.state);
    //  this.setState(initialstate);
     const cookie_key = 'token';
     var query = 'http://172.26.65.39:1011/booking/previousbooking'; //showflight?source='+this.state.source+'&destination='+this.state.destination;
     axios.defaults.headers.common['Authorization'] = read_cookie(cookie_key);
     console.log(read_cookie(cookie_key))
     axios.get(query)
     .then(response => {
          console.log(response)
          // this.source=this.props.location.state.source;
          // this.destination=this.props.location.state.destination;
          console.log(this.state.posts.length)
          console.log(response.data.code)
          if(response.data.code==200)
          {
            this.setState({posts:response.data.body})
            //  alert(`booked`)
            console.log(this.state.booking_exists)
            //console.log(response.data.body.Array)
            this.state.booking_exists="true"
            //  this.props.history.push("/")
          }
          else if(response.data.code==403)
          {
            this.setState({booking_exists:"false"})
             alert(`no bookings found`)
             this.props.history.push("/form")
          }
 
      })
      .catch(error => {
          console.log(error)
          this.setState({errorMsg:'error in retrieving data'})
        //   this.setState({errorMsg:'error in retrieving data'})
      
      })
  }
  componentWillMount()
  {
    //  console.log(this.state);
    // //  this.setState(initialstate);
    //  const cookie_key = 'token';
    //  var query = 'http://172.26.65.39:1011/booking/previousbooking'; //showflight?source='+this.state.source+'&destination='+this.state.destination;
    //  axios.defaults.headers.common['Authorization'] = read_cookie(cookie_key);
    //  console.log(read_cookie(cookie_key))
    //  axios.get(query)
    //  .then(response => {
    //       console.log(response)
    //       this.setState({posts:response.data.body})
    //       console.log(this.state.posts.length)
    //       console.log(response.data.code)
    //       if(response.data.code==200)
    //       {
    //          alert(`booked`)
    //         console.log(this.state.booking_exists)
    //         //  this.props.history.push("/")
    //       }
    //       else if(response.data.code==403)
    //       {
    //         this.state.booking_exists="false"
    //          alert(`not bookings found`)
    //          this.props.history.push("/form")
    //       }
 
    //   })
    //   .catch(error => {
    //       console.log(error)
    //       this.setState({errorMsg:'error in retrieving data'})
    //     //   this.setState({errorMsg:'error in retrieving data'})
      
    //   })
    this.load()
      
  }



  render() {

    if(read_cookie('token')=='')
      {
        delete_cookie('token')
        return(
          <div>
            <Redirect to = "/"></Redirect>
          </div>
        )
      }

    else
    {
      // this.load()
      console.log(this.state.posts)
      const {posts,errorMsg,from,to}=this.state;
      // const{source,destination}=this.props.location.state;
      if(this.state.posts.length>0)
      {
        
    return (
        <section style={imag}>
            <center>
            <ul className="prevb2">
                  {posts.map(post=> 
                      <div>
                        <br/><li key={post.booking_id}>
                          <div><b>Booking id : {post.booking_id} | Flight Number : {post.flight_id} | Source : {post.from} |  Destination  : {post.to} | Seat No : {post.s_no} <br/></b></div>
                      </li>
                      <center><input type="button" value="Cancel" onClick={() => this.delete(post.booking_id)}/></center>
                      
                      </div>)}   
                      <br/>            
              </ul>
            </center>
        </section>
        
    )
      }
      else
      {
        return (
          <div style={imag}>
            <br/>
            <h1 className='prevb' className="show">No bookings found</h1>
          </div>
        )
      }
        
    }
    
      
  }
}

export default Selectflight