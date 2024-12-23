import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {filter, map, Subject, switchMap, takeUntil, tap, timer} from 'rxjs';
import {OrderService} from '../../core/services/order.service';
import {Order, OrderStatusEnum} from '../../core/domain/order';
import {AsyncPipe, CurrencyPipe, DatePipe, NgClass} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-order-detail',
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    CurrencyPipe,
    DatePipe,
    NgClass
  ],
  providers: [OrderService],
  templateUrl: './order-detail.component.html',
  standalone: true,
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent {

  readonly #activatedRoute = inject(ActivatedRoute);
  readonly #orderService = inject(OrderService);
  readonly #router = inject(Router)

  readonly order$;
  readonly destroy$ = new Subject<void>();
  readonly OrderStatusEnum = OrderStatusEnum;

  public readonly OrderStatusMapTypes = {
    NEW: 'bg-info',
    IN_PROGRESS: 'bg-warning',
    READY: 'bg-success',
    COMPLETED: 'bg-success'
  };

  constructor() {
    this.order$ = this.#activatedRoute.params.pipe(
      takeUntil(this.destroy$),
      filter(param => !!param['id']), // id must be truthy
      map(param => param['id']),
      switchMap(orderId =>
        timer(0, 3000).pipe(  // First emits immediately, then every 30 seconds
          switchMap(() => this.#orderService.getOrder(orderId).pipe(
            tap(order => this.destroySubOnCompleteOrder(order))
          ))
        )
      )
    );

  }

  public navigateToCustomerArea(): void {
    this.#router.navigate(['/customer']);
  }

  private destroySubOnCompleteOrder(order: Order): void {
    if (order.status === OrderStatusEnum.READY) {
      this.destroy$.next();
    }
  }

}
