<script lang="ts" setup>
interface Props {
    message:string,
    status:boolean
}
const props = defineProps<Props>()

const typeAlert = computed(() => {
    return props.status ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
})
</script>
<template>
    <div class="p-4 mb-4 text-sm rounded-lg min-w-min max-w-max mx-auto" role="alert" :class="typeAlert">
        🙏 <span class="font-medium">{{ message }}</span>
    </div>
</template>

