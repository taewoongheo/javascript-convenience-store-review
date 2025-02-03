// @ts-check

class Product {
  /** @type {string} */
  #productName;

  /** @type {number} */
  #productPrice;

  /** @type {number} */
  #normalProductAmount;

  /** @type {number} */
  #promotionProductAmount;

  /** @type {string | null} */
  #promotion;

  /**
   *
   * @param {string} name
   * @param {number} price
   * @param {number} amount
   * @param {string} promotion
   */
  constructor(name, price, amount, promotion) {
    this.#productName = name;
    this.#productPrice = price;
    this.#normalProductAmount = 0;
    this.#promotionProductAmount = 0;
    if (promotion !== 'null') {
      this.#promotion = promotion;
      this.#promotionProductAmount = amount;
      return;
    }
    this.#normalProductAmount = amount;
  }

  addAmount(amount, promotion) {
    if (promotion !== 'null') {
      this.#promotionProductAmount = amount;
      this.#promotion += promotion;
      return;
    }
    this.#normalProductAmount += amount;
  }

  get name() {
    return this.#productName;
  }

  get amount() {
    return this.#normalProductAmount;
  }
}

export default Product;
