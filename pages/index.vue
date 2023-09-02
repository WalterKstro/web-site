<script lang="ts" setup>
import { TypeHomePageFields, TypeHomeWelcome, TypeHomeWelcomeFields } from 'types/contentful';

const SectionIntroduction = defineAsyncComponent(()=>import('@c/home/introduction/Introduction.vue'))
const SectionTools = defineAsyncComponent(()=>import('@c/home/tools/Tools.vue'))
const runtimeConfig = useRuntimeConfig();
const { $client } = useNuxtApp()
const response = await $client.getEntry(runtimeConfig.public.contentIdHomePage, { include: 2 })
const fields: TypeHomePageFields = response.fields
const { sectionAreas, sectionIntroduction, title } = fields
const propsSectionIntroduction = sectionIntroduction?.fields as TypeHomeWelcomeFields

useHead({
  title
})
</script>

<template>
  <SectionIntroduction :="propsSectionIntroduction"/>
  <SectionTools/>
</template>

