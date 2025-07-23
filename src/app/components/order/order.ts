import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContainerService, Container } from '../../services/container.service';
import { OrderService, OrderItem } from '../../services/order.service';


@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [ ],
  templateUrl: './order.html',
  styleUrl: './order.scss'
})
export class Order implements OnInit {
  containers: Container[] = [];
  order: OrderItem[] = [];
  selectedContainer: Container | null = null;

  constructor(
    private containerService: ContainerService,
    private orderService: OrderService
  ) {}


  loadContainers(): void {
    this.containerService.getContainers().subscribe({
      next: (data) => {
      this.containers = data.containers // 👈 FIX HERE
      },
      error: (err) => {
        console.error('Failed to load containers:', err);
      }
    });
  }

  editexpirationDate(container: Container) {
    const newExpiry = prompt('Enter expiration date (YYYY-MM-DD):', container.expirationDate || '');

    if (newExpiry !== null && newExpiry.trim() !== '') {
      container.expirationDate = newExpiry.trim();
      this.containerService.updateContainer(container).subscribe({
        next: (res) => {
          console.log('Expiration date updated:', res);
          alert('Container expiration updated successfully.');
        },
        error: (err) => {
          console.error('Failed to update expiration:', err);
          alert('Failed to update expiration date.');
        }
      });
    }
  }

  editlable(container: Container) {
    const newLabel = prompt('Enter new label:', container.label || '');

    if (newLabel !== null && newLabel.trim() !== '') {
      container.label = newLabel.trim();
      this.containerService.updateContainer(container).subscribe({
        next: (res) => {
          console.log('Label updated:', res);
          alert('Container label updated successfully.');
        },
        error: (err) => {
          console.error('Failed to update label:', err);
          alert('Failed to update label.');
        }
      });
    }
  }

  selectContainer(container: Container) {
    if (!container.label) {
      alert(`Container ${container.id} is unlabeled. Please label it first.`);
      return;
    }
    const amount = prompt(`Enter amount for ${container.label} (max ${container.maxVolume ?? 'unknown'}cc):`);
    const parsedAmount = parseInt(amount || '0', 10);
    if (parsedAmount > 0) {
      this.order.push({
        containerId: container.id,
        label: container.label,
        amount: parsedAmount
      });
    } else {
      alert('Invalid amount.');
    }
  }

  removeItem(index: number) {
    this.order.splice(index, 1);
  }

  sendOrder() {
    console.log('Sending order:', this.order);
    this.orderService.sendOrder(this.order).subscribe({
      next: (res) => {
        console.log('Order sent successfully:', res);
        alert('Order sent!');
        this.order = [];
      },
      error: (err) => {
        console.error('Failed to send order:', err);
        alert('Failed to send order.');
      }
    });
  }

  cancel() {
    this.order = [];
  }

  setSelectedContainer(container: Container) {
    this.selectedContainer = container;
  }

  orderHistory: any[] = [];

  loadOrderHistory(): void {
    this.orderService.getUserOrders().subscribe({
      next: (res) => {
        this.orderHistory = res.orders;
      },
      error: (err) => {
        console.error('Failed to fetch order history:', err);
      }
    });
  }
  
  ngOnInit(): void {
    this.loadContainers();
  this.loadOrderHistory(); // ✅ Fetch on init
  }



}
