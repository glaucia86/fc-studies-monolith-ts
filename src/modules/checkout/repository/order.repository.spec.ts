/**
 * file: src/modules/checkout/repository/order.repository.spec.ts
 * description: file responsible for the definition of the order repository.
 * data: 01/07/2025
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { Sequelize } from "sequelize-typescript";
import { OrderModel } from "./order.model";
import Product from "../domain/product.entity";
import Client from "../domain/client.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Order from "../domain/order.entity";
import { OrderRepository } from "./order.repository";

const mockDate = new Date(2025, 1, 1);

describe('OrderRepository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([OrderModel]);
    await sequelize.sync();

    jest.useFakeTimers("modern");
    jest.setSystemTime(mockDate);
  });

  afterEach(async () => {
    await sequelize.close();
    jest.useRealTimers();
  });

  it('should create a new order', async () => {
    const product1 = new Product({
      name: 'Product 1',
      salesPrice: 100,
      description: 'Product 1 description',
    });

    const product2 = new Product({
      name: 'Product 2',
      salesPrice: 200,
      description: 'Product 2 description',
    });

    const orderClient = new Client({
      id: new Id('1'),
      name: 'Client 1',
      email: 'email@email.com',
      address: 'Client 1 address',
    });

    const order = new Order({
      client: orderClient,
      products: [product1, product2],
      invoiceId: '123',
    });

    order.approved();

    const orderRepository = new OrderRepository();
    const result = await orderRepository.addOrder(order);

    expect(result).toStrictEqual(order);
  });

  it('should find an order', async () => {
    const orderData = {
      id: '1',
      createdAt: mockDate,
      updatedAt: mockDate,
      status: 'approved',
      invoiceId: '123',
      client: {
        id: '1',
        createdAt: mockDate,
        updatedAt: mockDate,
        name: 'Client 1',
        email: 'email@email.com',
        address: 'Client 1 address',
      },
      products: [
        {
          id: '1',
          createdAt: mockDate,
          updatedAt: mockDate,
          name: 'Product 1',
          salesPrice: 100,
          description: 'Product 1 description',
        },
        {
          id: '2',
          createdAt: mockDate,
          updatedAt: mockDate,
          name: 'Product 2',
          salesPrice: 200,
          description: 'Product 2 description',
        },
      ],
    };

    await OrderModel.create(orderData);
    const orderRepository = new OrderRepository();

    const result = await orderRepository.findOrder('1');

    expect(result.id.id).toEqual(orderData.id);
    expect(result.status).toEqual(orderData.status);
    expect(result.invoiceId).toEqual(orderData.invoiceId);

    const clientResult = result.client;
    expect(clientResult.id).toEqual(orderData.client.id);
    expect(clientResult.name).toEqual(orderData.client.name);
    expect(clientResult.email).toEqual(orderData.client.email);
    expect(clientResult.address).toEqual(orderData.client.address);

    expect(result.products.length).toEqual(orderData.products.length);

    const firstProductResult = result.products[0];
    expect(firstProductResult.id).toEqual(orderData.products[0].id);
    expect(firstProductResult.name).toEqual(orderData.products[0].name);
    expect(firstProductResult.salesPrice).toEqual(orderData.products[0].salesPrice);
    expect(firstProductResult.description).toEqual(orderData.products[0].description);
  });
});