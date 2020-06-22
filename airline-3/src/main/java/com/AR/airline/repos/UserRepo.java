package com.AR.airline.repos;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.AR.airline.model.User;
@Repository
public interface UserRepo extends MongoRepository<User, String> {
	
	@Query("{ 'email' : ?0,'password':?1 }")
	List<User> findByemailAndpassword(String email, String password);
	@Query("{ 'email' : ?0 }")
	List<User> f_email(String email);

	
	
	
}
