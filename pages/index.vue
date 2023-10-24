<script lang="ts" setup>
import { TypeHomeWelcomeSkeleton, TypeHomeProjectsSkeleton,TypeProjectsPageSkeleton } from 'contentful/content-types';


const SectionIntroduction   = defineAsyncComponent(() => import('@c/home/introduction/Introduction.vue'))
const SectionProjects       = defineAsyncComponent(() => import('@c/home/projects/Projects.vue'))
const SectionContributions  = defineAsyncComponent(() => import('@c/home/contributions/Contributions.vue'))
const SectionContact        = defineAsyncComponent(() => import('@c/home/contact/Form.vue'))

const { $client }   = useNuxtApp()

const [introduction,projects,areas] = await Promise.all([
    await $client.getEntry<TypeHomeWelcomeSkeleton>('Q9Wrr9b1hEp5NaM0J7qdP'),
    await $client.getEntry<TypeHomeProjectsSkeleton>('3Q3s3HaRbvA93MgG4ttNbo'),
    await $client.getEntry<TypeProjectsPageSkeleton>('JZxJL2p4XFdvj544xXldX')
])

useHead({
  title: 'Inicio'
})

</script>

<template>
  <SectionIntroduction :="introduction.fields" />
  <SectionProjects :="projects.fields"/>
  <SectionContributions :="areas.fields"/>
  <SectionContact/>
</template>

