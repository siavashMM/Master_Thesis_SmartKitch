// services/container.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UserService } from './user.service';
import { switchMap } from 'rxjs';


export interface Container {
  id: number;
  label: string | null;
  maxVolume: number | null;
  expirationDate: string | null;
}

@Injectable({ providedIn: 'root' })
export class ContainerService {
  private apiBase = 'https://wq822wnn45.execute-api.us-east-1.amazonaws.com/dev';

  constructor(private http: HttpClient, private userService: UserService) {}

  private getUserId(): number {
    const user = this.userService.getAppUser();
    if (!user) {
      throw new Error('User not initialized');
    }
    return user.userId;
  }

 getContainers(): Observable<{ containers: Container[] }> {
  return this.userService.getOrFetchUserId().pipe(
    switchMap(userId => this.http.get<{ containers: Container[] }>(
      `${this.apiBase}/containers?userId=${userId}`
    ))
  );
}


  updateContainer(container: Container): Observable<any> {
    return this.http.put(`${this.apiBase}/containers`, {
      id: container.id,
      label: container.label,
      expirationDate: container.expirationDate
    });
  }
createContainers(count: number): Observable<any> {
  return this.userService.getOrFetchUserId().pipe(
    switchMap(userId => {
      return this.http.post(`${this.apiBase}/containers`, {
        userId,
        count
      });
    })
  );
}


}
