<script lang="ts" setup>
const Container = defineAsyncComponent(() => import('@c/layout/Container.vue'))
</script>

<template>
  <aside class="relative mb-16">
    <div class="absolute inset-0 grid" aria-hidden="true">
      <div class="bg-dark"></div>
      <div class="bg-white"></div>
    </div>
    <Container>
      <div class="format isolate bg-dark rounded-lg p-4 max-w-3xl min-[320px] mx-auto w-full flex gap-8 flex-col items-center
                                lg:p-8 border border-gray-700">
        <h2 class="text-center m-0 text-light h2">Mis principales herramientas</h2>
        <div class="flex gap-4 md:gap-8">
          <Icon size="40" name="logos:react" />
          <Icon size="40" name="vscode-icons:file-type-vue" />
          <Icon size="40" name="logos:nuxt-icon" />
          <Icon size="40" name="devicon:tailwindcss" />
          <Icon size="40" name="logos:bootstrap" />
          <Icon size="40" name="logos:laravel" />
        </div>
      </div>
    </Container>
  </aside>
</template>

