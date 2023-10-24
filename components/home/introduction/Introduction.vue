<script lang="ts" setup>
const Button    = defineAsyncComponent(() => import('@c/global/Button.vue'));
const Container = defineAsyncComponent(() => import('@c/layout/Container.vue'))

interface Props {
    greeting: string;
    name: string;
    introduction: string;
    position: string;
}
defineProps<Props>()

</script>
<template>
    <section class="bg-dark">
        <Container>
            <div class="format py-8 lg:py-16 relative z-10 lg:static">
                <div class="mr-auto place-self-center lg:col-span-7 text-light">
                    <p class="lg:text-2xl lg:leading-tight m-0 font-semibold">{{ greeting }}</p>
                    <h1 class=" text-orange m-0 h1">
                        {{ name }}</h1>
                    <p class="m-0 lg:text-2xl lg:leading-tight font-semibold">{{ position }}</p>
                    <p class="mb-8 text-light lg:mb-8 p">{{ introduction }}</p>
                </div>
                <Button path="profile" class="text-dark bg-orange">Ver mi perfil</Button>
            </div>
        </Container>
    </section>
</template>

