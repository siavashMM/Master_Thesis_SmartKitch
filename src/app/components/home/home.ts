// src/app/components/home/home.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { ContainerService } from '../../services/container.service';
import { UserService } from '../../services/user.service';
import { ContainerDialogComponent } from '../container-dialog.component'; // This is the dialog you created

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  orderStatus = 'Idle';
  progressPercent: number | null = null;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private userService: UserService,
    private containerService: ContainerService
  ) {
    router.events.subscribe(console.log); // optional: log navigation events
  }

  addOrder() {
  this.userService.ensureUserExists().subscribe({
    next: () => {
      this.containerService.getContainers().subscribe({
        next: (res) => {
          const containers = res.containers;
          if (containers.length > 0) {
            // ✅ User already has containers — go directly to /order
            this.router.navigate(['/order']);
          } else {
            // ❗ No containers — open dialog to create them
            const dialogRef = this.dialog.open(ContainerDialogComponent);

            dialogRef.afterClosed().subscribe((count: number) => {
              if (count && count > 0) {
                this.containerService.createContainers(count).subscribe({
                  next: () => {
                    this.router.navigate(['/order']);
                  },
                  error: (err) => {
                    console.error('Failed to create containers:', err);
                    alert('Failed to create containers.');
                  }
                });
              }
            });
          }
        },
        error: (err) => {
          console.error('Failed to fetch containers:', err);
          alert('Failed to fetch containers.');
        }
      });
    },
    error: (err) => {
      console.error('Failed to ensure user exists:', err);
      alert('Failed to register user in database.');
    }
  });
}

}
