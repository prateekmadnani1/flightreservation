import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import  { Redirect } from 'react-router-dom'
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import './styles.css';
import flight from '../AddAdmin.jpg';

var imag={
    backgroundImage: `url(${flight})`,
    position: "absolute",
    height: "100%",
    width: "100%",
    overflow: "auto"
};

// import flight from '../Bkg.jpg';

// import { BrowserHistory } from 'react-router';

const initialstate = {
        email: "",
        password: "",
        emailerror:"",
        passworderror:"",
        valid:"failure",
        exists:"false"
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
   axios.post('http://172.26.65.39:1011/admin/login',this.state)
   .then(response => {
        console.log(response)
        if(response.data.code=="200")
        {
            this.state.valid=response.data;
            this.state.exists="true";
            console.log(response)
            const cookie_key = 'admin_token';
            bake_cookie(cookie_key, response.data.token);
            console.log(read_cookie(cookie_key))
            // axios.defaults.headers.common['Authorization'] = read_cookie(auth_token);
            this.props.history.push('/AdminPage');
            
        }
        else if(response.data.code=="403")
        {
            this.state.exists="false"
            alert(`user does not exists`)
            axios.defaults.headers.common['Authorization'] = ''
        }
        this.setState({posts:response.data})


    })
    .catch(error => {
        console.log(error)
        //this.setState({errorMsg:'error in retrieving data'})
    
    })
      
    }
}

  render() {

    if(read_cookie('admin_token')!='')
    {
        delete_cookie('admin_token');
    }
    
    return (
       
        <div>
            <br/>
            {/* <img src={flight} alt="A  flight"/> */}
            <form onSubmit={this.handleSubmit} style={imag}>
                <h1><center className="hea">Log In</center></h1>
                <section className="adl">
                    <br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<label>Mail :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label> <input type="text" value={this.state.email} onChange={this.Mailhandler} placeholder="Mail..." /><br /><br/>
                <div>
                    <center>{this.state.emailerror ? (
                        <div style={{color:"red"}}> {this.state.emailerror} </div>):null
                    }</center>
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;<label>Password :</label> <input type="Password" value={this.state.password} onChange={this.Passwordhandler} placeholder="Password..." /><br /><br/>
                <div><center>
                    {this.state.passworderror ? (
                        <div style={{color:"red"}}> {this.state.passworderror} </div>):null
                    }</center>
                </div>
                
                <center>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="submit"  value="Login "/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</center>
                {/* <Link to={"/signup"}><input type="button" value="Signup" /></Link> */}
                 {/*<div class="container unauthenticated">
                    With GitHub: <a href="http://172.26.65.39:1011/oauth2/authorization/github">click here</a>
                </div>*/}
                </section>
             </form>
        
             
    </div>
    );    
        }
    }
    export default withRouter(Login);