package com.kanku.repository;

import com.kanku.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICartRepository extends JpaRepository<Cart,Long> {

    @Query(nativeQuery = true, value = "SELECT * FROM cart where customer_id=?")
    List<Cart> getAllByCustomerCustomerId(Long id);
}
