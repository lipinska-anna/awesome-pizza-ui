import {Component, computed, inject, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {InsertOrderFormGroup, Pizzas} from './insert-order.types';
import {Location, NgForOf} from '@angular/common';
import {Router} from '@angular/router';
import {EnumValuesPipe} from '../../core/directives/enum-values.pipe';
import {OrderStatusEnum} from '../../core/domain/order';
import {OrderService} from '../../core/services/order.service';
import {tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-insert-order',
  imports: [
    ReactiveFormsModule,
    NgForOf,
    EnumValuesPipe
  ],
  providers: [OrderService, HttpClient],
  templateUrl: './insert-order.component.html',
  standalone: true,
  styleUrl: './insert-order.component.css'
})
export class InsertOrderComponent {

  readonly location = inject(Location)
  readonly #router = inject(Router)
  readonly #orderService = inject(OrderService)
  readonly #fb = inject(FormBuilder);
  readonly orderForm = this.#fb.group<InsertOrderFormGroup>({
    allergensNote: this.#fb.control(''),
    price: this.#fb.control(0, {nonNullable: true}),
    customerName: this.#fb.control('', {nonNullable: true}),
    pizzaType: this.#fb.control('', {nonNullable: true}),
    status: this.#fb.control(OrderStatusEnum.NEW, {nonNullable: true})
  });

  public Pizzas = Pizzas;
  submit = computed(() => this.createOrder())

  constructor() {
    this.orderForm.get('pizzaType')?.valueChanges.pipe(
      tap((pizzaType: string) => this.orderForm.get('price')?.setValue(this.Pizzas[pizzaType as keyof typeof Pizzas]))
    ).subscribe();
  }

  public createOrder() {
    if (this.orderForm.valid) {
      const orderValue = this.orderForm.value;
      this.#orderService.createOrder(orderValue)
        .pipe(tap(order => this.#router.navigate([`/customer/order/detail/${order.id}`])))
        .subscribe()
    }
  }

}
