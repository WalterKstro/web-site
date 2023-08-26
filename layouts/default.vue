<script lang="ts" setup>
const Header = defineAsyncComponent(() => import('@components/global/header/Header.vue'))
</script>

<template>
  <Header />
  <slot />
</template>
