<script lang="ts" setup>
import { TypeHomePageFields, TypeHomeWelcome, TypeHomeWelcomeFields } from 'types/contentful';

const runtimeConfig = useRuntimeConfig();

const Container = defineAsyncComponent(() => import('@components/layout/Container.vue'))
const { $contentful } = useNuxtApp()
const response = await $contentful.getEntry(runtimeConfig.public.contentIdHomePage,{include:2})
const fields:TypeHomePageFields = response.fields
const {sectionAreas,sectionIntroduction,title} = fields
const {greeting,introduction,name,position} = sectionIntroduction?.fields as TypeHomeWelcomeFields

useHead({
  title
})
</script>

<template>
  <section class="bg-dark">
    <Container>
      <img src="../assets//img/circle2.svg" alt=""
        class="absolute right-0 rounded-full blur-xl bottom-0  w-full lg:w-1/2 select-none overflow-hidden animate-pulse">
      <div class="py-8 lg:py-16 relative z-10 lg:static">
        <div class="format mr-auto place-self-center lg:col-span-7 text-light">
          <p class="lg:text-3xl lg:leading-tight m-0">{{ greeting }}</p>
          <h1 class=" text-orange m-0 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
            {{ name }}</h1>
          <p class="m-0 lg:text-3xl lg:leading-tight">{{ position }}</p>
          <p class="mb-8 font-light text-light lg:mb-8 md:text-lg lg:text-xl">{{
            introduction }}</p>
          <NuxtLink to="profile"
            class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-light rounded-full bg-transparent border-2 border-orange  no-underline hover:bg-orange ease-in duration-300">
            Ver mi perfil <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </Container>  
  </section>
</template>

<style scoped></style>
