/**
 * file: src/modules/checkout/usecase/place-order/place-order.usecase.spec.ts
 * description: file responsible for the definition of the place order use case test.
 * data: 12/15/2024
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import { PlaceOrderInputDto } from "./place-order.dto";
import PlaceOrderUseCase from "./place-order.usecase";

describe('PlaceOrder UseCase unit Test', () => {

  describe('validateProducts method', () => {
    //@ts-expect-error - no params in constructor
    const placeOrderUseCase = new PlaceOrderUseCase();

    it('should throw an error when no products are selected', async () => {
      const input: PlaceOrderInputDto = {
        clientId: '',
        products: [],
      };

      await expect(placeOrderUseCase['validateProducts'](input)).rejects.toThrow(new Error('No products selected'));
    });

    it('should throw an error when product is out of stock', async () => {
      const mockProductFacade = {
        checkStock: jest.fn(({ productId }: { productId: string }) => Promise.resolve({
          productId,
          stock: productId === '1' ? 0 : 1,
        })),
      };

      //@ts-expect-error - force set productFacade
      placeOrderUseCase['_productFacade'] = mockProductFacade;

      let input: PlaceOrderInputDto = {
        clientId: '0',
        products: [{ productId: '1' }],
      };

      await expect(placeOrderUseCase['validateProducts'](input)).rejects.toThrow(new Error('Product 1 is not available in stock'));

      expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(1);

      input = {
        clientId: '0',
        products: [{ productId: "0" }, { productId: "1" }, { productId: "2" }],
      };

      await expect(placeOrderUseCase['validateProducts'](input)).rejects.toThrow(new Error('Product 1 is not available in stock'));
      expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(3);
    });
  });

  describe('getProduct method', () => {
    beforeAll(() => {
      jest.useFakeTimers("modern");
      jest.setSystemTime(new Date(2000, 1, 1));
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    //@ts-expect-error - no params in constructor
    const placeOrderUseCase = new PlaceOrderUseCase();

    it('should throw an error when product not found', async () => {
      const mockCatalogFacade = {
        findById: jest.fn().mockResolvedValue(null),
      };

      //@ts-expect-error - force set catalogFacade
      placeOrderUseCase['_catalogFacade'] = mockCatalogFacade;

      await expect(placeOrderUseCase['getProduct']('0')).rejects.toThrow(new Error('Product not found'));
    });

    it('should return a product', async () => {
      const mockCatalogFacade = {
        findById: jest.fn().mockResolvedValue({
          id: '0',
          name: 'Product 0',
          description: 'Product 0 description',
          salesPrice: 0,
        }),
      };

      //@ts-expect-error - force set catalogFacade
      placeOrderUseCase['_catalogFacade'] = mockCatalogFacade;

      await expect(placeOrderUseCase['getProduct']('0')).resolves.toEqual(
        new Product({
          id: new Id('0'),
          name: 'Product 0',
          description: 'Product 0 description',
          salesPrice: 0,
        })
      );

      expect(mockCatalogFacade.findById).toHaveBeenCalledTimes(1);
    });
  });

  describe('execute method', () => {
    // buscar o cliente. Caso não encontre -> client not found
    it('should throw an error when client not found', async () => {
      const mockClientFacade = {
        find: jest.fn().mockResolvedValue(null),
      };

      //@ts-expect-error - no params in constructor
      const placeOrderUseCase = new PlaceOrderUseCase();
      //@ts-expect-error - force set clientFacade
      placeOrderUseCase['_clientFacade'] = mockClientFacade;

      const input: PlaceOrderInputDto = {
        clientId: '0',
        products: [],
      }

      await expect(placeOrderUseCase.execute(input)).rejects.toThrow(new Error('Client not found'));
    });

    it('should throw an error when product are not valid', async () => {
      const mockClientFacade = {
        find: jest.fn().mockResolvedValue(true),
      };

      //@ts-expect-error - no params in constructor
      const placeOrderUseCase = new PlaceOrderUseCase();

      const mockValidateProducts = jest
        //@ts-expect-error - spy on private method
        .spyOn(placeOrderUseCase, 'validateProducts')
        //@ts-expect-error - not return never
        .mockRejectedValue(new Error('No products selected'));

      //@ts-expect-error - force set clientFacade
      placeOrderUseCase['_clientFacade'] = mockClientFacade;

      const input: PlaceOrderInputDto = {
        clientId: '1',
        products: [],
      }

      await expect(placeOrderUseCase.execute(input)).rejects.toThrow(new Error('No products selected'));

      expect(mockValidateProducts).toHaveBeenCalledTimes(1);
    });

    describe("place an order", () => {
      const clientProps = {
        id: '1',
        name: 'Client 1',
        document: '000.000.000-00',
        email: 'gluacia@gmail.com',
        street: 'Street 1',
        number: '1',
        complement: 'Complement 1',
        city: 'City 1',
        state: 'State 1',
        zipCode: '00000-000',
      };

      const mockClientFacade = {
        find: jest.fn().mockResolvedValue(clientProps),
      };

      const mockPaymentFacade = {
        process: jest.fn(),
      };

      const mockCheckoutRepository = {
        addOrder: jest.fn(),
      };

      const mockInvoiceFacade = {
        create: jest.fn().mockResolvedValue({ id: "1t" })
      };

      const placeOrderUseCase = new PlaceOrderUseCase(
        mockClientFacade,
        null,
        null,
        mockCheckoutRepository,
        mockInvoiceFacade,
        mockPaymentFacade
      );

      const products = {
        '1': new Product({
          id: new Id('1'),
          name: 'Product 1',
          description: 'Product 1 description',
          salesPrice: 10,
        }),
        '2': new Product({
          id: new Id('2'),
          name: 'Product 2',
          description: 'Product 2 description',
          salesPrice: 20,
        }),
      };

      const mockValidateProducts = jest
        //@ts-expect-error - spy on private method
        .spyOn(placeOrderUseCase, 'validateProducts')
        //@ts-expect-error - spy on private method
        .mockResolvedValue(null);

      const mockGetProduct = jest
        //@ts-expect-error - spy on private method
        .spyOn(placeOrderUseCase, 'getProduct')
        //@ts-expect-error - spy on private method
        .mockImplementation((productId: keyof typeof products) => {
          return products[productId];
        });

      it('should not to be approved when payment is not approved', async () => {
        mockPaymentFacade.process = mockPaymentFacade.process.mockReturnValue({
          transactionId: '1t',
          orderId: '1o',
          amount: 100,
          status: 'error',
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        const input: PlaceOrderInputDto = {
          clientId: '1c',
          products: [{ productId: '1' }, { productId: '2' }],
        };

        let output = await placeOrderUseCase.execute(input);

        expect(output.invoiceId).toBeNull();
        expect(output.total).toBe(30);
        expect(output.products).toStrictEqual([
          { productId: '1' },
          { productId: '2' },
        ]);
        expect(mockClientFacade.find).toHaveBeenCalledTimes(1);
        expect(mockClientFacade.find).toHaveBeenCalledWith({ id: '1c' });
        expect(mockValidateProducts).toHaveBeenCalledTimes(1);
        expect(mockValidateProducts).toHaveBeenCalledWith(input);
        expect(mockGetProduct).toHaveBeenCalledTimes(2);
        expect(mockCheckoutRepository.addOrder).toHaveBeenCalledTimes(1);
        expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1);
        expect(mockPaymentFacade.process).toHaveBeenCalledWith({
          orderId: output.id,
          amount: output.total,
        });

        expect(mockInvoiceFacade.create).toHaveBeenCalledTimes(0);
      });
    });
  });
});