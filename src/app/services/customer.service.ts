import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  getCustomers(): Observable<any> {
    return this.http.get('assets/users.json');
  }

  getCustomer(userId: string): Observable<any> {
    return this.getCustomers().pipe(
      map((customers: any[]) => customers.find((customer) => customer.Id === userId))
    );
  }
}
