import {FormControl} from '@angular/forms';
import {OrderStatusEnum} from '../../core/domain/order';

export interface InsertOrderFormGroup {
  customerName: FormControl<string>;
  pizzaType: FormControl<string>;
  price: FormControl<number>;
  allergensNote: FormControl<string | null>;
  status: FormControl<OrderStatusEnum>;
}

export enum Pizzas {
  'Margherita' = 10.0,
  'Quattro Stagioni' = 14.0,
  'Quattro Formaggi' = 13.0,
  'Capricciosa' = 15.0,
  'Marinara' = 9.0,
  'Prosciutto e Funghi' = 13.0,
  'Bufalina' = 14.0,
  'Tuna and Onion' = 13.0,
  'Calzone' = 14.0,
}

