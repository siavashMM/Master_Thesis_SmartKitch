// services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, of, switchMap, throwError, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';


export interface AppUser {
  userId: number;
  username: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
    private apiBase = 'https://wq822wnn45.execute-api.us-east-1.amazonaws.com/dev';
    private appUser: AppUser | null = null;
    private cognitoUser: any = null;

    constructor(private http: HttpClient) {}

    // Called from AppComponent
    setCognitoUser(user: any) {
        this.cognitoUser = user;
    }

    getCognitoUser() {
        return this.cognitoUser;
    }

    getAppUser(): AppUser | null {
        console.log('[UserService] Returning user:', this.appUser);
        return this.appUser;
    }
ensureUserExists(): Observable<AppUser> {
  if (!this.cognitoUser) {
    return throwError(() => new Error('Cognito user not set'));
  }

  const email = this.cognitoUser?.attributes?.email ?? this.cognitoUser?.signInDetails?.loginId;
  const username = this.cognitoUser?.username ?? email;

  console.log('Resolved email:', email);
  console.log('Resolved username:', username);

  if (!email || !username) {
    return throwError(() => new Error('Missing email or username from Cognito user'));
  }

  const getUrl = `${this.apiBase}/user?email=${encodeURIComponent(email)}`;

  return this.http.get<AppUser>(getUrl).pipe(
    tap((user) => (this.appUser = user))
  );
}
getOrFetchUserId(): Observable<number> {
  if (this.appUser) {
    return of(this.appUser.userId);
  } else {
    return this.ensureUserExists().pipe(
      switchMap(user => of(user.userId))
    );
  }
}


}
