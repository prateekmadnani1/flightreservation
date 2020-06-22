package com.AR.airline.controller;

import java.util.ArrayList;
import java.text.SimpleDateFormat;  
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.AR.airline.model.Admin;
import com.AR.airline.model.Booking;
import com.AR.airline.model.Flight;
import com.AR.airline.model.User;
import com.AR.airline.repos.AdminRepo;
import com.AR.airline.repos.BookingRepos;
import com.AR.airline.repos.FlightRepo;
import com.AR.airline.repos.UserRepo;

import auth.AuthenticateAndAuthorise;


@CrossOrigin(origins = "*",allowedHeaders="*")
@RestController
public class MainController {
	@Autowired
	UserRepo repo;
	@Autowired
	FlightRepo frepo;
	@Autowired
	BookingRepos brepo;
	@Autowired
	AdminRepo adrepo;
	
	public String getid() {													//TO GENERATE UNIQUE ID
	 SimpleDateFormat generator = new SimpleDateFormat("ddMMyyyyHHmmss");  
	    Date date = new Date();  
	    return generator.format(date);
	}
	
	@RequestMapping()
	public String init()
	{
		
		return "connected to the server";
		
	}
	
//======================================================================================USER====================================================================================	
	
	@PostMapping("user/newuser")					// REGISTRATION
	
	public String  newuser(@RequestBody User u)
	{
		JSONObject ob = new JSONObject();
		
		String usr=u.getEmail();
		List<User> li= repo.f_email( usr);
		if(li.size()>0) {
			ob.put("code", "403");
			ob.put("body", "user name exists");
			return ob.toString();
		}
		else
		{
		System.out.println("incerted to database user value"+u.toString());
		u.setLastlogin(getid());
		repo.save(u);
		ob.put("code", "200");
		ob.put("body", "user added successfully");
		return ob.toString();
		}
		
	}
	
	
	
	
	@PostMapping("user/login")													//user login
	public String login(@RequestBody User u)
	{	
		if(u.getEmail()==null || u.getPassword()==null)
	{
		JSONObject responce = new JSONObject(); 			// response with error
		responce.put("code", "400");
		responce.put("token", "Enter valid data");
		return responce.toString();
		
		
	}
		
		
	System.out.println(u.toString());
		List<User> li =repo.findByemailAndpassword(u.getEmail(), u.getPassword()); ///password and email varefication

		if(li.size()==0)   				//if size = 0 then no record with that email id or password
		{
			JSONObject responce = new JSONObject(); 			// response with error
			responce.put("code", "403");
			responce.put("token", "none");
			return responce.toString();
		}
		else
		{
		
		List<User> usrlist=repo.f_email(u.getEmail()); 		//to update the login time
		User usr=usrlist.get(0);
		usr.setLastlogin(getid());
		repo.save(usr);
		
		 JSONObject obj = new JSONObject();					//to create  the token
		 obj.put("email", usr.getEmail());
		 obj.put("password", usr.getPassword());
		 obj.put("lastlogin", usr.getLastlogin());
		 
		 AuthenticateAndAuthorise auao=new AuthenticateAndAuthorise();
		 String token= auao.encrypt(obj.toString());
		 
		 
		 JSONObject responce = new JSONObject();     			//sending back response to the client
			responce.put("code", "200");
			responce.put("token", token);
			return responce.toString();
		 
		
		}
	}
	
	
	
	
	
	
	@PostMapping("user/logout")
	public String logout(@RequestHeader("Authorization")String token,@RequestBody User u)
	{	JSONObject ob=new JSONObject();
		String result = validate1(token);
		
		if(result=="true")
		{
		
		List<User> users=repo.f_email(u.getEmail());
		User user=users.get(0);
		user.setLastlogin("null");
		repo.save(user);
		
		
		ob.put("code", "200");
		ob.put("body", "loged out");
		return ob.toString();
		}
		else
		{
			
			ob.put("code", "401");
			ob.put("body", "unauthorised");
			return ob.toString();
			
			
		}
		
	}
	
	
	
//======================================================================================FLIGHT====================================================================================	
	
	
	
	@GetMapping("flight/findall")														 // returns all the flight
	public String findall(@RequestHeader("Authorization") String token )

	{
			JSONObject ob =new JSONObject();
		
		System.out.println(token);
	
		String result = adminvalidate(token);
		if(result=="true")
		{
		List<Flight> flights = frepo.findAll();
		if(flights.size()>0)
		{
			
			ob.put("code", "200");
			ob.put("body", flights);
			 
			return ob.toString();
			
			
		}
		else
		{
			
			ob.put("code", "403");
			ob.put("body", "no flight exists");
			return ob.toString();
		}
		}
		
		else
		{
			System.out.println("please re login");
			ob.put("code", "401");
			ob.put("body", "unauthorized relogin");
			return ob.toString();
			
		}
	}
	

	

