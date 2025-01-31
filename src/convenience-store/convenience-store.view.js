// @ts-check

import { inputReadFile, output } from '../lib/view.js';
import CONVENIENCE_FILE_PATH from './const.js';

class ConvenienceStoreView {
  static MESSAGES = Object.freeze({
    WELCOME: '안녕하세요. W 편의점입니다. \n현재 보유하고 있는 상품입니다.\n',
    NO_PRODUCT: '재고없음',
  });

  static QUERY = Object.freeze({
    INPUT:
      '구매하실 상품명과 수량을 입력해 주세요. ( 예 : [ 사이다 -2], [감자칩 -1])\n',
  });

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
    // `javascript-convenience-store-review/${CONVENIENCE_FILE_PATH.PRODUCTS_FILE_PATH}`
    const products = inputReadFile(
      `${CONVENIENCE_FILE_PATH.PRODUCTS_FILE_PATH}`,
    );
    return this.#parseProducts(products);
  }

  #printWelcome() {
    output(ConvenienceStoreView.MESSAGES.WELCOME);
  }

  #printInputQuery() {
    output(ConvenienceStoreView.QUERY.INPUT);
  }

  #printNewLine() {
    output('\n');
  }

  #printProductInfo(product) {
    output(
      ` - ${product[0]} ${product[1]}원 ${product[2]}개 ${
        product[3] === 'null' ? '' : product[3]
      }`,
    );
  }

  /**
   *
   * @param {string[][] | string} products
   */
  printProducts(products) {
    this.#printWelcome();
    if (products.length === 0) {
      output(ConvenienceStoreView.MESSAGES.NO_PRODUCT);
      return;
    }
    for (let i = 0; i < products.length; i += 1) {
      const p = products[i];
      this.#printProductInfo(p);
    }
    this.#printNewLine();
    this.#printInputQuery();
  }
}

export default ConvenienceStoreView;
