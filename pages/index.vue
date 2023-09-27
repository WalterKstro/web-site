<script lang="ts" setup>
import { TypeHomePageSkeleton } from 'contentful/content-types';


const SectionIntroduction   = defineAsyncComponent(() => import('@c/home/introduction/Introduction.vue'))
const SectionTools          = defineAsyncComponent(() => import('@c/home/tools/Tools.vue'))
const SectionProjects       = defineAsyncComponent(() => import('@c/home/projects/Projects.vue'))
const SectionContributions  = defineAsyncComponent(() => import('@c/home/contributions/Contributions.vue'))
const SectionContact  = defineAsyncComponent(() => import('@c/home/contact/Form.vue'))

const { $client }   = useNuxtApp()

const response = await $client.getEntry<TypeHomePageSkeleton>('1DBV7HkTNbeGtSqTp8r4Xo',{include:2})

useHead({
  title:response.fields.title
})

</script>

<template>
  <SectionIntroduction :="response.fields.sectionIntroduction.fields" />
  <SectionTools/>
  <SectionProjects :="response.fields.sectionProjects.fields"/>
  <SectionContributions :="response.fields.sectionAreas.fields"/>
  <SectionContact/>
</template>

