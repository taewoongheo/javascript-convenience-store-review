// @ts-check

import Validator from '../lib/Validator.js';
import SPLITTER from './const.js';

class OrderValidator {
  /**
   *
   * @param {string} value
   */
  validate(value) {
    new Validator()
      .validate(value)
      .with(this.#validateProductListFormat, {
        message: '[ERROR] 개별상품은 대괄호로 구분해야 합니다.',
      })
      .with(this.#validateProductNameAndAmount, {
        message:
          '[ERROR] 상품명과 수량사이에 하이픈 이외의 문자는 사용할 수 없습니다.',
      });
  }

  /**
   *
   * @param {string} value
   * @returns {boolean}
   */
  #validateProductListFormat(value) {
    return value
      .split(SPLITTER.PRODUCT_SPLITTER)
      .map((el) => el.trim())
      .every((el) => el.at(0) === '[' && el.at(-1) === ']');
  }

  /**
   *
   * @param {string} value
   * @returns {boolean}
   */
  #validateProductNameAndAmount(value) {
    return value
      .trim()
      .split(SPLITTER.PRODUCT_SPLITTER)
      .map((el) => {
        const nameAndAmount = el.trim().substring(1, el.trim().length - 1);
        return nameAndAmount
          .split(SPLITTER.NAME_AND_AMOUNT_SPLITTER)
          .every((elem) => /^[a-zA-Z0-9가-힣]+$/.test(elem));
      })
      .every(Boolean);
  }
}

export default OrderValidator;
