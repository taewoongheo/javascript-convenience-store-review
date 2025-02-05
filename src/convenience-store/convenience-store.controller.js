// @ts-check

import ReceiptView from '../receipt/receipt.view.js';
import ConvenienceStoreService from './convenience-store.service.js';
import ConvenienceStoreView from './convenience-store.view.js';

class ConvenienceStoreController {
  /** @type {ConvenienceStoreService} */
  #convenienceStoreService;

  /** @type {ConvenienceStoreView} */
  #convenienceStoreView;

  /** @type {ReceiptView} */
  #receiptView;

  constructor({ services, views }) {
    const { ConvenienceStoreService: convenienceStoreService } = services;
    const {
      ConvenienceStoreView: convenienceStoreView,
      ReceiptView: receiptView,
    } = views;

    this.#convenienceStoreService = convenienceStoreService;
    this.#convenienceStoreView = convenienceStoreView;
    this.#receiptView = receiptView;
  }

  async init() {
    const productInfo = this.#convenienceStoreView.getProductsInfo();
    this.#convenienceStoreService.storeProducts(productInfo);

    while (true) {
      const storedProduct = this.#convenienceStoreService.getStoredProduct();
      this.#convenienceStoreView.printProducts(storedProduct);
      await this.#order();
      const shouldContinue = await this.#convenienceStoreView.inputRepeat();
      if (shouldContinue !== 'Y') break;
    }
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

    let totalAmount = this.#convenienceStoreService.calculate(orderedProduct);
    if ((await this.#convenienceStoreView.inputMembershipDiscount()) === 'Y') {
      totalAmount *= 0.7;
    }

    this.#receiptView.printProducts(orderedProduct);
    this.#receiptView.printTotal(totalAmount);

    this.#convenienceStoreService.stockProcess(orderedProduct);
  }
}

export default ConvenienceStoreController;
