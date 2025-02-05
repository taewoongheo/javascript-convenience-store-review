// @ts-check

import ConvenienceStoreService from './convenience-store.service.js';
import ConvenienceStoreView from './convenience-store.view.js';

class ConvenienceStoreController {
  /** @type {ConvenienceStoreService} */
  #convenienceStoreService;

  /** @type {ConvenienceStoreView} */
  #convenienceStoreView;

  constructor({ services, views }) {
    const { ConvenienceStoreService: convenienceStoreService } = services;
    const { ConvenienceStoreView: convenienceStoreView } = views;

    this.#convenienceStoreService = convenienceStoreService;
    this.#convenienceStoreView = convenienceStoreView;
  }

  async init() {
    const productInfo = this.#convenienceStoreView.getProductsInfo();
    this.#convenienceStoreService.storeProducts(productInfo);
    this.#convenienceStoreView.printProducts(productInfo);

    await this.#order();
  }

  async #order() {
    const order = await this.#convenienceStoreView.inputOrder();
    const orderedProduct = this.#convenienceStoreService.generateOrder(order);
    const checkObj =
      this.#convenienceStoreService.checkPromotionAmount(orderedProduct);

    await Promise.all(
      checkObj.map(async (obj) => {
        let result;
        if (obj.info > 0) {
          result = await this.#convenienceStoreView.inputAddPromotionProduct(
            obj,
          );
        } else if (obj.info < 0) {
          result = await this.#convenienceStoreView.inputNotPromotinoProduct(
            obj,
          );
        }
        this.#convenienceStoreService.orderAmountChange(obj, result);
      }),
    );

    this.#convenienceStoreService.stockProcess(orderedProduct);
  }
}

export default ConvenienceStoreController;
