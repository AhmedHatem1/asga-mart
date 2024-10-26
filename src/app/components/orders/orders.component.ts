import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order.model';
import { Product } from '../../models/product.model';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  products: Product[] = [];

  constructor(
    private orderService: OrderService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
    this.loadProducts();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe(
      (orders: Order[]) => {
        this.orders = orders;
      },
      (error) => {
        console.error('Error loading orders:', error);
      }
    );
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
      },
      (error) => {
        console.error('Error loading products:', error);
      }
    );
  }

  calculateTotalPrice(orderProducts: { ProductId: number; Quantity: number }[]): number {
    let totalPrice = 0;
    orderProducts.forEach((orderProduct) => {
      const product = this.products.find((p) => p.ProductId === orderProduct.ProductId);
      if (product) {
        totalPrice += product.ProductPrice * orderProduct.Quantity;
      }
    });
    return totalPrice;
  }

  getOrderDate(orderDate:string){
    return new Date(orderDate)
  }
}
