<script lang="ts" setup>
interface Props {
    area:string,
    aportes:string[]
}
defineProps<Props>()

</script>
<template>
    <div
        class="p-6 bg-light border border-gray-200 rounded-lg shadow">
        <div class="text-center">
            <slot name="icon"></slot>
            <h3 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ area }}</h3>
        </div>
        <ul class="flex flex-col gap-4">
            <li v-for="aporte in aportes"  class="flex gap-2 items-center lg:gap-4">
                <svg class="flex-shrink-0 w-4 h-4 text-orange dark:text-blue-500" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg> {{ aporte }}
            </li>
        </ul>
    </div>
</template>

