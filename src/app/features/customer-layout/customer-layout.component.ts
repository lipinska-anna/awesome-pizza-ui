import {Component, inject} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-customer-layout',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './customer-layout.component.html',
  standalone: true,
  styleUrl: './customer-layout.component.css'
})
export class CustomerLayoutComponent {

  readonly location = inject(Location)
  readonly #router = inject(Router)
  readonly orderIdControl = new FormControl<string>('', Validators.required);

  public navigateToCreateOrder(): void {
      this.#router.navigate([`/customer/order`]);
  }

  public navigateToMonitOrder(): void {
    if (this.orderIdControl.valid) {
      this.#router.navigate([`/customer/order/detail/${this.orderIdControl.value}`]);
    }
  }
}
