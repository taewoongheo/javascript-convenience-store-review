// @ts-check

import SPLITTER from './const.js';
import OrderProduct from './OrderProduct.js';

class OrderModel {
  /** @type {Array<OrderProduct>} */
  #products;

  constructor() {
    this.#products = [];
  }

  /**
   *
   * @param {string} products
   * @returns {Array<string>}
   */
  #parseProducts(products) {
    return products.trim().split(SPLITTER.PRODUCT_SPLITTER);
  }

  /**
   *
   * @param {string} productStr
   * @returns {Array<string>}
   */
  #parseProductNameAndAmount(productStr) {
    const product = productStr.trim().replace(/\[|\]/g, '');
    const [name, amount] = product.split(SPLITTER.NAME_AND_AMOUNT_SPLITTER);
    return [name, amount];
  }

  /**
   *
   * @param {string} products
   * @returns {Array<OrderProduct>}
   */
  getOrderedProducts(products) {
    const productList = this.#parseProducts(products);
    productList.forEach((productStr) => {
      const [name, amount] = this.#parseProductNameAndAmount(productStr);
      this.#products.push(new OrderProduct(name, amount));
    });
    return this.#products;
  }
}

export default OrderModel;
