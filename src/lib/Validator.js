// @ts-check

class Validator {
  /** @type {any} */
  #value;

  /**
   *
   * @param {any} value
   * @returns {Validator}
   */
  validate(value) {
    this.#value = value;

    return this;
  }

  /**
   *
   * @param {(...args: any) => boolean} condition
   * @param {{message: string}} error
   * @returns {Validator}
   */
  with(condition, error) {
    const { message } = error;

    if (!condition(this.#value)) {
      throw new Error(message);
    }

    return this;
  }
}

export default Validator;
