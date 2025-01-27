// @ts-check

import ProductModel from '../Product.js';

class ConvenienceStoreModel {
  /** @type {Array<ProductModel>} */
  #products;

  /**
   *
   * @param {Array<ProductModel>} products
   */
  setProducts(products) {
    this.#products = products;
  }
}

export default ConvenienceStoreModel;
