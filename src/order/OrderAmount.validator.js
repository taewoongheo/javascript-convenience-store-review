import Validator from '../lib/Validator.js';

class OrderAmountValidator {
  static MESSAGE = Object.freeze({
    NO_EXIST_PRODUCT: '[ERROR] 존재하지 않는 상품입니다.',
    OUT_OF_STOCK: '[ERROR] 수량이 부족한 상품입니다.',
  });

  /**
   *
   * @param {Object[]} value
   */
  validate(value) {
    new Validator()
      .validate(value)
      .with(this.#validateNoExistProdcut, {
        message: OrderAmountValidator.MESSAGE.NO_EXIST_PRODUCT,
      })
      .with(this.#validateOrderProductsAndStockProducts, {
        message: OrderAmountValidator.MESSAGE.OUT_OF_STOCK,
      });
  }

  #validateNoExistProdcut(value) {
    return value.every((products) => {
      const { stockProductAmount } = products;
      if (stockProductAmount === undefined) {
        return false;
      }
      return true;
    });
  }

  #validateOrderProductsAndStockProducts(value) {
    return value.every((products) => {
      const { stockProductAmount, orderedProductAmount } = products;
      if (orderedProductAmount > stockProductAmount) {
        return false;
      }
      return true;
    });
  }
}

export default OrderAmountValidator;
