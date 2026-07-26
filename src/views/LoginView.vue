<script setup lang="ts">
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const form = reactive({
  username: '',
  password: '',
})

async function handleSubmit(): Promise<void> {
  try {
    await auth.login({ username: form.username, password: form.password })

    // Torna dove l'utente stava andando prima del redirect al login.
    const redirect = route.query.redirect
    await router.replace(typeof redirect === 'string' ? redirect : { name: 'home' })
  } catch {
    // L'errore è già nello store ed è mostrato nel template.
  }
}

function fillDemoCredentials(): void {
  form.username = 'mor_2314'
  form.password = '83r5^_'
}
</script>

<template>
  <section class="login">
    <h1 class="login__title">Accedi</h1>
    <p class="login__intro">Accedi per gestire il tuo carrello e la tua wishlist.</p>

    <form class="login__form" novalidate @submit.prevent="handleSubmit">
      <div class="login__field">
        <label class="login__label" for="username">Username</label>
        <input
          id="username"
          v-model="form.username"
          class="login__input"
          type="text"
          name="username"
          autocomplete="username"
          required
          :disabled="auth.isSubmitting"
        />
      </div>

      <div class="login__field">
        <label class="login__label" for="password">Password</label>
        <input
          id="password"
          v-model="form.password"
          class="login__input"
          type="password"
          name="password"
          autocomplete="current-password"
          required
          :disabled="auth.isSubmitting"
        />
      </div>

      <p v-if="auth.error" class="login__error" role="alert">
        {{ auth.error.message }}
      </p>

      <button type="submit" class="button login__submit" :disabled="auth.isSubmitting">
        {{ auth.isSubmitting ? 'Accesso in corso…' : 'Accedi' }}
      </button>
    </form>

    <aside class="login__demo">
      <h2 class="login__demo-title">Credenziali di prova</h2>
      <p class="login__demo-text">
        La Fake Store API accetta l'utente <code>mor_2314</code> con password <code>83r5^_</code>.
      </p>
      <button type="button" class="button button--ghost" @click="fillDemoCredentials">
        Compila automaticamente
      </button>
    </aside>
  </section>
</template>

<style scoped lang="scss">
.login {
  max-width: 420px;
  margin-inline: auto;
}

.login__title {
  font-size: var(--font-size-2xl);
  font-weight: 700;
}

.login__intro {
  margin-top: var(--space-2);
  color: var(--color-text-muted);
}

.login__form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin-top: var(--space-6);
}

.login__field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.login__label {
  font-size: var(--font-size-sm);
  font-weight: 600;
}

.login__input {
  padding: var(--space-3);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  transition: border-color var(--transition-fast);

  &:hover {
    border-color: var(--color-text-muted);
  }

  &:disabled {
    opacity: 0.6;
  }
}

.login__error {
  padding: var(--space-3);
  background-color: var(--color-surface);
  border: 1px solid var(--color-danger);
  border-radius: var(--radius-sm);
  color: var(--color-danger);
  font-size: var(--font-size-sm);
}

.login__submit {
  &:disabled {
    opacity: 0.6;
    cursor: progress;
  }
}

.login__demo {
  margin-top: var(--space-6);
  padding: var(--space-4);
  background-color: var(--color-surface-alt);
  border-radius: var(--radius-md);
}

.login__demo-title {
  font-size: var(--font-size-sm);
  font-weight: 600;
}

.login__demo-text {
  margin-block: var(--space-2) var(--space-3);
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);

  code {
    padding: 2px 6px;
    background-color: var(--color-surface);
    border-radius: var(--radius-sm);
    font-family: monospace;
  }
}
</style>
