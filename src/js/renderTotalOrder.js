import { data } from './data';

const orders = [];

export function renderTotalOrder(id, quantity) {
  const cartList = document.querySelector('.cart__list');
  const cartQuantity = document.querySelector('.cart__title');
  const emptyContainer = document.querySelector('.cart__container--empty');
  const totalContainer = document.querySelector('.cart__total-price--container');

  const order = {
    id: id,
    name: data[id].name,
    quantity: quantity,
    price: data[id].price,
    totalPrice: quantity * data[id].price,
  };

  const existingOrderIndex = orders.findIndex(o => o.id === id);

  if (existingOrderIndex !== -1) {
    orders[existingOrderIndex].quantity = quantity;
    orders[existingOrderIndex].totalPrice = order.quantity * order.price;
  } else {
    orders.push(order);
  }

  const totalQuantity = orders.reduce((acc, item) => (acc += item.quantity), 0);

  cartQuantity.textContent = `Your Cart (${totalQuantity})`;
  cartQuantity.style.marginBottom = '35px';

  const totalPrice = orders.reduce((acc, item) => (acc += item.totalPrice), 0);

  const markupCartList = orders
    .map(order => {
      return `
          <li class="cart__item" data-id=${order.id}>
            <div class="cart__item--container">
              <p class="cart__item--name">${order.name}</p>
              <div class="cart__item--information">
                <p class="cart__item--quantity">${order.quantity}x</p>
                <p class="cart__item--price">@$${order.price.toFixed(2)}</p>
                <p class="cart__item--total-price">$${order.totalPrice.toFixed(2)}</p>
              </div>
            </div>
            <button class="cart__item--close-btn">X</button>
          </li>
      `;
    })
    .join('');

  // const markupTotal = `
  //         <p class="cart__total-price--title">Order Total</p>
  //         <p class="cart__total-price">$${totalPrice.toFixed(2)}</p>
  // `;

  emptyContainer.innerHTML = '';
  cartList.innerHTML = markupCartList;
  // totalContainer.innerHTML = markupTotal;
}
