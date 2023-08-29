<script lang="ts" setup>
const Header = defineAsyncComponent(() => import('@c/global/header/Header.vue'))
</script>

<template>
  <Header />
  <slot />
</template>
