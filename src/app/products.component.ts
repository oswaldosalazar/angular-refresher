import { Component, OnInit } from '@angular/core';

import { ProductsService } from './products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
  productName: string;
  isDisabled = false;
  products = [];
  private productsSubscription: Subscription;

  constructor(private ProductsService: ProductsService) {
    setTimeout(() => {
      // this.productName = 'A tree';
      this.isDisabled = false;
    }, 3000);
  }

  ngOnInit(): void {
    this.products = this.ProductsService.getProducts();
    this.productsSubscription = this.ProductsService.productsUpdate.subscribe(
      () => {
        this.products = this.ProductsService.getProducts();
      }
    );
  }

  addProduct(form) {
    console.log(form.value.productName);

    if (form.valid) {
      // this.products.push(form.value.productName);
      this.ProductsService.addProduct(form.value.productName);
    }
    form.resetForm();
    console.log(form.value.productName);
  }

  removeProduct(productName: string) {
    this.products = this.products.filter(
      product => product !== productName
    );
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }
}
