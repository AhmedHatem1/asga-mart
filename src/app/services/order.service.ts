import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersUrl = 'assets/orders.json';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.ordersUrl);
  }
  getOrder(orderId: number): Observable<Order | undefined> {
    return new Observable((observer) => {
      this.getOrders().subscribe(
        (orders) => {
          const order = orders.find(o => o.OrderId === orderId);
          observer.next(order);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }
}
