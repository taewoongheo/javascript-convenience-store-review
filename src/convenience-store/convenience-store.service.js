// @ts-check

import OrderModel from '../order/Order.model.js';
import ConvenienceStoreModel from './convenience-store.model.js';
import OrderInputValidator from '../order/OrderInput.validator.js';
import OrderProduct from '../order/OrderProduct.js';
import OrderAmountValidator from '../order/OrderAmount.validator.js';
import OrderPromotionAddValidator from '../order/OrderPromotionAdd.validator.js';

class ConvenienceStoreService {
  /** @type {OrderModel} */
  #orderModel;

  /** @type {ConvenienceStoreModel} */
  #convenienceStoreModel;

  /** @type {OrderInputValidator} */
  #orderInputValidator;

  /** @type {OrderAmountValidator} */
  #orderAmountValidator;

  /** @type {OrderPromotionAddValidator} */
  #orderPromotionAddValidator;

  constructor({ models, providers }) {
    const {
      ConvenienceStoreModel: convenienceStoreModel,
      OrderModel: orderModel,
    } = models;
    const {
      OrderInputValidator: orderInputValidator,
      OrderAmountValidator: orderAmountValidator,
      OrderPromotionAddValidator: orderPromotionAddValidator,
    } = providers;

    this.#convenienceStoreModel = convenienceStoreModel;
    this.#orderModel = orderModel;
    this.#orderInputValidator = orderInputValidator;
    this.#orderAmountValidator = orderAmountValidator;
    this.#orderPromotionAddValidator = orderPromotionAddValidator;
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
        stockProductAmount:
          stockProduct === undefined
            ? undefined
            : stockProduct.amount + stockProduct.promotionAmount,
        orderedProductAmount: orderedProduct.amount,
      };
    });
    this.#orderAmountValidator.validate(productAmountObjects);
  }

  /**
   *
   * @param {string} order
   * @returns {Array<OrderProduct>}
   */
  generateOrder(order) {
    const orderedProduct = this.#generateOrder(order);
    this.#validateProductAmount(orderedProduct);
    return orderedProduct;
  }

  /**
   *
   * @param {Array<OrderProduct>} orderedProducts
   * @returns {Object}
   */
  checkPromotionAmount(orderedProducts) {
    return this.#convenienceStoreModel.checkPromotionAmount(orderedProducts);
  }

  /**
   *
   * @param {Array<OrderProduct>} orderedProducts
   */
  stockProcess(orderedProducts) {
    this.#convenienceStoreModel.decreaseProductsAmount(orderedProducts);
  }

  /**
   *
   * @param {Object} orderObj
   * @param {string | undefined} input
   */
  orderAmountChange(orderObj, input) {
    const { orderProduct, info } = orderObj;
    this.#orderPromotionAddValidator.validate(input);
    if (info > 0) {
      if (input === 'Y') {
        orderProduct.orderProduct.increaseAmont(1);
      }
    } else if (info < 0) {
      if (input === 'N') {
        orderProduct.orderProduct.decreaseAmount(Math.abs(info));
      }
    }
  }

  calculate(orderedProduct) {
    return this.#convenienceStoreModel.calculate(orderedProduct);
  }

  getStoredProduct() {
    return this.#convenienceStoreModel.getProducts();
  }
}

export default ConvenienceStoreService;
