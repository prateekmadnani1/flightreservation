import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import  { Redirect } from 'react-router-dom'
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import flight from '../AddAdmin.jpg';
import "./styles.css";

// import { BrowserHistory } from 'react-router';
var imag={
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundImage: `url(${flight})`
};


const initialstate = {
        email: "",
        password: "",
        emailerror:"",
        passworderror:"",
        valid:"failure"
}
class Login extends Component
{ 
constructor(props) {
    super(props)

    this.state = {
        email: "",
        password: "",
        emailerror:"",
        passworderror:"",
        valid:"failure",
        exists:"false"
        //isLoggedin:true
    }
    //this.handleSubmit=this.handleSubmit.bind(this)
  }
  Mailhandler = (event) => {
    this.setState({
        email: event.target.value
    })
}
Passwordhandler = (event) => {
  this.setState({
      password: event.target.value
  })
}
validate = () => {
     let emailerror="";
     let passworderror="";
     if(!((this.state.email.includes('@')) && this.state.email.includes('.')))
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
    
     if(!(this.state.password.length>=7 ))
     {
         passworderror='password length is not appropriate!';
     }
     if(passworderror)
     {
         this.setState({passworderror});
         return false;
     }
     else
     {
        passworderror='';
        this.setState({passworderror});
     }
     return true;

}
handleSubmit = (event) => {
   event.preventDefault();
   const isvalid=this.validate();
   //console.log("abd");
   if(isvalid)
   {
    //console.log(this.state);
    this.setState(initialstate);
   }


  // return <Redirect to="/Form/"  />
if(isvalid){
   axios.post('http://172.26.65.39:1011/user/login',this.state)
   .then(response => {
        console.log(response.data.token)
        if(response.data.code=="200")
        {
            this.state.valid=response.data;
            this.state.exists="true";
            console.log(response)
            const cookie_key = 'token';
            delete_cookie('token');
            bake_cookie(cookie_key, response.data.token);
            // delete_cookie('token');
            console.log(read_cookie('token'));
            // axios.defaults.headers.common['Authorization'] = read_cookie(cookie_key);
            this.props.history.push('/Form')
            
        }
        else if(response.data.code=="403")
        {
            this.state.exists="false"
            alert(`user does not exists`)
        }
        this.setState({posts:response.data})


    })
    .catch(error => {
        console.log(error)
        //this.setState({errorMsg:'error in retrieving data'})
    
    })
    //console.log("abc");
    // return <Redirect to="/Form/"  />
    //console.log("abd");
    
     /* axios.get('http://172.26.65.39:1010/login')
      .then(response => {
          console.log(response)
          this.setState({posts:response.data})
      })
      .catch(error => {
          console.log(error)
          this.setState({errorMsg:'error in retrieving data'})
          
      })*/
      
    }
}
componentWillMount()
   {
        delete_cookie('token')
   }
  render() {
    /*if (this.state.valid === ("successfull")) 
    {return (<div><input type="text" value={this.state.valid} /></div>
             //<Redirect to='/form' />
             );}*/
            //  if(read_cookie('token')=='')
            //  {
            //      return(
            //          <div>
            //              <Redirect to="/"/>
            //          </div>
            //      )
            //  }
            //  else
            //  {  
                if(read_cookie('token')!='')
                {
                    delete_cookie('token');
                }
                
                return (
       
                    <section style={imag}>
                    <div>
                        <br/>
                        {/* <img src={flight} alt="A  flight"/> */}
                        <form onSubmit={this.handleSubmit}>
                <h1 className='hea'><center>Flight Reservation</center></h1><br/>
                        <div className='Divi'>
                            <br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label><b>Mail :</b></label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input className="bor" type="text" value={this.state.email} onChange={this.Mailhandler} placeholder="Mail..." /><br /><br/>
                            <div>
                                <center>{this.state.emailerror ? (
                                    <div style={{color:"red"}}> {this.state.emailerror} </div>):null
                                }</center>
                            </div>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label><b>Password :</b></label> <input className="bor" type="Password" value={this.state.password} onChange={this.Passwordhandler} placeholder="Password..." /><br /><br/>
                            <div>
                                <center>{this.state.passworderror ? (
                                    <div style={{color:"red"}}> {this.state.passworderror} </div>):null
                                }</center>
                            </div>
                            
                            &nbsp;&nbsp;&nbsp;&nbsp;<input className='butlog' type="submit"  value="Login "/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Link to={"/signup"}><input className='butsign' type="button" value="Signup" /></Link>

                         </div>   
                         </form>
                    
                         
                </div>
                </section>);    
             //}
    
        }
    }
    export default withRouter(Login);