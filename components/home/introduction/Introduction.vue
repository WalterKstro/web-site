<script lang="ts" setup>
const Button    = defineAsyncComponent(()=>import('@c/global/Button.vue'));
const Container = defineAsyncComponent(() => import('@c/layout/Container.vue'))

interface Props {
  greeting:string;
  name:string;
  introduction:string;
  position:string;
}
defineProps<Props>()
</script>
<template>
  <section class="bg-dark">
    <Container>
      <img src="@a/img/circle.svg" alt="fondo"
        class="absolute right-0 rounded-full blur-xl bottom-0  w-full lg:w-1/2 select-none overflow-hidden animate-pulse">
      <div class="py-8 lg:py-16 relative z-10 lg:static">
        <div class="format mr-auto place-self-center lg:col-span-7 text-light">
          <p class="lg:text-2xl lg:leading-tight m-0 font-semibold">{{ greeting }}</p>
          <h1 class=" text-orange m-0 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
            {{ name }}</h1>
          <p class="m-0 lg:text-2xl lg:leading-tight font-semibold">{{ position }}</p>
          <p class="mb-8 font-light text-light lg:mb-8 md:text-lg lg:text-xl">{{ introduction }}</p>
        </div>
        <Button path="profile">Ver mi perfil</Button>
      </div>
    </Container>
  </section>
</template>

