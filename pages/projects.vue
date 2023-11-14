<script lang="ts" setup>
const Container = defineAsyncComponent(() => import('@c/layout/Container.vue'))
</script>

<template>
<Container>
  <div class="mb-4 border-b border-gray-200">
    <ul class="flex justify-center flex-wrap -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
        <li class="mr-2" role="presentation">
            <NuxtLink class="inline-block p-4 rounded-t-lg" role="tab" to="/projects">Frontend</NuxtLink>
        </li>
        <li class="mr-2" role="presentation">
          <NuxtLink class="inline-block p-4 border-transparent rounded-t-lg" role="tab" :to="{ name:'projects-backend',params:{ backend:'backend' } }">Backend</NuxtLink>
        </li>
        <li class="mr-2" role="presentation">
          <NuxtLink class="inline-block p-4 border-transparent rounded-t-lg" role="tab" :to="{ name:'projects-exercises',params:{ exercises:'exercises' } }">Ejercicios</NuxtLink>
        </li>
    </ul>
  </div>
  <main>
    <NuxtPage/>
  </main>
</Container>

</template>

<style scoped></style>
