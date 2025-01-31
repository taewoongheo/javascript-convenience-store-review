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

  init() {
    const productInfo = this.#convenienceStoreView.getProductsInfo();
    this.#convenienceStoreService.storeProducts(productInfo);
    this.#convenienceStoreView.printProducts(productInfo);
  }
}

export default ConvenienceStoreController;
