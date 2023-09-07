<script lang="ts" setup>
import { Asset } from 'contentful';

const Container = defineAsyncComponent(() => import('@c/layout/Container.vue'));
const Grid      = defineAsyncComponent(() => import('@c/layout/Grid.vue'));
const Button    = defineAsyncComponent(() => import('@c/global/Button.vue'));

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
                    <Button path="profile" class="text-dark bg-orange">Ver más detalles</Button>
                </div>
            </Grid>
        </Container>
    </section>
</template>


