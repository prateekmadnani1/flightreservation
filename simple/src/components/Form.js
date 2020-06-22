import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import flight from "../AddAdmin.jpg";
import './styles.css';

/*const prope={
  backgroundColor: '#deb887',
  height: '750px'
}
const propes={
  position: 'absolute',
  top: '40px',
  right: '30px'
}*/

var imag={
  backgroundImage: `url(${flight})`,
  position: "absolute",
  height: "100%",
  width: "100%"
};

const initialstate = {
        source: '',
        destination: '',
        date:"",
        code:'',
        errorMsg:'',
        posts:[],
        exists:'true'
}

  

class Form extends Component
{
    
    constructor(props)
    {
      super(props)
      this.state={
        
        source: '',
        destination: '',
        date:"",
        code:'',
        errorMsg:'',
        posts:[],
        exists:'true',
        from:[],
        to:[]
      }
       
    }
    
    handleFROMChange = (event) => {
      this.setState({
        source:event.target.value
      })
  }
  
    handleTOChange = (event) => {
      this.setState({
        destination:event.target.value
      })
  }
  DATEhandler = (event) => {
    this.setState({
        date: event.target.value
    })
  }

  select = (flight) => {
    // key.preventDefault();
    // selected=key;
    // console.log(selected)
    this.props.history.push({
      pathname : '/select',
      state :{
        flightno:flight.flightno,
        source:flight.source,
        destination:flight.destination,
        //duration:flight.duration,
        fare:flight.fare,
        arrival:flight.arrival,
        departure:flight.departure,
        airline:flight.airline,
        date:flight.date
      }
      } 
    );
  }

