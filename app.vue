<script lang="ts" setup>
import { initCollapses } from 'flowbite';

    const Container = defineAsyncComponent(() => import('./components/layout/Container.vue'))
    onMounted(()=>{
        initCollapses()
    })

</script>
<template>
    <Header/>
    <Container><h1>Hello</h1></Container>
</template>
