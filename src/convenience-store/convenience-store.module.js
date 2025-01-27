// @ts-check

import Module from '../lib/module.js';
import ProductModel from '../Product.js';
import ConvenienceStoreController from './convenience-store.controller.js';
import ConvenienceStoreModel from './convenience-store.model.js';
import ConvenienceStoreService from './convenience-store.service.js';
import ConvenienceStoreValidator from './convenience-store.validate.js';
import ConvenienceStoreView from './convenience-store.view.js';

const convenienceModule = new Module({
  models: [ConvenienceStoreModel, ProductModel],
  views: [ConvenienceStoreView],
  controllers: [ConvenienceStoreController],
  services: [ConvenienceStoreService],
  providers: [ConvenienceStoreValidator],
});

export default convenienceModule;
