<script lang="ts" setup>
const Container = defineAsyncComponent(() => import('@c/layout/Container.vue'));
const Button = defineAsyncComponent(() => import('@c/global/Button.vue'));
</script>
<template>
    <section class="py-8 lg:py-16 bg-light">

        <Container>
            <h2 class="h2 text-center text-dark">Contactame</h2>
            <form class=" max-w-xs mx-auto md:max-w-md lg:max-w-lg ">
                <div class="mb-6">
                    <label for="name" class="block mb-2 text-base font-medium text-gray-900 dark:text-white">Nombre</label>
                    <input type="text" id="name"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="Jhon Doe" required>
                </div>

                <div class="mb-6">
                    <label for="email" class="block mb-2 text-base font-medium text-gray-900 dark:text-white">Correo
                        electrónico</label>
                    <input type="email" id="email"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="jhon@ejemplo.com" required>
                </div>

                <div class="mb-6">
                    <label for="message" class="block mb-2 text-base font-medium text-gray-900 dark:text-white">Deja tu
                        mensaje</label>
                    <textarea id="message" rows="4"
                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Hola mucho gusto..."></textarea>
                </div>

                <Button path="profile" class="text-light bg-dark">Enviar mensaje</Button>
            </form>
        </Container>
    </section>
</template>

