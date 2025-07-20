import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../interfaces/order.interface';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  isLoading = false;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading = true;
    this.orderService.getAllOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading orders:', error);
        this.isLoading = false;
        alert('Failed to load orders. Please try again.');
      }
    });
  }

  updateOrderStatus(orderId: string, newStatus: Order['status']): void {
    this.orderService.updateOrderStatus(orderId, newStatus).subscribe({
      next: () => {
        this.loadOrders();
        alert('Order status updated successfully!');
      },
      error: (error) => {
        console.error('Error updating order status:', error);
        if (error.error?.error) {
          alert(error.error.error);
        } else {
          alert('Failed to update order status. Please try again.');
        }
      }
    });
  }

  getStatusBadgeClass(status: Order['status']): string {
    switch (status) {
      case 'pending': return 'bg-warning';
      case 'processing': return 'bg-info';
      case 'shipped': return 'bg-primary';
      case 'delivered': return 'bg-success';
      case 'cancelled': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }

  getTotalItems(order: Order): number {
    return order.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  isUserObject(user: User | string): user is User {
    return typeof user === 'object' && user !== null;
  }

  // Statistics methods
  getPendingCount(): number {
    return this.orders.filter(o => o.status === 'pending').length;
  }

  getProcessingCount(): number {
    return this.orders.filter(o => o.status === 'processing').length;
  }

  getShippedCount(): number {
    return this.orders.filter(o => o.status === 'shipped').length;
  }

  getDeliveredCount(): number {
    return this.orders.filter(o => o.status === 'delivered').length;
  }
}
