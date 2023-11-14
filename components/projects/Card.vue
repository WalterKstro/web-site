<script lang="ts" setup>
import { Asset, Entry, EntryFieldTypes, EntrySkeletonType } from 'contentful';
import { TypeProjectFields, TypeProjectSkeleton } from 'contentful/content-types';
import { Prop } from 'nuxt/dist/app/compat/capi';

interface Props {
    metadata: any,
    sys: any,
    fields: TypeProjectFields
}
const props = defineProps<{ project: Props }>();


const extract = computed(() => {
    const description: any = props.project.fields.extract
    const listWords: string[] = description.split(' ')
    if (listWords.length > 24) listWords.length = 24
    return listWords.join(' ').concat('..')
})
const images = props.project.fields.images
console.log(images[0])
useHead({
    title: 'Proyectos'
})
</script>

<template>
    <div class="w-full bg-white border border-gray-200 rounded-lg shadow">
        <a href="#">
            <img class="rounded-t-lg" :src="props.project.fields.images[0].fields.file?.url" alt="" />
            <div class="p-5">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ project.fields.title }}
                </h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ extract }}</p>
                <span class="bg-gray-100 text-darken text-xs font-medium me-2 px-2.5 py-0.5 rounded-full"
                v-for="tag in props.project.fields.tags">{{ tag }}</span>
            </div>
        </a>
    </div>
</template>


