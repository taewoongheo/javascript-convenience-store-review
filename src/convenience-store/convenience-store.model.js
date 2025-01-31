// @ts-check

import ProductModel from '../product/Product.js';

class ConvenienceStoreModel {
  /** @type {Array<ProductModel>} */
  #products;

  constructor() {
    this.#products = [];
  }

  /**
   *
   * @param {ProductModel} product
   */
  addProduct(product) {
    if (this.#isIncludeProduct(product[0])) {
      const p = this.#findProductByName(product[0])[0];
      p.addAmount(Number(product[2]), product[3]);
    } else {
      this.#products.push(
        new ProductModel(
          product[0],
          Number(product[1]),
          Number(product[2]),
          product[3],
        ),
      );
    }
  }

  /**
   *
   * @param {string} name
   * @returns {boolean}
   */
  #isIncludeProduct(name) {
    return this.#products.some((product) => product.name === name);
  }

  /**
   *
   * @param {string} name
   * @returns {ProductModel[]}
   */
  #findProductByName(name) {
    return this.#products.filter((product) => product.name === name);
  }

  getProducts() {
    return this.#products;
  }
}

export default ConvenienceStoreModel;
