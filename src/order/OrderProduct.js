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

  increaseAmont(amount) {
    this.#amount += amount;
  }

  decreaseAmount(amount) {
    this.#amount -= amount;
  }
}

export default OrderProduct;
