// @ts-check

import OrderProduct from '../order/OrderProduct.js';
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
      const p = this.getProductByName(product[0]);
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
   * @returns {ProductModel}
   */
  getProductByName(name) {
    return this.#products.filter((product) => product.name === name)[0];
  }

  /**
   *
   * @returns {Array<ProductModel>}
   */
  getProducts() {
    return this.#products;
  }

  /**
   *
   * @param {Array<OrderProduct>} orderedProducts
   */
  decreaseProductsAmount(orderedProducts) {
    orderedProducts.forEach((product) => {
      const findProduct = this.getProductByName(product.name);
      findProduct.decreaseAmount(product.amount);
    });
  }
}

export default ConvenienceStoreModel;
