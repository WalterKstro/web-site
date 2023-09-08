<script lang="ts" setup>
import { Asset } from 'contentful';
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

const Container = defineAsyncComponent(() => import('@c/layout/Container.vue'));
const Grid = defineAsyncComponent(() => import('@c/layout/Grid.vue'));
const Button = defineAsyncComponent(() => import('@c/global/Button.vue'));

interface Props {
    title: string
    introduction: string
    images: Asset[]
}

defineProps<Props>()


</script>
 
<template>
    <section>
        <Container>
            <Grid>
                <div class="format col-span-2 md:col-span-6 lg:col-span-4">
                    <h1 class="h2 text-dark">{{ title }}</h1>
                    <p class="p">{{ introduction }}</p>
                    <Button path="projects" class="text-dark bg-orange">Ver más detalles</Button>
                </div>
                <div class="col-start-1 col-span-2  md:col-span-6 lg:col-start-5 lg:col-span-8">
                    <Carousel :itemsToShow="1" :wrapAround="true" :transition="300" :autoplay="5000">
                        <Slide v-for="({ fields, sys }) in images" :key="sys.id">
                            <img :src="fields.file?.url" :alt="fields.title" class="h-auto max-w-full rounded-lg" />
                        </Slide>

                        <template #addons>
                            <navigation />
                            <pagination />
                        </template>
                    </Carousel>
                </div>
            </Grid>
        </Container>
    </section>
</template>


