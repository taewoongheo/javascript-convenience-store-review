// @ts-check

import OrderProduct from './OrderProduct.js';

class OrderModel {
  /** @type {Array<OrderProduct>} */
  #products;

  constructor() {
    this.#products = [];
  }

  getOrderedProducts(products) {
    // TODO: 책임분리
    const productList = products.trim().split(',');
    for (let i = 0; i < productList.length; i += 1) {
      const product = productList[i].trim().replace(/\[|\]/g, '');
      const [name, amount] = product.split('-');
      this.#products.push(new OrderProduct(name, amount));
    }
    return this.#products;
  }
}

export default OrderModel;
