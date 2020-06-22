package com.AR.airline.repos;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.AR.airline.model.Booking;
import com.AR.airline.model.Flight;
import com.AR.airline.model.User;
@Repository
public interface FlightRepo extends MongoRepository<Flight, String> {
	@Query("{'flightno':?0}")
	List<Flight> flightno(String no);
	long deleteByflightno(String no);
	@Query("{'source':?0,'destination':?1}")
	List<Flight> findBysd(String s,String d);
	@Query("{'flightno':?0,'date':?1}")
	List<Flight> findByflightnoAnddate(String no ,String date);
	
	
}
