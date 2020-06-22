import React, { Component } from 'react';
import axios from 'axios';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import  { Redirect } from 'react-router-dom';
import './styles.css';
import flight from '../AddAdmin.jpg';

var imag={
    backgroundImage: `url(${flight})`,
    position: "absolute",
    height: "100%",
    width: "100%"
};

const initialstate = {
    email: "",
    password: "",
    name: "",
    reenterpassword: "",
    dob: "",
    phno: "",
    gender: "",
    emailerror:"",
    passworderror:"",
    reenterpassworderror:"",
    phoneerror:"",
    valid:"failure",
    exists:""
}
class Signup extends Component
{
constructor(props) {
    super(props)

    this.state = {
        email: "",
        name: "",
        password: "",
        reenterpassword: "",
        dob: "",
        phno: "",
        gender: "",
        emailerror:"",
        passworderror:"",
        reenterpassworderror:"",
        phoneerror:"",
        valid:"failure",
        exists:"false"
    }
    this.handleSubmit=this.handleSubmit.bind(this)
}

Mailhandler = (event) => {
    this.setState({
        email: event.target.value
    })
}
Namehandler = (event) => {
    this.setState({
        name: event.target.value
    })
}
Passwordhandler = (event) => {
    this.setState({
        password: event.target.value
    })
}
ReenterPasswordhandler = (event) => {
    this.setState({
        reenterpassword: event.target.value
    })
}
DOBhandler = (event) => {
    this.setState({
        dob: event.target.value
    })
}
Phonehandler = (event) => {
    this.setState({
        phno: event.target.value
    })
}
Genderhandler = (event) => {
    this.setState({
        gender: event.target.value
    })
}
validate = () => {
    let emailerror="";
    let passworderror="";
    let reenterpassworderror="";
    let phoneerror="";
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
    if(!(this.state.password.length>=7))
    {
        passworderror='password length is not appropriate!';
    }
    else
    {
        passworderror='';
        this.setState({passworderror});
    }
    if(passworderror)
    {
        this.setState({passworderror});
        return false;
    }
    if((this.state.reenterpassword.localeCompare(this.state.password)))
    {
        reenterpassworderror='password and re enter passwords do not match';
    }
    else
    {
        reenterpassworderror='';
        this.setState({reenterpassworderror});
    }
    if(reenterpassworderror)
    {
        this.setState({reenterpassworderror});
        return false;
    }
    // if(!(this.state.phno.length==10))
    // {
    //     phoneerror='enter a valid phone number';
    //     console.log(this.state.phno.length);

    // }
    // else
    // {
    //     phoneerror='';
    //     this.setState({phoneerror});
    //     console.log(this.state.phno.length);
    // }
    // if(phoneerror)
    // {
    //     this.setState({phoneerror});
    //     return false;
    // }
    return true;

}
login = () => {
    //delete_cookie('token');
    console.log('logout');
    this.props.history.push('/');
  }
handleSubmit = (event) => {
    
    event.preventDefault();
    const isvalid=this.validate();
   if(isvalid)
   {
    console.log(this.state);
    this.setState(initialstate);
   }
    //console.log(this.state);
    if(isvalid)
    {
    axios.defaults.headers.common['Authorization'] = read_cookie('admin_token');
    axios.post('http://172.26.65.39:1011/admin/newadmin',this.state)
    .then(response => {
         console.log(response.data)
         console.log(read_cookie('admin_token'))
         if(response.data.code=="200")
        {
            this.state.valid=response.data;
            const cookie_key = 'admin_token';
            this.state.exists="true";
            //bake_cookie(cookie_key, response.data.token);
            axios.defaults.headers.common['Authorization'] = read_cookie(cookie_key);
            this.props.history.push('/AdminLogin')
        }
        else if(response.data.code=="403")
        {
            this.state.exists="false"
            alert(`user already exists`)
        }
         this.setState({posts:response.data})
     })
     .catch(error => {
         console.log(error)
         console.log("eror")
        this.setState({errorMsg:'error in retrieving data'})
     
     })
     
    
    }
    else
    {
        console.log("Error")
    }
 }
render() {
    return (
        
        <div>
            <section style={imag}>
            <form onSubmit={this.handleSubmit}>
                <br/>
                <h1><center className="hea">Sign Up</center></h1>
                <div className="add">
                    <br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label><b>Mail :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></label> <input type="text" value={this.state.email} onChange={this.Mailhandler} placeholder="Mail..." /><br /><br/>
                <div>
                   <center> {this.state.emailerror ? (
                        <div style={{color:"red"}}> {this.state.emailerror} </div>):null
                    }</center>
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label><b>Name :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></label> <input required type="text" value={this.state.name} onChange={this.Namehandler} placeholder="Name..." /><br /><br/>
                
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label><b>Password :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></label> <input type="Password" value={this.state.password} onChange={this.Passwordhandler} placeholder="Password..." /><br /><br/>
                <div>
                    <center>{this.state.passworderror ? (
                        <div style={{color:"red"}}> {this.state.passworderror} </div>):null
                    }</center>
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label><b>ReenterPassword :</b></label> <input type="Password" value={this.state.reenterpassword} onChange={this.ReenterPasswordhandler} placeholder="Re-enter Password..." /><br /><br/>
                <div>
                    <center>{this.state.reenterpassworderror ? (
                        <div style={{color:"red"}}> {this.state.reenterpassworderror} </div>):null
                    }</center>
                </div>
                {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label><b>DOB :</b></label> <input type="date" value={this.state.dob} onChange={this.DOBhandler} placeholder="DOB..." /><br /><br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label><b>Phone :</b></label><input type="text" value={this.state.Phno} onChange={this.Phonehandler} placeholder="Phone..." /><br /><br/>
                <div>
                    {this.state.phoneerror ? (
                        <div style={{color:"red"}}> {this.state.phoneerror} </div>):null
                    }
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label><b>Gender :</b></label><select onChange={this.Genderhandler} defaultValue="Select Gender"><br/>
                    <option defaultValue>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select><br /><br/> */}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="submit"  value="Submit "/>
                
                </div>
            </form>
            </section> 
        </div>
    )
} 
}
export default Signup