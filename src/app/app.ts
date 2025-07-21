import { Component, signal } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector:'app-root',
  templateUrl:'./app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Smart_Kitchen');
 constructor(private userService: UserService) {}

  onUserAuthenticated(user: any) {
    this.userService.setCognitoUser(user);
      }

  
}
