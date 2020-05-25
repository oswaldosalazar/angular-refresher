import { Subject } from 'rxjs';

export class ProductsService {
  private products = [' A book'];
  productsUpdate = new Subject();

  addProduct(productName: string) {
    this.products.push(productName);
    this.productsUpdate.next();
  }

  getProducts() {
    return [...this.products];
  }

  deleteProduct(productName: string) {
    this.products = this.products.filter(
      product => product !== productName
    );
    this.productsUpdate.next();
  }
}
