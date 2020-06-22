package com.AR.airline.repos;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.AR.airline.model.Booking;
@Repository
public interface BookingRepos extends MongoRepository <Booking,String>{
	
	@Query("{'flight_id':?0}")
	List<Booking> checkavl(String flight_id);
	@Query("{'booking_id':?0}")
	long deleteBybooking_id(String bid);
	@Query("{'user_id':?0}")
	List<Booking> previousbooking(String user_id);
	@Query("{'booking_id':?0}")
	List<Booking> getbooked(String book_id);
	

}
