<script lang="ts" setup>
import { Entry } from 'contentful';
import { TypeHomeAportesFrontendSkeleton, TypeHomeAportesBackendSkeleton, TypeHomeAportesComplementosSkeleton } from 'contentful/content-types';


interface Props {
    title: string
    frontend: Entry<TypeHomeAportesFrontendSkeleton>;
    backend: Entry<TypeHomeAportesBackendSkeleton>;
    complemento: Entry<TypeHomeAportesComplementosSkeleton>;
}

const Container = defineAsyncComponent(() => import('@c/layout/Container.vue'));
const AutoGrid = defineAsyncComponent(() => import('@c/layout/AutoGrid.vue'));
const Card = defineAsyncComponent(() => import('@c/home/contributions/Card.vue'))

defineProps<Props>()
</script>

<template>
    <section class="bg-dark py-8 lg:py-16">
        <Container>
            <h2 class="h2 text-center text-light">{{ title }}</h2>
            <AutoGrid>
                <Card :area="frontend.fields.area" :aportes="frontend.fields.aportes">
                    <template #icon>
                        <svg xmlns="http://www.w3.org/2000/svg" class="inline-block text-dark" width="96" height="96"
                            viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                            stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z">
                            </path>
                            <path d="M4 9h8"></path>
                            <path d="M12 15h8"></path>
                            <path d="M12 4v16"></path>
                        </svg>
                    </template>
                </Card>

                <Card :area="backend.fields.area" :aportes="backend.fields.aportes">
                    <template #icon>
                        <svg xmlns="http://www.w3.org/2000/svg" class="inline-block" width="96" height="96"
                            viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                            stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M3 4m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z"></path>
                            <path d="M3 12m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z">
                            </path>
                            <path d="M7 8l0 .01"></path>
                            <path d="M7 16l0 .01"></path>
                        </svg>
                    </template>
                </Card>
                <Card :area="complemento.fields.area" :aportes="complemento.fields.aportes">
                    <template #icon>
                        <svg xmlns="http://www.w3.org/2000/svg" class="inline-block" width="96"
                            height="96" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                            stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path
                                d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1">
                            </path>
                        </svg>
                    </template>
                </Card>

            </AutoGrid>
        </Container>
</section></template>

