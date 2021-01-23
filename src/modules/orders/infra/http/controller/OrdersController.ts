import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateOrderService from '@modules/orders/services/CreateOrderService';
import FindOrderService from '@modules/orders/services/FindOrderService';

export default class OrdersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const order_id = request.params.id;

    const orderService = container.resolve(FindOrderService);
    const order = await orderService.execute({ id: order_id });
    return response.json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body;
    const createOrderService = container.resolve(CreateOrderService);
    const orderService = await createOrderService.execute({
      customer_id,
      products,
    });

    return response.json(classToClass(orderService));
  }
}
