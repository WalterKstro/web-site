<script lang="ts" setup>
import { TypeProyectosFrontendSkeleton } from 'contentful/content-types';

const Card = defineAsyncComponent(() => import('@c/projects/Card.vue'));
const AutoGrid = defineAsyncComponent(() => import('@c/layout/AutoGridFill.vue'));
const { $client }   = useNuxtApp()
const response = await $client.getEntry<TypeProyectosFrontendSkeleton>('5Nkgvmy8HnYONX8aq5MYoH');

const projectState = useState<any | null>('projects', () => response)

</script>
<template>
    <AutoGrid>
        <Card v-for="project in projectState.fields.proyectos" :project="project"/>
    </AutoGrid>
</template>

