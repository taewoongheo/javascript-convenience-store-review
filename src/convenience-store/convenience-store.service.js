// @ts-check

import OrderModel from '../order/Order.model.js';
import ConvenienceStoreModel from './convenience-store.model.js';
import OrderInputValidator from '../order/OrderInput.validator.js';
import OrderProduct from '../order/OrderProduct.js';
import OrderAmountValidator from '../order/OrderAmount.validator.js';

class ConvenienceStoreService {
  /** @type {OrderModel} */
  #orderModel;

  /** @type {ConvenienceStoreModel} */
  #convenienceStoreModel;

  /** @type {OrderInputValidator} */
  #orderInputValidator;

  /** @type {OrderAmountValidator} */
  #orderAmountValidator;

  constructor({ models, providers }) {
    const {
      ConvenienceStoreModel: convenienceStoreModel,
      OrderModel: orderModel,
    } = models;
    const {
      OrderInputValidator: orderInputValidator,
      OrderAmountValidator: orderAmountValidator,
    } = providers;

    this.#convenienceStoreModel = convenienceStoreModel;
    this.#orderModel = orderModel;
    this.#orderInputValidator = orderInputValidator;
    this.#orderAmountValidator = orderAmountValidator;
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
  #generateOrder(order) {
    this.#orderInputValidator.validate(order);
    return this.#orderModel.getOrderedProducts(order);
  }

  /**
   *
   * @param {Array<OrderProduct>} orderedProducts
   * @throws {Error}
   */
  #validateProductAmount(orderedProducts) {
    const productAmountObjects = orderedProducts.map((orderedProduct) => {
      const stockProduct = this.#convenienceStoreModel.getProductByName(
        orderedProduct.name,
      );
      return {
        stockProductAmount: stockProduct?.amount,
        orderedProductAmount: orderedProduct.amount,
      };
    });
    this.#orderAmountValidator.validate(productAmountObjects);
  }

  /**
   *
   * @param {string} order
   */
  buyProducts(order) {
    const orderedProduct = this.#generateOrder(order);
    this.#validateProductAmount(orderedProduct);
    // TODO: 차감
  }
}

export default ConvenienceStoreService;
