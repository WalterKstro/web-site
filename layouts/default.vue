<script lang="ts" setup>
const Header = defineAsyncComponent(() => import('../components/global/Header.vue'))
</script>

<template>
  <Header />
  <slot />
</template>
