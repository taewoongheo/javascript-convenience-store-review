import OrderProduct from '../../src/order/OrderProduct.js';
import { createTestService } from './test-doubles/index.js';

describe('ConvenienceStoreService', () => {
  describe('isAllStocksAmountSufficient', () => {
    let service;
    let convenienceStoreModel;

    beforeEach(() => {
      const { service: s, dependencies } = createTestService();
      service = s;
      convenienceStoreModel = dependencies.models.ConvenienceStoreModel;
    });

    it('모든 Product의 각 amount가 OrderProdct의 amount 보다 많을 시 true를 반환한다', () => {
      const orderedProducts = [
        new OrderProduct('사이다', 5),
        new OrderProduct('콜라', 15),
      ];

      convenienceStoreModel.getProductByName
        .mockReturnValueOnce({ name: '사이다', amount: 10 })
        .mockReturnValueOnce({ name: '콜라', amount: 20 });

      const result = service.isAllStocksAmountSufficient(orderedProducts);

      expect(result).toBe(true);
      expect(convenienceStoreModel.getProductByName).toHaveBeenCalledTimes(2);
      expect(convenienceStoreModel.getProductByName).toHaveBeenCalledWith(
        '사이다',
      );
      expect(convenienceStoreModel.getProductByName).toHaveBeenCalledWith(
        '콜라',
      );
    });

    it('하나의 Product라도 amount가 OrderProduct의 amount 보다 적을 시 false를 반환한다', () => {
      const orderedProducts = [
        new OrderProduct('사이다', 5),
        new OrderProduct('콜라', 21),
      ];

      convenienceStoreModel.getProductByName
        .mockReturnValueOnce({ name: '사이다', amount: 10 })
        .mockReturnValueOnce({ name: '콜라', amount: 20 });

      const result = service.isAllStocksAmountSufficient(orderedProducts);

      expect(result).toBe(false);
      expect(convenienceStoreModel.getProductByName).toHaveBeenCalledTimes(2);
      expect(convenienceStoreModel.getProductByName).toHaveBeenCalledWith(
        '사이다',
      );
      expect(convenienceStoreModel.getProductByName).toHaveBeenCalledWith(
        '콜라',
      );
    });
  });
});
