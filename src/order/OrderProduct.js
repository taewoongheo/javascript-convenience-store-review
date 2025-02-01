class OrderProduct {
  /** @type {string} */
  #name;

  /** @type {number} */
  #amount;

  constructor(name, amount) {
    this.#name = name;
    this.#amount = amount;
  }
}

export default OrderProduct;
