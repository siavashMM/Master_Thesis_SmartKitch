import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UserService } from './user.service';

export interface OrderItem {
  containerId: number;
  label: string;
  amount: number;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private apiBase = 'https://wq822wnn45.execute-api.us-east-1.amazonaws.com/dev';

  constructor(private http: HttpClient, private userService: UserService) {}

  sendOrder(order: OrderItem[]): Observable<any> {
    const user = this.userService.getAppUser();
    if (!user) return throwError(() => new Error('User not loaded'));

    return this.http.post(`${this.apiBase}/orders`, {
      userId: user.userId,
      items: order
    });
  }
}