	@PostMapping("flight/addflight")																				// adds new flight
	public String  addflight(@RequestHeader("Authorization") String token,@RequestBody Flight new_flight)
	{
		
		JSONObject ob = new JSONObject();
		String result = adminvalidate(token);
		
		if(result=="true")
		{
			
		List<Flight> existing =frepo.findByflightnoAnddate(new_flight.getFlightno(), new_flight.getDate());
		
		if(existing.size()>=1)
		{
			ob.put("code", "409");
			ob.put("body", "same flight no with date already exists");
			
			return ob.toString();
		}
		else
			
		{
			
		System.out.println("incerted to database user value"+new_flight.toString());
		 frepo.save(new_flight);
		ob.put("code", "200");
		ob.put("body", "flight added successfully ");
		
		return ob.toString();
		
		}
		
		}
		
		else
		{
			
			System.out.println("please re login");
			ob.put("code", "401");
			ob.put("body", "unauthorized relogin");
			return ob.toString();
			
			
		}
		
		
		
		
	}
	
	
	
	
	@PostMapping("flight/removeflight")												//REMOVES THE FLIGHT
	public String removeflight(@RequestHeader("Authorization") String token, @RequestBody Flight flight)
	{
		JSONObject ob=new JSONObject();		
		if(flight.getFlightno()=="null")
				{
			ob.put("code","403");
			ob.put("body", "no value supplied");
			return ob.toString();
					
					
				}
		
	
			
			String result = adminvalidate(token);
			if(result=="true")
			{
				List<Booking> check=brepo.checkavl(flight.getFlightno());
				
				if(check.size()==0)
				{
				
				long n= frepo.deleteByflightno(flight.getFlightno());
				if(n>=1)
					{
						ob.put("code","200");
						ob.put("body", "deleted successfull");
						return ob.toString();
					}
				else { 
						ob.put("code","412");
						ob.put("body", "data dosent exist");
						return ob.toString();
		
					 }
				}
				else
				{
					ob.put("code","405");
					ob.put("body", "booking exists for this flight");
					return ob.toString();
				}
	
			}
			
			else
				{
				
				System.out.println("please re login");
				ob.put("code", "401");
				ob.put("body", "unauthorized relogin");
				return ob.toString();
				
				
				
				}
	}
	
	
	
	
	
	@PostMapping("flight/showflight")																								//SHOWS BASED ON SOURCE AND DESTINATION
	public String  findbysd(@RequestHeader("Authorization") String token,@RequestBody Flight flight )
	{
		JSONObject ob=new JSONObject();
		String result = validate1(token);
		
		if(result=="true")
		{
			
			System.out.println(flight.toString());
			List<Flight> flights =frepo.findBysd(flight.getSource(),flight.getDestination());
			if(flights.size()==0)
			{
				ob.put("code","403");
				ob.put("body", "path dosent exist");
				return ob.toString();
			}
			else
			{
				ob.put("code","200");
				ob.put("body", flights);
				return ob.toString();
			}
		
		}
		
		else
		{
			
			System.out.println("please re login");
			ob.put("code", "401");
			ob.put("body", "unauthorized relogin");
			return ob.toString();
			
			
		}
		
	}
	
	@GetMapping("flight/fromto")
	String fromto(@RequestHeader("Authorization") String token)
	{
		System.out.println(token);
		System.out.println("inside fromto");
		String validate = validate1(token);
		if(validate=="true")
		{
		
		System.out.println("fromto authorised");
		Set<String> from=new HashSet<String>();
		
		Set<String> to=new HashSet<String>();
		List<Flight> flights=frepo.findAll();
		for (Flight individual_flight:flights)
		{
			from.add(individual_flight.getSource());
			to.add(individual_flight.getDestination());
			
		}
		
		JSONObject ob=new JSONObject();
		JSONObject result=new JSONObject();
		
		ob.put("to", to);
		
		ob.put("from", from);
		result.put("code", "200");
		result.put("body", ob);
		System.out.print("sending"+ob);
		return result.toString();
	}
		else
		{
			System.out.println("unauthorised");
			JSONObject ob=new JSONObject();
			System.out.println("please re login");
			ob.put("code", "401");
			ob.put("body", "unauthorized relogin");
			return ob.toString();
			
			
		}
	
	
	}
	
	
//======================================================================================BOOKING====================================================================================	
	
	

