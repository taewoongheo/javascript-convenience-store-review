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

  #parseProductInfo(product) {
    const splitProduct = product.split(',');
    return [splitProduct[0], splitProduct[1], splitProduct[2], splitProduct[3]];
  }

  #generateProduct(product) {
    const [name, price, amount, promotion] = this.#parseProductInfo(product);
    return new ProductModel(name, price, amount, promotion);
  }

  #parseName(product) {
    return product[0];
  }

  /**
   *
   * @param {Object} products
   */
  storeProducts(products) {
    // TODO: 유효성 검증

    products.forEach((product) => {
      this.#convenienceStoreModel.addProduct(product);
    });
  }
}

export default ConvenienceStoreService;
