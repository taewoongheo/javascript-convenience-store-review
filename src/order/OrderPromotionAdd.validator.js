import Validator from '../lib/Validator.js';

class OrderPromotionAddValidator {
  validate(value) {
    new Validator().validate(value).with(this.#validateInput, {
      message: "[ERROR] 'Y' 또는 'N' 이외의 값은 입력할 수 없습니다.",
    });
  }

  #validateInput(value) {
    return ['Y', 'N'].includes(value);
  }
}

export default OrderPromotionAddValidator;
