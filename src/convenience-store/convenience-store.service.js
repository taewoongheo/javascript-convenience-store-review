// @ts-check

import ProductModel from '../Product.js';
import ConvenienceStoreModel from './convenience-store.model.js';
import ConvenienceStoreValidate from './convenience-store.validate.js';

class ConvenienceStoreService {
  /** @type {ProductModel} */
  #productModel;

  /** @type {ConvenienceStoreModel} */
  #convenienceStoreModel;

  /** @type {ConvenienceStoreValidate} */
  #convenienceStoreValidator;

  constructor({ models, providers }) {
    const {
      ConvenienceStoreModel: convenienceStoreModel,
      Product: productModel,
    } = models;
    const { ConvenienceStoreValidator: convenienceStoreValidator } = providers;

    this.#productModel = productModel;
    this.#convenienceStoreModel = convenienceStoreModel;
    this.#convenienceStoreValidator = convenienceStoreValidator;
  }

  /**
   *
   * @param {Object} products
   */
  storeProducts(products) {
    // TODO: 유효성 검증
    this.#convenienceStoreModel.setProducts(products);
  }
}

export default ConvenienceStoreService;
