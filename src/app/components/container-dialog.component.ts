// src/app/components/container-dialog/container-dialog.component.ts
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-container-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule
  ],
  template: `
    <h2 mat-dialog-title>Station Setup</h2>

    <mat-dialog-content>
      <p>How many containers does your station have?</p>
      <mat-form-field appearance="outline">
        <input matInput type="number" [(ngModel)]="count" min="1" placeholder="Enter number of containers" />
      </mat-form-field>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="dialogRef.close(null)">Cancel</button>
      <button mat-flat-button color="primary" [disabled]="!isValid()" (click)="dialogRef.close(count)">
        OK
      </button>
    </mat-dialog-actions>
  `,
})
export class ContainerDialogComponent {
  count: number | null = null;

  constructor(public dialogRef: MatDialogRef<ContainerDialogComponent>) {}

  isValid(): boolean {
    return this.count !== null && this.count > 0;
  }
}
