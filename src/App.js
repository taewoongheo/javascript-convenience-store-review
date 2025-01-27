import convenienceModule from './convenience-store/convenience-store.module.js';

class App {
  async run() {
    convenienceModule.init();
  }
}

export default App;
