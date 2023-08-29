<script lang="ts" setup>
import { initCollapses } from 'flowbite';

onMounted(() => {
    initCollapses()
})
const Container = defineAsyncComponent(() => import('@c/layout/Container.vue'))
const Logo      = defineAsyncComponent(() => import('@c/global/header/Logo.vue'))
const NavLinks  = defineAsyncComponent(() => import('@c/global/header/NavLinks.vue'))
const NavSocial = defineAsyncComponent(() => import('@c/global/header/NavSocial.vue'))
</script>

<template>
  <header class="bg-dark">
    <Container>
      <nav class="border-gray-200">
        <div class="flex flex-wrap items-center justify-between">
          <Logo />
          <button data-collapse-toggle="navbar-default" type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none"
            aria-controls="navbar-default" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div class="hidden w-full md:flex md:w-auto md:gap-12" id="navbar-default">
            <NavLinks/>
            <NavSocial/>
          </div>
        </div>
      </nav>
    </Container>
  </header>
</template>

