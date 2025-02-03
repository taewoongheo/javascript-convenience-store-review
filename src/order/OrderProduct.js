class OrderProduct {
  /** @type {string} */
  #name;

  /** @type {number} */
  #amount;

  constructor(name, amount) {
    this.#name = name;
    this.#amount = amount;
  }

  get name() {
    return this.#name;
  }

  get amount() {
    return this.#amount;
  }
}

export default OrderProduct;
