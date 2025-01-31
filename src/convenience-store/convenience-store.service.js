// @ts-check

import OrderModel from '../order/Order.model.js';
import ProductModel from '../product/Product.js';
import ConvenienceStoreModel from './convenience-store.model.js';
import OrderValidator from '../order/Order.validator.js';

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
   * @param {string} products
   */
  getProducts(products) {}
}

export default ConvenienceStoreService;
