<script lang="ts" setup>
const Container = defineAsyncComponent(() => import('@c/layout/Container.vue'));
const Button = defineAsyncComponent(() => import('@c/global/Button.vue'));
const submited = ref(false)
const status = ref(false)

const event = (value: any) => {
    console.log(value)
}
</script>
<template>
    <section class="py-8 lg:py-16 bg-light">

        <Container>
            <h2 class="h2 text-center text-dark">Contactame</h2>
            <FormKit type="form" :actions="false" #default="{ state: { valid } }" id="contacto"
                form-class="max-w-xs mx-auto md:max-w-md lg:max-w-lg" messages="text-sm text-gray-900" :on-input="event">

                <FormKit type="text" name="name" label="Nombre" validation="required"
                    :validation-messages="{ required: 'Este campo es requerido' }" 
                    id="name" outer-class="mb-6"
                    placeholder="Juan Perez" label-class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                    input-class="field"
                    :on-input="event"
                    message-class="validation-message"/>

                <FormKit type="email" name="email" label="Correo electrónico" validation="required|email"
                    :validation-messages="{ required: 'Este campo es requerido',email:'Ingrese un correo electrónico válido' }" 
                    id="name" placeholder="jperez@ejemplo.com"
                    outer-class="mb-6" label-class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                    input-class="field"
                    :on-input="event"
                    message-class="validation-message"/>

                <FormKit type="textarea" name="email" rows="5" label="Deja tu mensaje" validation="required"
                    :validation-messages="{ required: 'Este campo es requerido' }" 
                    id="message"
                    placeholder="Hola mucho gusto..." outer-class="mb-6"
                    label-class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                    input-class="field"
                    :on-input="event"
                    message-class="validation-message"/>

                <FormKit type="submit" :on-input="event">
                    <Button path="profile" class="text-light bg-dark">Enviar mensaje</Button>
                </FormKit>

            </FormKit>
        </Container>
    </section>
</template>