  validate = () => {
    let errorMsg="";
    if((this.state.source===this.state.destination))
    {
        errorMsg='From and to positions cannot be same';
    }
    else if((this.state.source==""))
    {
      errorMsg="Enter Valid Source";
    }
    else if((this.state.destination==""))
    {
      errorMsg="Enter Valid Destination";
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
    event.preventDefault();
   const isvalid=this.validate();
   if(isvalid)
   {
    console.log(this.state);
    this.load_data()
    // this.setState(initialstate);
    const cookie_key = 'token';
    var query = 'http://172.26.65.39:1011/flight/showflight'; //showflight?source='+this.state.source+'&destination='+this.state.destination;
    axios.defaults.headers.common['Authorization'] = read_cookie(cookie_key);
    console.log(read_cookie(cookie_key))
    axios.post(query,this.state)
    .then(response => {
         console.log(response)
         this.state.code=response.data.code
         this.setState({posts:response.data.body})
         if(response.data.code=="401")
         {
           this.props.history.push("/")
         }
         else if(response.data.code=="403")
         {
           alert(response.data.body)
           this.state.exists='false';
         }
         else if(response.data.code=="200")
         {
           this.state.exists="true"
           //console.log("true")
         }
        //  this.setState({from:response.data.body.from})
        //  this.setState({to:response.data.body.to})
     })
     .catch(error => {
         console.log(error)
        //  this.state.code=response.data.code
         this.setState({errorMsg:'error in retrieving data'})
         //this.setState({errorMsg:'error in retrieving data'})
     
     })
    }
 }
 logout = () => {
  console.log("Button clicked...")
  delete_cookie('admin_token');
  this.props.history.push('/')
}

prevBook = () => {
  console.log("Button clicked...")
  this.props.history.push('/PrevBookings')
}

back = () => {
  console.log("Button clicked...")
  this.state.exists="false"
  this.props.history.push('/form')
}

load_data()
{
  const cookie_key = 'token';
    var query = 'http://172.26.65.39:1011/flight/fromto'; //showflight?source='+this.state.source+'&destination='+this.state.destination;
    axios.defaults.headers.common['Authorization'] = read_cookie(cookie_key);
    console.log(read_cookie(cookie_key))
    axios.get(query)
    .then(response => {
         console.log(response)
         this.state.code=response.data.code
        //  this.setState({posts:response.data.body})
         this.setState({from:response.data.body.from})
         this.setState({to:response.data.body.to})
     })
     .catch(error => {
         console.log(error)
        //  this.state.code=response.data.code
         this.setState({errorMsg:'error in retrieving data'})
         //this.setState({errorMsg:'error in retrieving data'})
     
     })
}
componentWillMount()
{
  this.load_data()
}
    render()
    {
      
      if(read_cookie('token')=='')
      {
        delete_cookie('token')
        return(
            <Redirect to = "/"></Redirect>        
        )
      }
      
      else
      {
        console.log(this.state.exists)
        console.log(this.state.posts)
        const {source,destination,date,errorMsg,posts,from,to}=this.state;
      if(this.state.code==200 && this.state.exists=="true" && this.state.posts!='')
      {
        // this.load_data()
        // console.log("if")
        let from_data = this.state.from;
        //console.log(this.state.from)
        let f_options = from_data.map((data) =>
                <option 
                    value={data}
                >
                    {data}
                </option>
            );
        
        let to_data = this.state.to;
        //console.log(this.state.to)
        let t_options = to_data.map((data) =>
                <option 
                    value={data}
                >
                    {data}
                </option>
            );
        return (
          <section style={imag}>
          {/*<section style={prope}>*/}
          <center>
          <div>
            {
              // <form onSubmit={this.handleSubmit}>
              //   <h1>
              //   <br/>
              //     <center className="hea">Search Flight</center>
              //   </h1>
              //   <div className="sefli">
              //   <div>
              //     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label><b>SOURCE &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></label>
              //     <select name="country" onChange={this.handleFROMChange}>
              //     <option>Select Item</option>
              //       {f_options}
              //         {/* {this.state.from.map((e) => {
              //             return <option key={e.value} value={e.value}>{e.value}</option>;
              //           })} */}
              //     </select>
              //   </div>
              //   <div>
              //     <br />
              //     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              //     <label><b>DESTINATION </b></label>
              //     <select name="country" onChange={this.handleTOChange}>
              //     <option>Select Item</option>
              //       {t_options}
              //         {/* {this.state.from.map((e) => {
              //             return <option key={e.value} value={e.value}>{e.value}</option>;
              //           })} */}
              //     </select>
              //   </div>
              //   <div>
              //     {this.state.errorMsg ? (
              //       <div style={{ color: "red" }}> {this.state.errorMsg} </div>
              //     ) : null}
              //   </div>
              //   <div>
              //     <br />
              //     {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label>DATE :</label>{" "} */}
              //     <label><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DATE &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></label>
              //     <input
              //       type="date" required
              //       value={this.state.date}
              //       onChange={this.DATEhandler}
              //       placeholder="Date"
              //     />
              //     {/* <br /> */}
              //   </div>
              //   </div>
              //   <br />
              //   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              //   <button type="submit">Search</button>
              //   <br />
              //   <label type="text" value={posts}></label> 
              // </form>
            }

            {/* {errorMsg ? <div>{errorMsg}</div> : null} */}
            {/* <li>
              <Link to={"/select"}>Search</Link>
            </li> */}
            <br/>
              <div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onClick={this.back.bind(this)}>Search Again</button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onClick={this.prevBook.bind(this)}>Show previous Bookings</button>
              </div>
              <br/>
              <ul className="fdet">
                  {posts.map(post=> 
                      <div><li key={post.flightno}>
                          <div>Flight Number : {post.flightno} |&nbsp; Date : {post.date} |&nbsp; Source : {post.source} |&nbsp; Destination : {post.destination} |&nbsp; Departure time : {post.departure} |&nbsp; Arrival time : {post.arrival} |&nbsp; Fare : {post.fare}</div>
                      </li>
                      <center><input type="button" value="Select" onClick={() => this.select(post)}/></center>
                      <br/>
                      </div>)}               
              </ul>
                  
              {/* {errorMsg ? <div>{errorMsg}</div>:null} */}
              {/*<section style={propes}>*/}
              <button className='sbut' onClick={this.logout.bind(this)}>Logout</button>
                  {/*</section>*/}
          </div>
          </center>
          {/*</section>*/}
        </section>
      )
      }
      else 
      {
        // console.log("else")
        let from_data = this.state.from;
        //console.log(this.state.from)
        let f_options = from_data.map((data) =>
                <option 
                    value={data}
                >
                    {data}
                </option>
            );
        
        let to_data = this.state.to;
        //console.log(this.state.to)
        let t_options = to_data.map((data) =>
                <option 
                    value={data}
                >
                    {data}
                </option>
            );
        return (
          <section style={imag}>
          {/*<section style={prope}>*/}
            <center>
          <div>
            {
              <form onSubmit={this.handleSubmit}>
                <br/>
                <h1>
                  <br/>
                  <center className="hea">Search Flight</center>
                </h1>
                
                <div className="selfli">
                <div>
                  <br/>
                  <br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label><b>SOURCE &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></label>
                  <select name="country" onChange={this.handleFROMChange}>
                  {/* <option>Select Item</option> */}
                    <option value="">Select Item</option>
                    {f_options}
                      {/* {this.state.from.map((e) => {
                          return <option key={e.value} value={e.value}>{e.value}</option>;
                        })} */}
                  </select>
                </div>
                <div>
                  <br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <label><b>DESTINATION  </b></label>
                  <select name="country" onChange={this.handleTOChange}>
                  {/* <option>Select Item</option> */}
                  <option value="">Select Item</option>
                    {t_options}
                      {/* {this.state.from.map((e) => {
                          return <option key={e.value} value={e.value}>{e.value}</option>;
                        })} */}
                  </select>
                </div>
                <div>
                  <center>{this.state.errorMsg ? (
                    <div style={{ color: "red" }}> {this.state.errorMsg} </div>
                  ) : null}
                  </center>
                </div>
                <div>
                  <br />
                  {/* { &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label>DATE :</label>{" "} */}
                  <label><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DATE &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b></label>
                  <input
                    type="date" required
                    value={this.state.date}
                    onChange={this.DATEhandler}
                    placeholder="Date"
                    min="2020-01-29" max="2020-04-30"/>
                  
                  {/* <br /> */}
                </div>
                </div>
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button type="submit">Search</button>
                <br />
              </form>
            }

            {/* {errorMsg ? <div>{errorMsg}</div> : null} */}
            {/* <li>
              <Link to={"/select"}>Search</Link>
            </li> */}
            <br/>
            <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onClick={this.prevBook.bind(this)}>Show previous Bookings</button>
              </div>
              <br/>
            {/*<section style={propes}>*/}
              <button className="sbut" onClick={this.logout.bind(this)}>Logout</button>
              {/*</section>*/}
          </div>
          </center>
          {/*</div></section>*/}
            </section>
        );
      }
      
      }
      
      }
}
export default Form