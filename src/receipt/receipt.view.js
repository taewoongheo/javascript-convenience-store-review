import { output } from '../lib/view.js';

class ReceiptView {
  printProducts(orderedProduct) {
    output('==========W 편의점==========');
    orderedProduct.forEach((product) => {
      output(`${product.name} ${product.amount}`);
    });
  }

  printTotal(totalAmount) {
    output('==========================');
    output(`내실 돈: ${totalAmount}`);
  }
}

export default ReceiptView;
