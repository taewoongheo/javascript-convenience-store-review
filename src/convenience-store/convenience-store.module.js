// @ts-check

import Module from '../lib/module.js';
import OrderModel from '../order/Order.model.js';
import ConvenienceStoreController from './convenience-store.controller.js';
import ConvenienceStoreModel from './convenience-store.model.js';
import ConvenienceStoreService from './convenience-store.service.js';
import ConvenienceStoreView from './convenience-store.view.js';
import OrderInputValidator from '../order/OrderInput.validator.js';
import OrderAmountValidator from '../order/OrderAmount.validator.js';

const convenienceModule = new Module({
  models: [ConvenienceStoreModel, OrderModel],
  views: [ConvenienceStoreView],
  controllers: [ConvenienceStoreController],
  services: [ConvenienceStoreService],
  providers: [OrderInputValidator, OrderAmountValidator],
});

export default convenienceModule;
