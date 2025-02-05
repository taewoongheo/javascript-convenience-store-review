// @ts-check

import OrderProduct from '../order/OrderProduct.js';
import ProductModel from '../product/Product.js';

class ConvenienceStoreModel {
  /** @type {Array<ProductModel>} */
  #products;

  constructor() {
    this.#products = [];
  }

  /**
   *
   * @param {ProductModel} product
   */
  addProduct(product) {
    if (this.#isIncludeProduct(product[0])) {
      const p = this.getProductByName(product[0]);
      p.addAmount(Number(product[2]), product[3]);
    } else {
      this.#products.push(
        new ProductModel(
          product[0],
          Number(product[1]),
          Number(product[2]),
          product[3],
        ),
      );
    }
  }

  /**
   *
   * @param {string} name
   * @returns {boolean}
   */
  #isIncludeProduct(name) {
    return this.#products.some((product) => product.name === name);
  }

  /**
   *
   * @param {string} name
   * @returns {ProductModel}
   */
  getProductByName(name) {
    return this.#products.filter((product) => product.name === name)[0];
  }

  /**
   *
   * @returns {Array<ProductModel>}
   */
  getProducts() {
    return this.#products;
  }

  /**
   *
   * @param {Array<OrderProduct>} orderedProducts
   * @returns {Object}
   */
  #getOrderedProductAndPromotionProductAmount(orderedProducts) {
    const orderedProduct = [];
    orderedProducts.forEach((product) => {
      const findProduct = this.getProductByName(product.name);
      if (findProduct.promotion === '탄산2+1') {
        orderedProduct.push({
          productName: findProduct.name,
          productPromotion: findProduct.promotion,
          productAmount: findProduct.promotionAmount,
          orderAmount: product.amount,
          orderProduct: product,
        });
      }
    });
    return orderedProduct;
  }

  /**
   *
   * @param {Array<OrderProduct>} orderedProducts
   * @returns {Object}
   */
  checkPromotionAmount(orderedProducts) {
    const amountObject =
      this.#getOrderedProductAndPromotionProductAmount(orderedProducts);
    const addObjectArr = [];
    amountObject.forEach((object) => {
      let after = 0;
      if (object.productPromotion === '탄산2+1') {
        const cnt = object.orderAmount;
        const pcnt = object.productAmount;
        after = pcnt - cnt;
        if (after > 0 && cnt % 3 !== 0) {
          after = 1;
        }
      }
      addObjectArr.push({
        name: object.productName,
        info: after,
        orderProduct: object,
      });
    });
    return addObjectArr;
  }

  /**
   *
   * @param {Array<OrderProduct>} orderedProducts
   */
  decreaseProductsAmount(orderedProducts) {
    orderedProducts.forEach((product) => {
      const findProduct = this.getProductByName(product.name);
      findProduct.decreaseAmount(product.amount);
    });
  }
}

export default ConvenienceStoreModel;
