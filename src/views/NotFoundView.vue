<template>
  <section class="not-found">
    <p class="not-found__code" aria-hidden="true">404</p>
    <h1 class="not-found__title">Pagina non trovata</h1>
    <p class="not-found__text">
      L'indirizzo che hai aperto non corrisponde a nessuna pagina del negozio.
    </p>
    <RouterLink class="button" :to="{ name: 'home', query: {} }"> Torna alla home </RouterLink>
  </section>
</template>

<style scoped lang="scss">
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  padding-block: var(--space-8);
  text-align: center;
}

.not-found__code {
  color: var(--color-primary);
  font-size: var(--font-size-3xl);
  font-weight: 700;
  letter-spacing: -0.04em;
}

.not-found__title {
  font-size: var(--font-size-xl);
  font-weight: 700;
}

.not-found__text {
  max-width: 40ch;
  color: var(--color-text-muted);
}
</style>
