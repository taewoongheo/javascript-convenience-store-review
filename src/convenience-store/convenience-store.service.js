// @ts-check

import OrderModel from '../order/Order.model.js';
import ProductModel from '../product/Product.js';
import ConvenienceStoreModel from './convenience-store.model.js';
import OrderValidator from '../order/Order.validator.js';
import OrderProduct from '../order/OrderProduct.js';

class ConvenienceStoreService {
  /** @type {ProductModel} */
  #productModel;

  /** @type {OrderModel} */
  #orderModel;

  /** @type {ConvenienceStoreModel} */
  #convenienceStoreModel;

  /** @type {OrderValidator} */
  #orderValidator;

  constructor({ models, providers }) {
    const {
      ConvenienceStoreModel: convenienceStoreModel,
      Product: productModel,
      OrderModel: orderModel,
    } = models;
    const { OrderValidator: orderValidator } = providers;

    this.#convenienceStoreModel = convenienceStoreModel;
    this.#productModel = productModel;
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
    // TODO: orderValidator 유효성 검사
    return this.#orderModel.getOrderedProducts(order);
  }
}

export default ConvenienceStoreService;
