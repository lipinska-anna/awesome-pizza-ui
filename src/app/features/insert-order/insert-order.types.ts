import {FormControl} from '@angular/forms';

export interface InsertOrderFormGroup {
  customerName: FormControl<string>;
  pizzaType: FormControl<string>;
  price: FormControl<number>;
  allergensNote: FormControl<string | null>;
  status: FormControl<OrderStatusEnum>;
}

export enum OrderStatusEnum {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  READY = 'READY',
  COMPLETED = 'COMPLETED'
}