	@PostMapping("booking/newbook")							//book new ticket
	public String Book(@RequestHeader("Authorization") String token,@RequestBody Booking b)
	{	
		JSONObject ob=new JSONObject();
		
		String result = validate1(token);
		if(result=="true")
		{
			System.out.println(b.toString());
			String flightid=b.getFlight_id();
			List<Booking> booked_seat =brepo.checkavl(flightid); //check the no of seat booked
			List<Flight> flight=frepo.flightno(flightid);		//check the actual seat
			System.out.println(flight.size()+"\n "+flight.toString());
			if(flight.size()==0) //check if flight of that id exists or not 
				{
			
					return "enter proper flight no";
			
				}
			String tot_seat="";
			for(Flight i : flight)
				{
					tot_seat=i.getSeat();
				}
		
			int act,booked;
		
			act=Integer.parseInt(tot_seat);
			booked=booked_seat.size();
			if(act>booked)
				{
					booked+=1;
					b.setBooking_id(getid().toString());
					b.setS_no(""+booked);
					JSONObject user=getobject(token);
					b.setUser_id(user.getString("email"));
					brepo.save(b);
					ob.put("code","200");
					ob.put("body", b.getBooking_id());
					return ob.toString();
			
				}
			else
				{
					ob.put("code","403");
					ob.put("body", "no seat available");
					return ob.toString();
			
			
				}
		
		}
		
		else
		{
			
			System.out.println("please re login");
			ob.put("code", "401");
			ob.put("body", "unauthorized relogin");
			return ob.toString();
			
		}
		
		

	}
	
	
	
	@PostMapping("booking/cancelbooking")													//cancel booking
	public String cancelbooking(@RequestHeader("Authorization") String token,@RequestBody Booking b)
	{
		JSONObject ob=new JSONObject();
		
		String result = validate1(token);
		if(result=="true")
			{
				List<Booking> bookings = brepo.getbooked(b.getBooking_id());
				if(bookings.size()>0)
				{
				Booking book=bookings.get(0);
				brepo.delete(book);
				bookings = brepo.getbooked(b.getBooking_id());
				if(bookings.size()==0)
					{
						ob.put("code","200");
						ob.put("body", "booking canceled");
						return ob.toString();
			
					}
				else
					{ 
						ob.put("code","403");
						ob.put("body", "unsuccessfull");
						return ob.toString();
					}
				}
				else
				{
					
					ob.put("code","200");
					ob.put("body", "no booking found");
					return ob.toString();	
					
				}
			}
		else
			{
			
				System.out.println("please re login");
				ob.put("code", "401");
				ob.put("body", "unauthorized relogin");
				return ob.toString();
			
			
			}
		
		
	}
	
	

	
	
	@GetMapping("booking/previousbooking")										//check previous booking
	public String previousbooking(@RequestHeader("Authorization") String token)
	{
		JSONObject ob=new JSONObject();
		String result = validate1(token);
		if(result=="true")
			{
				JSONObject user_detail = getobject(token);
				System.out.println(user_detail.toString());
			List<Booking> previous_bookings=brepo.previousbooking(user_detail.getString("email"));
			
			if(previous_bookings.size()==0)
				{
					ob.put("code","403");
					ob.put("body", "no bookings found");
					return ob.toString();
			
				}
			else
				{
			
					ob.put("code","200");
					ob.put("body", previous_bookings);
					return ob.toString();
				}
		
			}
			else
				{
					System.out.println("please re login");
					ob.put("code", "401");
					ob.put("body", "unauthorized relogin");
					return ob.toString();
			
				}
		
	}
	
	
	
	
	
	
//============================================================ validation of token with actual data==================================================================================
	public User getdata( String email)
	{
		System.out.println("inside trial "+email);
		List<User> li= repo.f_email(email.toString());
		System.out.println(li.toString());
		return li.get(0);
		
	}
	
	public String validate1(String token)
	{
		 AuthenticateAndAuthorise auao=new AuthenticateAndAuthorise();
		String decripted_token=auao.decrypt(token);
		
																//System.out.println("after decrypt="+decripted_token);
		
		JSONObject obj = new JSONObject(decripted_token);
																//System.out.println("extraction started");
		String received_email=obj.getString("email");
		String received_pass=obj.getString("password");
		String received_lastvist=obj.getString("lastlogin");
																//System.out.println("extraction ended\n"+received_email);
		User user=getdata(received_email);
																//System.out.println("retrived from db \n"+user.toString());
		String act_email=user.getEmail();
		String act_password=user.getPassword();
		String act_lastseen=user.getLastlogin();
		
		
		if(received_email.equals(act_email)  && received_pass.equals(act_password) && received_lastvist.equals(act_lastseen))
		{
			
			
			return "true";
			
		}
		else
		{
			
			return "false";
			
		}
		
		
		
	}
	
	
	
