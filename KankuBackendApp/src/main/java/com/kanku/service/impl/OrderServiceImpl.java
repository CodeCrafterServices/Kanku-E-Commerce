package com.kanku.service.impl;

import com.kanku.model.ProductOrder;
import com.kanku.model.Size;
import com.kanku.repository.IOrderRepository;
import com.kanku.repository.ISizeRepository;
import com.kanku.service.IOrderService;
import com.kanku.service.ISizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class OrderServiceImpl implements IOrderService {

    @Autowired
    private IOrderRepository orderRepository;

//    @Autowired
//    private IStockRepository stockRepository;

    @Autowired
    private ISizeRepository sizeRepository;


    @Autowired
    private ISizeService sizeService;
    @Override
    public ProductOrder orderProduct(ProductOrder productOrder) {


        Size size =sizeRepository.findById(productOrder.getSize().getSizeId()).get();
        System.out.println(size);
        System.out.println(productOrder.getProduct());

        if(productOrder.getOrderQuantity()<=size.getTotalProductQuantity()){

              sizeService.updateProductDetails(productOrder);
              productOrder.setOrderDate(LocalDate.now());
              return orderRepository.save(productOrder);

        }
        return null;
    }
}
