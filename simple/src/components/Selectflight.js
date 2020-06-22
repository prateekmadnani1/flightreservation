import React, { Component } from 'react';
import { Link, Redirect } from 'react-router';
import axios from 'axios';
import Form from './Form'; 
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import flight from '../AddAdmin.jpg'
import './styles.css';

const prope={
    backgroundColor: '#deb887',
    height: '750px'
  }

 var imag={
  position: "absolute",
  overflow: "auto",
  height: "100%",
  width: "100%",
  backgroundImage: `url(${flight})`
 } ;


  const initialstate = {
    Mail: "",
    Name: "",
    emailerror:"",
    nameerror:"",
    flightno:"",
    from:'',
    to:'',
    flight_id:""
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
        from:'',
        to:'',
        flight_id:"",
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
validate = () => {
    let emailerror="";
    let nameerror="";
    if(!((this.state.Mail.includes('@')) && this.state.Mail.includes('.')))
    {
        emailerror='invalid email';
        
    }
    else
    {
       emailerror='';
       this.setState({emailerror});
    }
    if(emailerror)
    {
        this.setState({emailerror});
        return false;
    }
    if(((this.state.Name.length<1)))
    {
        nameerror='invalid name';
        
    }
    else
    {
       nameerror='';
       this.setState({nameerror});
    }
    if(nameerror)
    {
        this.setState({nameerror});
        return false;
    }
    return true;
}
handleSubmit = (event) => {
    event.preventDefault();
    const isvalid=this.validate();
   //console.log("abd");
   if(isvalid)
   {
    console.log(this.state);
    this.setState(initialstate);
    this.state.flight_id=this.props.location.state.flightno;
    this.state.from=this.props.location.state.source;
    this.state.to=this.props.location.state.destination;
    const cookie_key = 'token';
    var query = 'http://172.26.65.39:1011/booking/newbook'; //showflight?source='+this.state.source+'&destination='+this.state.destination;
    axios.defaults.headers.common['Authorization'] = read_cookie(cookie_key);
    console.log(read_cookie(cookie_key))
    axios.post(query,this.state)
    .then(response => {
         console.log(response)
         this.setState({posts:response.data})
         if(response.data.code==200)
         {
            // alert(`booked`)
            alert(`Booking successful:\nbooking id is `+response.data.body)
            this.props.history.push("/form")
         }
         else if(response.data.code==403)
         {
            alert(`no seats available`)
            this.props.history.push("/form")
         }

     })
     .catch(error => {
         console.log(error)
         this.setState({errorMsg:'error in retrieving data'})
         this.setState({errorMsg:'error in retrieving data'})
     
     })
    }

}

  componentWillMount()
  {
        //console.log(this.props.location.state.flightno)
        this.setState(this.props.location.state)
      
  }



  render() {

    const {flightno}=this.state.flightno;
    if(read_cookie('token')=='')
      {
        delete_cookie('token')
        return(
          <div>
            <Redirect to = "/"></Redirect>
          </div>
        )
      }
    else if(this.state.flightno=='')
    {
        return(
            <div>
              <Redirect to = "/form"></Redirect>
            </div>
          )
    }
    else
    {
        const {posts,errorMsg}=this.state;
    return (
        <div>
            
            <section style={imag}>
            
            <ul>
                <div>
                <br/><br/><br/>
                <div>
                
                <h1 className="hea"><center>Flight Details</center></h1><br></br>
                <section className="fd1">
                  
    <label><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Flight Number : </b>{this.props.location.state.flightno}</label><br/><br/>
    <label><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Source : </b>{this.props.location.state.source}</label><br/><br/>
    <label><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Destination : </b>{this.props.location.state.destination}</label><br/><br/>
    {/* <label>Duration : {this.props.location.state.duration}</label><br/> */}
    <label><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Departure : </b>{this.props.location.state.departure}</label><br/><br/>
    <label><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Arrival : </b>{this.props.location.state.arrival}</label><br/><br/>
    <label><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Date : </b>{this.props.location.state.date}</label><br/><br/>
    
    </section>
    </div>
    </div>
            </ul>
            <div>
            {/* <input type="submit"  value="Submit "/> */}
            </div>

            <br/>
            <center>
            <form onSubmit={this.handleSubmit}>
                <h1><center className="hea">Passenger Details</center></h1>
                <br/>
                <section className="fd2">
                  <br/>
                <div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label><b>Mail :&nbsp;&nbsp;&nbsp;</b></label> <input type="text" value={this.state.Mail} onChange={this.Mailhandler} placeholder="Mail..." /><br /><br />
                </div>
                <div>
                    <center>{this.state.emailerror ? (
                        <div style={{color:"red"}}> {this.state.emailerror} </div>):null
                    }</center>
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label><b>Name :</b></label> <input type="text" value={this.state.Name} onChange={this.Namehandler} placeholder="Name..." /><br /><br />
                <div>
                    {this.state.nameerror ? (
                        <div style={{color:"red"}}> {this.state.nameerror} </div>):null
                    }
                </div>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label><b>Flight Number : </b>{this.state.flightno}</label> 
  
                <br/>
                <br/>
                {/* <input type="text" value={this.state.flightno} onChange={this.Fhandler} placeholder="Flight no..." /><br /><br /> */}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="submit" value="Book" /><br />
                </section>
              </form>
              
              </center>

            </section>
            
        </div>
        
    )
    }
    
      
  }
}

export default Selectflight