import {Component, inject} from '@angular/core';
import {OrderService} from '../../core/services/order.service';
import {Router} from '@angular/router';
import {AsyncPipe, DatePipe, KeyValuePipe, Location} from '@angular/common';
import {Order, OrderStatusEnum} from '../../core/domain/order';
import {TimeAgoPipe} from '../../core/directives/time-ago.pipe';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NotificationsService} from '../../core/services/notifications.service';
import {finalize} from 'rxjs';

@Component({
  selector: 'app-order-queue',
  imports: [
    AsyncPipe,
    TimeAgoPipe,
    DatePipe,
    ReactiveFormsModule,
    KeyValuePipe,
    FormsModule
  ],
  providers: [OrderService],
  templateUrl: './order-queue.component.html',
  standalone: true,
  styleUrl: './order-queue.component.css'
})
export class OrderQueueComponent {
  readonly #orderService = inject(OrderService);
  readonly #notificationsService = inject(NotificationsService);
  readonly #router = inject(Router);
  readonly location = inject(Location)

  readonly ordersQueue$ = this.#orderService.getOrderQueue();

  readonly OrderStatusEnum = OrderStatusEnum;

  onStatusChange(order: Order, status: HTMLSelectElement) {
    if (status.value === 'READY') {
      status.disabled = true;
    }

    this.#orderService.updateOrderStatus(order.id, status.value as OrderStatusEnum).pipe(
      finalize(() => this.#notificationsService.onNotificationChange({title: 'Order updated'}))
    ).subscribe()
  }
}
