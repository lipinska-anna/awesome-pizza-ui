export interface Order {
  id: string;
  customerName: string;
  pizzaType: string;
  price: number;
  allergensNote: string;
  status: OrderStatusEnum;
  createdOn: Date;
  readyTime: Date;
}

export enum OrderStatusEnum {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  READY = 'READY'
}
