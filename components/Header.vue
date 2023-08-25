<script lang="ts" setup>
const Container = defineAsyncComponent(() => import('./layout/Container.vue'))
const Logo = defineAsyncComponent(() => import('./global/Logo.vue'))
</script>

<template>
  <header class="bg-dark">
    <Container>
      <nav class="border-gray-200">
        <div class="flex flex-wrap items-center justify-between">
          <a href="#" class="flex items-center">
            <Logo />
          </a>
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
            <ul class="flex flex-col font-medium py-4 md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0">
              <li>
                <a href="#" class="block py-2 pl-3 pr-4 text-light bg-transparent md:p-0" aria-current="page">Inicio</a>
              </li>
              <li>
                <a href="#" class="block py-2 pl-3 pr-4 text-light bg-transparent md:p-0">Proyectos</a>
              </li>
              <li>
                <a href="#" class="block py-2 pl-3 pr-4 text-light bg-transparent md:p-0">Perfil</a>
              </li>
            </ul>
            <ul class="flex gap-8 md:gap-2">
              <li class="text-light">
                <NuxtLink target="_blank" to="https://github.com/WalterKstro">
                  <Icon size="20" name="uil:github" />
                </NuxtLink>
              </li>
              <li class="text-light">
                <NuxtLink target="_blank" to="https://www.linkedin.com/in/frontend-walter/">
                  <Icon size="20" name="uil:linkedin" />
                </NuxtLink>
              </li>
              <li class="text-light">
                <NuxtLink target="_blank" to="https://twitter.com/walterkstro_">
                  <Icon size="20" name="uil:twitter" />
                </NuxtLink>
              </li>
              <li class="text-light">
                <NuxtLink target="_blank" to="https://www.youtube.com/channel/UCc0BZqZAg-E1y_SkOfxKdzA">
                  <Icon size="20" name="uil:youtube" />
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Container>
  </header>
</template>

<style scoped></style>
