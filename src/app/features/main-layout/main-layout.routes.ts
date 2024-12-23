import {Route} from '@angular/router';
import {MainLayoutComponent} from './main-layout.component';
import {InsertOrderComponent} from '../insert-order/insert-order.component';
import {CustomerLayoutComponent} from '../customer-layout/customer-layout.component';
import {OrderDetailComponent} from '../order-detail/order-detail.component';
import {OrderQueueComponent} from '../order-queue/order-queue.component';

export default [
  {
    path: '',
    component: MainLayoutComponent
  },
  {
    path: 'customer',
    component: CustomerLayoutComponent
  },
  {
    path: 'customer/order',
    component: InsertOrderComponent
  },
  {
    path: 'customer/order/detail/:id',
    component: OrderDetailComponent
  },
  {
    path: 'orders',
    component: OrderQueueComponent
  },
  {
    path: "**",
    component: MainLayoutComponent
  }
] as Route[]
