package com.kanku.repository;

import com.kanku.model.ProductOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IOrderRepository extends JpaRepository<ProductOrder,Long> {
}
