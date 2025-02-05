// @ts-check

import { inputAsync, inputReadFile, output } from '../lib/view.js';
import Product from '../product/Product.js';
import CONVENIENCE_FILE_PATH from './const.js';

class ConvenienceStoreView {
  static MESSAGES = Object.freeze({
    WELCOME: '안녕하세요. W 편의점입니다. \n현재 보유하고 있는 상품입니다.\n',
    NO_PRODUCT: '재고없음',
  });

  static QUERY = Object.freeze({
    GET_PRODUCT_AND_AMOUNT:
      '구매하실 상품명과 수량을 입력해 주세요. ( 예 : [사이다-2], [감자칩-1])\n',
    MEMBERSHIP: '멤버십 할인을 받으시겠습니까?\n',
    REPEAT: '감사합니다. 구매하고 싶은 다른 상품이 있나요?\n',
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

  #printNewLine() {
    output('\n');
  }

  #printProductInfo(product) {
    output(
      ` - ${product.name} ${product.price}원 ${product.amount}개 ${
        product.promotion === 'null' ? '' : product.promotion
      }`,
    );
  }

  /**
   *
   * @param {Product[]} products
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
  }

  /**
   *
   * @returns {Promise<string>}
   */
  async inputOrder() {
    const result = await inputAsync(
      ConvenienceStoreView.QUERY.GET_PRODUCT_AND_AMOUNT,
    );
    return result;
  }

  async inputAddPromotionProduct(obj) {
    const result = inputAsync(
      `현재 ${obj.name}은(는) ${obj.info}개를 무료로 받을 수 있습니다. 추가하시겠습니까?\n`,
    );
    return result;
  }

  async inputNotPromotinoProduct(obj) {
    const result = inputAsync(
      `현재 ${obj.name} ${Math.abs(
        obj.info,
      )}개는 프로모션 할인이 적용되지 않습니다. 그래도 구매하시겠습니까?\n`,
    );
    return result;
  }

  async inputMembershipDiscount() {
    const result = inputAsync(ConvenienceStoreView.QUERY.MEMBERSHIP);
    return result;
  }

  async inputRepeat() {
    const result = inputAsync(ConvenienceStoreView.QUERY.REPEAT);
    return result;
  }
}

export default ConvenienceStoreView;
