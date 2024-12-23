import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Order, OrderStatusEnum} from '../domain/order';

@Injectable()
export class OrderService {

  #http = inject(HttpClient)
  private static baseUrl = '/api/order';

  constructor() {
  }

  public createOrder(order: any) {
    return this.#http.post<Order>(`${OrderService.baseUrl}/create`, order);
  }

  public updateOrderStatus(id: string, status: OrderStatusEnum) {
    return this.#http.put(`${OrderService.baseUrl}/update/${id}/${status}`, {});
  }

  public deleteOrder(id: string) {
    return this.#http.delete(`${OrderService.baseUrl}/delete/${id}`);
  }

  public getOrder(id: string) {
    return this.#http.get<Order>(`${OrderService.baseUrl}/${id}`);
  }

  public getOrderQueue() {
    return this.#http.get<Order[]>(`${OrderService.baseUrl}/queue`);
  }

}
