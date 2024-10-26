import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';
import { CustomerService } from '../../services/customer.service';
import { Order } from '../../models/order.model';
import { Product } from '../../models/product.model';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  order!: Order;
  customer!: Customer;
  orderedProducts: { product: Product; quantity: number }[] = [];


  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private productService: ProductService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    const orderId = +this.route.snapshot.paramMap.get('id')!;
    this.loadOrderDetails(orderId);
  }

  loadOrderDetails(orderId: number): void {
    this.orderService.getOrder(orderId).subscribe(
      (order) => {
        if (order) {
          this.order = order;
          this.loadCustomerDetails(order.UserId);
          this.loadOrderedProducts(order.Products);
        } else {
          console.error(`Order with ID ${orderId} not found`);
        }
      },
      (error) => {
        console.error('Error loading order:', error);
      }
    );
  }

  loadCustomerDetails(userId: string): void {
    this.customerService.getCustomer(userId).subscribe(
      (customer) => {
        this.customer = customer;
      },
      (error) => {
        console.error('Error loading customer:', error);
      }
    );
  }

  loadOrderedProducts(orderProducts: { ProductId: number; Quantity: number }[]): void {
    this.orderedProducts = [];
    orderProducts.forEach((orderProduct) => {
      this.productService.getProduct(orderProduct.ProductId).subscribe(
        (product:any) => {
          this.orderedProducts.push({ product, quantity: orderProduct.Quantity });
        },
        (error) => {
          console.error('Error loading product:', error);
        }
      );
    });
  }

  calculateProductTotalPrice(quantity: number, price: number): number {
    return quantity * price;
  }

  getOrderDate(orderDate:string){
    return new Date(orderDate);
  }
}
