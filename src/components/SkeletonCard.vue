<template>
  <div class="skeleton-card" aria-hidden="true">
    <div class="skeleton-card__media"></div>
    <div class="skeleton-card__body">
      <span class="skeleton-card__line skeleton-card__line--short"></span>
      <span class="skeleton-card__line"></span>
      <span class="skeleton-card__line skeleton-card__line--medium"></span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.skeleton-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.skeleton-card__media {
  aspect-ratio: 1;
}

.skeleton-card__body {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-4);
}

.skeleton-card__line {
  height: 0.75rem;
  border-radius: var(--radius-sm);

  &--short {
    width: 40%;
  }

  &--medium {
    width: 60%;
  }
}

.skeleton-card__media,
.skeleton-card__line {
  background-color: var(--color-skeleton);
  background-image: linear-gradient(
    90deg,
    transparent 0%,
    rgb(255 255 255 / 0.12) 50%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.4s ease-in-out infinite;
}

@keyframes shimmer {
  from {
    background-position: 200% 0;
  }
  to {
    background-position: -200% 0;
  }
}
</style>
