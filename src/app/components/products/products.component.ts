import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  editedProductId: number | null = null;
  newQuantity: number | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => console.error('Error fetching products:', error)
    );
  }

  startEditing(productId: number, quantity: number) {
    this.editedProductId = productId;
    this.newQuantity = quantity;
  }

  saveQuantity(productId: number) {
    if (this.newQuantity !== null) {
      this.productService.editProductQuantity(productId, this.newQuantity).subscribe(
        (updatedProduct) => {
          const index = this.products.findIndex((p) => p.ProductId === productId);
          if (index !== -1) {
            this.products[index] = updatedProduct;
          }
          this.cancelEditing();
        },
        (error) => console.error('Error updating product quantity:', error)
      );
    }
  }

  cancelEditing() {
    this.editedProductId = null;
    this.newQuantity = null;
  }
}