	JSONObject getobject(String s)
	{
		AuthenticateAndAuthorise ao=new AuthenticateAndAuthorise();
		String decript=ao.decrypt(s);
		JSONObject ob=new JSONObject(decript);
		System.out.println(ob.toString());
		
		return ob;
	}
	
	
	
	

//============================================================ admin validation===============================================================================================
	@PostMapping("admin/newadmin")
	public String newadmin(@RequestHeader("Authorization") String token,@RequestBody Admin ad)
	{
		String result="false";
		JSONObject ob=new JSONObject();
		try
		{
		
		 result=adminvalidate(token);
		
		}catch(Exception e)
		{
			
			System.out.println("exception");
			
		}
		if(result=="true")
		{
	
		List<Admin> admins=adrepo.findByemail(ad.getEmail());
		if(admins.size()==0)
		{
		adrepo.save(ad);
		ad.setLastlogin("null");
		ob.put("code","200");
		ob.put("body","admin added successfully");
		return ob.toString();
		}
		else
		{
			
			
			ob.put("code","403");
			ob.put("body","admin already existed");
			return ob.toString();
			
		}
		
		
	}
		else
		{
			
			System.out.println("please re login");
			ob.put("code", "401");
			ob.put("body", "unauthorized relogin");
			return ob.toString();
			
			
		}
	
	
	}
	@PostMapping("admin/login")
	public String adminlogin(@RequestBody Admin ad)
	{
		JSONObject ob=new JSONObject();
		
		
		List<Admin> admins =adrepo.findByemailAndpassword(ad.getEmail(), ad.getPassword());
		if(admins.size()==0)
		{
			JSONObject responce = new JSONObject(); 			// response with error
			responce.put("code", "403");
			responce.put("token", "wrong credential");
			return responce.toString();
			
			
		}
		
		else
		{
				Admin admin=admins.get(0);
				admin.setLastlogin(getid());
				adrepo.save(admin);
				
			ob.put("email", admin.getEmail());
			ob.put("password", admin.getPassword());
			ob.put("lastlogin", admin.getLastlogin());
			ob.put("admin", "true");
				AuthenticateAndAuthorise auao = new AuthenticateAndAuthorise();
				String token= auao.encrypt(ob.toString());
				
				JSONObject responce = new JSONObject(); 			// response with error
				responce.put("code", "200");
				responce.put("token", token);
				return responce.toString();
				
			
		}
		
	
	
	}
	
	@PostMapping("admin/removeadmin")
	public String removeadmin(@RequestHeader("Authorization") String token,@RequestBody Admin ad)
	{
		JSONObject ob = new JSONObject(); 
		
		String result=adminvalidate( token);
		if(result=="true")
		{
		
		List<Admin> admins=adrepo.findByemail(ad.getEmail());
		if(admins.size()>0)
		{
		adrepo.delete(admins.get(0));
		admins=adrepo.findByemail(ad.getEmail());
		
		if(admins.size()==0)
		{ 
			
						// response with error
			ob.put("code", "200");
			ob.put("token","successfully deleted the admin");
			return ob.toString();
			
			
		}
		else
		{
			
					// response with error
			ob.put("code", "403");
			ob.put("token","couldent remove theadmin");
			return ob.toString();
			
		}
	}
		else
		{
			
						// response with error
			ob.put("code", "412");
			ob.put("token","user dosent exist");
			return ob.toString();
			
			
		}
	
	
	
	
	
		}
		else
		{
			
			System.out.println("please re login");
			ob.put("code", "401");
			ob.put("body", "unauthorized relogin");
			return ob.toString();
			
			
		}
	
	}
	
	
	
//=============================================admin validation=================================================================================================================

	public Admin getadmindata( String email)
	{
		System.out.println("inside trial "+email);
		List<Admin> li= adrepo.findByemail(email.toString());
		return li.get(0);
		
	}
	public String adminvalidate(String token)
	{
		 AuthenticateAndAuthorise auao=new AuthenticateAndAuthorise();
		String decripted_token=auao.decrypt(token);
		
																//System.out.println("after decrypt="+decripted_token);
		
		JSONObject obj = new JSONObject(decripted_token);
																//System.out.println("extraction started");
		String received_email=obj.getString("email");
		String received_pass=obj.getString("password");
		String received_lastvist=obj.getString("lastlogin");
		String received_admin=obj.getString("admin");
																//System.out.println("extraction ended\n"+received_email);
		Admin admin=getadmindata(received_email);
																//System.out.println("retrived from db \n"+user.toString());
		String act_email=admin.getEmail();
		String act_password=admin.getPassword();
		String act_lastseen=admin.getLastlogin();
		
		
		if(received_email.equals(act_email)  && received_pass.equals(act_password) && received_lastvist.equals(act_lastseen) && received_admin.equals("true") )
		{
			
			
			return "true";
			
		}
		else
		{
			
			return "false";
			
		}
		
		
		
	}
}
