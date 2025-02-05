# javascript-convenience-store-precourse

## Order

- [x] 재고를 저장한다.
- [x] 환영 인사와 함께 상품명, 가격, 프로모션 이름, 재고를 안내한다.
  - [x] 만약 재고가 0개라면 `재고없음`을 출력한다.
- [x] 구매할 상품과 수량을 입력받는다.
  - [x] 개별상품은 대괄호와 쉼표로 구분, 상품명과 수량은 하이픈으로 구분한다.
  - [x] 잘못된 상품명을 입력 시 에러를 발생한다.
    - [x] 개별 상품을 대괄호로 구분하지 않은 경우
    - [x] 상품명과 수량사이에 하이픈 이외의 문자가 사용된 경우
  - [x] 재고 수량을 고려하여 결제 가능 여부를 확인한다.
  - [x] 상품을 구매할 떄마다, 수량만큼 차감하여 재고를 관리한다.
- [x] 프로모션 적용가능 상품을 고객이 적게 가져온 경우, 수량 추가 여부 입력받는다.
  - [x] Y: 상품 추가, N: 상품 미추가
  - [x] 잘못된 입력 시 에러를 발생한다.
    - [x] Y, N 이외의 문자를 입력 시
  - [x] 오늘 날짜가 프로모션 기간 내에 포함된 경우에만 할인을 적용한다.
  - [x] 프로모션은 Buy N Get 1 Free 형태로 진행된다.
  - [x] 동일상품에 여러 프로모션이 적용되지 않는다.
  - [x] 프로모션 기간 중이라면, 프로모션 재고를 우선적으로 차감한다. 이후 일반 재고를 차감한다.
- [x] 프로모션 재고가 부족하여 일부 수량을 혜택없이 결제해야 하는 경우, 일부 수량에 대한 정가결제 여부를 입력받는다.
  - [x] Y: 일부 수량 정가 결제, N: 정가 결제 수량 제외
  - [x] 잘못된 입력 시 에러를 발생한다.
    - [x] Y, N 이외의 문자를 입력 시
- [x] 멤버십 할인 여부를 입력받는다.
  - [x] Y: 할인 적용, N: 할인 미적용
  - [x] 잘못된 입력 시 에러를 발생한다.
    - [x] Y, N 이외의 문자를 입력 시
  - [x] 프로모션 미젹용 금액의 30%를 할인받는다.
  - [x] 최대 한도는 8,000원이다.
- [x] 영수증을 출력한다.
  - [x] 영수증 항목은 아래와 같다.
    - 구매 상품 내역 : 구매한 상품명 , 수량 , 가격
    - 증정 상품 내역 : 프로모션에 따라 무료로 제공된 증정 상품의 목록
    - 금액 정보
    - 총구매액 : 구매한 상품의 총 수량과 총 금액
    - 행사할인 : 프로모션에 의해 할인된 금액
    - 멤버십할인 : 멤버십에 의해 추가로 할인된 금액
    - 내실돈 : 최종 결제 금액
- [x] 추가 구매 여부를 입력받는다.
  - [x] Y: 구매 시작, N: 종료
  - [x] 잘못된 입력 시 에러를 발생한다.
    - [x] Y, N 이외의 문자를 입력 시
- [x] 앱을 종료한다.

## Object

- Convenience-Store: 재고관리 및 편의점 프로세스
- Order: 주문
- Product: 상품
- Promotion: 프로모션
- Membership: 멤버십
- Receipt: 영수증

## Structure

- MVC 구조
- 비즈니스 로직 분리를 위해 Service layer 추가
