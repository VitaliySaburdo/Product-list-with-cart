import './src/sass/index.scss';
import data from './src/data/data.json';
import { renderList } from './src/js/renderList';
import { renderTotalOrder } from './src/js/renderTotalOrder';

const list = document.querySelector('.product-list');

const quantities = {};

renderList(data);

list.addEventListener('click', onBtn);

function onBtn(event) {
  const target = event.target;

  if (target.closest('.product-list__button')) {
    const button = target.closest('.product-list__button');
    const cardId = button.dataset.id;

    if (!quantities[cardId]) {
      quantities[cardId] = 1;
    }

    button.classList.add('selected');
    button.innerHTML = ` 
      <button
        class="product__button product__button--decrement"
        aria-label="Decrease quantity"
        data-id=${cardId}
      >
        <svg width="18" height="18" class="cart__image">
            <use href="../assets/images/sprite.svg#icon-icon-carbon-neutral"></use>
        </svg>
      </button>
      <span class="product__quantity" data-id=${cardId}>${quantities[cardId]}</span>
      <button
        class="product__button product__button--increment"
        aria-label="Increase quantity"
        data-id=${cardId}
      >
        <span class="btn__icon">+</span>
      </button>
    `;

    const decrement = button.querySelector('.product__button--decrement');
    const increment = button.querySelector('.product__button--increment');
    const quantityDisplay = button.querySelector('.product__quantity');

    decrement.addEventListener('click', () => {
      if (quantities[cardId] > 0) {
        quantities[cardId] -= 1;
        quantityDisplay.textContent = quantities[cardId];
        renderTotalOrder(cardId, quantities[cardId]);
      }
    });

    increment.addEventListener('click', () => {
      quantities[cardId] += 1;
      quantityDisplay.textContent = quantities[cardId];
      renderTotalOrder(cardId, quantities[cardId]);
    });
    renderTotalOrder(cardId, quantities[cardId]);
  }
}