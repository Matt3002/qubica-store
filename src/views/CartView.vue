<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { formatPrice } from '@/utils/format'

const cart = useCartStore()
</script>

<template>
  <section class="cart">
    <h1 class="cart__title">Carrello</h1>

    <p v-if="cart.isEmpty" class="cart__empty">
      Il carrello è vuoto.
      <RouterLink class="cart__empty-link" :to="{ name: 'home', query: {} }">
        Sfoglia i prodotti
      </RouterLink>
    </p>

    <template v-else>
      <ul class="cart__list">
        <li v-for="item in cart.items" :key="item.product.id" class="cart__item">
          <img
            class="cart__image"
            :src="item.product.image"
            :alt="item.product.title"
            width="80"
            height="80"
            loading="lazy"
          />

          <div class="cart__info">
            <RouterLink
              class="cart__name"
              :to="{ name: 'product', params: { id: item.product.id } }"
            >
              {{ item.product.title }}
            </RouterLink>
            <p class="cart__unit">{{ formatPrice(item.product.price) }} cad.</p>
          </div>

          <div class="cart__quantity">
            <label class="visually-hidden" :for="`qty-${item.product.id}`">
              Quantità per {{ item.product.title }}
            </label>
            <input
              :id="`qty-${item.product.id}`"
              class="cart__input"
              type="number"
              min="0"
              :value="item.quantity"
              @change="
                cart.setQuantity(item.product.id, Number(($event.target as HTMLInputElement).value))
              "
            />
          </div>

          <p class="cart__subtotal">
            {{ formatPrice(item.product.price * item.quantity) }}
          </p>

          <button
            type="button"
            class="cart__remove"
            :aria-label="`Rimuovi ${item.product.title} dal carrello`"
            @click="cart.removeItem(item.product.id)"
          >
            &times;
          </button>
        </li>
      </ul>

      <footer class="cart__footer">
        <p class="cart__total">
          Totale <strong>{{ formatPrice(cart.totalPrice) }}</strong>
        </p>
        <button type="button" class="button button--ghost" @click="cart.clear()">
          Svuota carrello
        </button>
      </footer>
    </template>
  </section>
</template>

<style scoped lang="scss">
.cart__title {
  margin-bottom: var(--space-6);
  font-size: var(--font-size-2xl);
  font-weight: 700;
}

.cart__empty {
  padding: var(--space-7) 0;
  color: var(--color-text-muted);
  text-align: center;
}

.cart__empty-link {
  color: var(--color-primary);
  text-decoration: underline;
}

.cart__list {
  list-style: none;
  padding: 0;
  border-top: 1px solid var(--color-border);
}

.cart__item {
  display: grid;
  grid-template-areas:
    'image info remove'
    'image quantity subtotal';
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: var(--space-2) var(--space-4);
  padding: var(--space-4) 0;
  border-bottom: 1px solid var(--color-border);

  @include respond-to('md') {
    grid-template-areas: 'image info quantity subtotal remove';
    grid-template-columns: auto 1fr auto auto auto;
  }
}

.cart__image {
  grid-area: image;
  width: 80px;
  height: 80px;
  object-fit: contain;
  background-color: var(--color-image-bg);
  border-radius: var(--radius-sm);
}

.cart__info {
  grid-area: info;
  min-width: 0;
}

.cart__name {
  font-weight: 600;

  &:hover {
    color: var(--color-primary);
  }
}

.cart__unit {
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}

.cart__quantity {
  grid-area: quantity;
}

.cart__input {
  width: 72px;
  padding: var(--space-2);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  text-align: center;
}

.cart__subtotal {
  grid-area: subtotal;
  font-weight: 700;
  text-align: right;
}

.cart__remove {
  grid-area: remove;
  width: 32px;
  height: 32px;
  background-color: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  color: var(--color-text-muted);
  font-size: var(--font-size-lg);
  line-height: 1;
  transition:
    color var(--transition-fast),
    border-color var(--transition-fast);

  &:hover {
    color: var(--color-danger);
    border-color: var(--color-danger);
  }
}

.cart__footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding-top: var(--space-5);
}

.cart__total {
  font-size: var(--font-size-xl);
}
</style>
