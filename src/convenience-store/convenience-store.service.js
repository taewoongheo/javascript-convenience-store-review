// @ts-check

import OrderModel from '../order/Order.model.js';
import ProductModel from '../product/Product.js';
import ConvenienceStoreModel from './convenience-store.model.js';
import OrderValidator from '../order/Order.validator.js';
import OrderProduct from '../order/OrderProduct.js';

class ConvenienceStoreService {
  /** @type {OrderModel} */
  #orderModel;

  /** @type {ConvenienceStoreModel} */
  #convenienceStoreModel;

  /** @type {OrderValidator} */
  #orderValidator;

  constructor({ models, providers }) {
    const {
      ConvenienceStoreModel: convenienceStoreModel,
      OrderModel: orderModel,
    } = models;
    const { OrderValidator: orderValidator } = providers;

    this.#convenienceStoreModel = convenienceStoreModel;
    this.#orderModel = orderModel;
    this.#orderValidator = orderValidator;
  }

  /**
   *
   * @param {Object} products
   */
  storeProducts(products) {
    products.forEach((product) => {
      this.#convenienceStoreModel.addProduct(product);
    });
  }

  /**
   *
   * @param {string} order
   * @returns {Array<OrderProduct>}
   */
  generateOrder(order) {
    this.#orderValidator.validate(order);
    return this.#orderModel.getOrderedProducts(order);
  }

  /**
   *
   * @param {Array<OrderProduct>} orderedProducts
   * @returns {boolean}
   */
  isAllStocksAmountSufficient(orderedProducts) {
    return orderedProducts.every((orderedProduct) => {
      const stockProduct = this.#convenienceStoreModel.getProductByName(
        orderedProduct.name,
      );
      if (stockProduct === undefined) {
        return false;
      }
      return stockProduct.amount >= orderedProduct.amount;
    });
  }
}

export default ConvenienceStoreService;
