// @ts-check

import inputReadFile from '../lib/view.js';
import CONVENIENCE_FILE_PATH from './const.js';

class ConvenienceStoreView {
  /**
   *
   * @param {string} products
   * @returns {Array<Array<string>> | string}
   */
  #parseProducts(products) {
    const productList = products.trim().split('\n');
    if (this.#isProductsEmpty(productList)) {
      return '';
    }
    return productList.map((product) => product.split(','));
  }

  /**
   *
   * @param {Array<string>} value
   * @returns {boolean}
   */
  #isProductsEmpty(value) {
    return value.shift() === undefined;
  }

  /**
   *
   * @returns {Array<Array<string>> | string}
   */
  getProductsInfo() {
    const products = inputReadFile(CONVENIENCE_FILE_PATH.PRODUCTS_FILE_PATH);
    return this.#parseProducts(products);
  }
}

export default ConvenienceStoreView;
