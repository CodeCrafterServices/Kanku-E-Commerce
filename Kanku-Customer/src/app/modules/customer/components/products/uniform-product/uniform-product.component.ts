import { Component } from '@angular/core';
import { ProductListService } from '../../../services/product-list.service';
import { Product } from '../../../services/interfaces/product.interface';

@Component({
  selector: 'app-uniform-product',
  templateUrl: './uniform-product.component.html',
  styleUrl: './uniform-product.component.css'
})
export class UniformProductComponent {
  uniform: Product[] = [];

  constructor(private productService: ProductListService) { }

  ngOnInit(): void {

  }
}
