import ConvenienceStoreService from '../../../src/convenience-store/convenience-store.service.js';

export const createMockConvenienceStoreModel = () => ({
  addProduct: jest.fn(),
  getProduct: jest.fn(),
  getProductByName: jest.fn(),
});

export const createMockOrderModel = () => ({
  getOrderedProducts: jest.fn(),
});

export const createMockOrderValidator = () => ({
  validate: jest.fn(),
});

export const createTestService = () => {
  const mockDependencies = {
    models: {
      ConvenienceStoreModel: createMockConvenienceStoreModel(),
      OrderModel: createMockOrderModel(),
    },
    providers: {
      OrderValidator: createMockOrderValidator(),
    },
  };

  return {
    service: new ConvenienceStoreService(mockDependencies),
    dependencies: mockDependencies,
  };
};
