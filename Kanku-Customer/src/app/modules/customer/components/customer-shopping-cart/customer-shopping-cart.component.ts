import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { map } from 'rxjs';
import { ImageProcessService } from '../../services/image-process.service';
import { StorageService } from '../../../../auth/services/storage.service';
import { Size } from '../../services/interfaces/size.interface';
import { Cart } from '../../services/interfaces/cart.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-shopping-cart',
  templateUrl: './customer-shopping-cart.component.html',
  styleUrl: './customer-shopping-cart.component.css'
})
export class CustomerShoppingCartComponent implements OnInit {

  constructor(private cartService: CustomerService,
    private storage: StorageService,
    private imageProcess: ImageProcessService,
    private service: CustomerService,
    private router: Router
  ) { }

  customer = {
    "customerId": ''
  }

  carts: Cart[] = []

  ngOnInit(): void {
    let customer = this.storage.getUser();
    this.customer.customerId = customer.customerId;

    this.cartService.getAllCartsByCustomer(this.customer)
      .pipe(
        map((x: Cart[], i) => x.map((cart: Cart) => this.imageProcess.createImage(cart)))
      ).subscribe(res => {
        this.carts = res;
        // console.log(this.carts);
      }, err => {
        console.log(err);
      })
  }

  cart = {
    "cartId": '',
  }

  deleteItemFormCart(id: any) {
    this.cart.cartId = id;
    this.service.deleteCartItem(this.cart).subscribe(res => {
      this.router.navigate(['/customer-purchase-home/my-cart'])
      this.ngOnInit();
    }, err => {
      this.router.navigate(['/customer-purchase-home/my-cart'])
      this.ngOnInit();
    })
  }

}
