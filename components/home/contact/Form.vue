<script lang="ts" setup>
import axios from 'axios';
import { reset } from '@formkit/core'

const Container     = defineAsyncComponent(() => import('@c/layout/Container.vue'));
const Message       = defineAsyncComponent(() => import('@c/home/contact/Message.vue'));
const Spiner        = defineAsyncComponent(() => import('@c/home/contact/Spiner.vue'));
const submited      = ref(false)
const showMessage   = ref(false)
let statusSubmited  = reactive({
    status:true,
    message:'Gracias, por tu mensaje!. Espero responderte lo más pronto posible'
})

async function handlerSubmit( input:any ) {
    submited.value  = true
    try {
        await axios.post('https://formeezy.com/api/v1/forms/63aa1a57b59e48000842fb54/submissions',{...input})

    } catch (error) {
        statusSubmited.status = false
        statusSubmited.message = 'Lo lamento, pero tu mensaje no se ha podido enviar, intenta mas tarde'
    }finally{
        showMessage.value = true
        submited.value  = false
        reset('contacto')
        removeMessage()
    }
}

function removeMessage(){
    setTimeout(()=>{
        showMessage.value = false
    },5000)
}

const event = (value: any) => {console.log(value)}
</script>
<template>
    <section class="py-8 lg:py-16 bg-light">

        <Container>
            <h2 class="h2 text-center text-dark">Contactame</h2>
            <FormKit type="form" :actions="false" #default="{ state: { valid } }" id="contacto"
                form-class="max-w-xs mx-auto md:max-w-md lg:max-w-lg" messages="text-sm text-gray-900" :on-input="event" @submit="handlerSubmit">

                <FormKit 
                    type="text" 
                    name="name" 
                    label="Nombre" 
                    validation="required"
                    :validation-messages="{ required: 'Este campo es requerido' }" 
                    id="name" outer-class="mb-6"
                    placeholder="Juan Perez" label-class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                    input-class="field"
                    :on-input="event"
                    message-class="validation-message"/>

                <FormKit 
                    type="email" 
                    name="email" 
                    label="Correo electrónico" 
                    validation="required|email"
                    :validation-messages="{ required: 'Este campo es requerido',email:'Ingrese un correo electrónico válido' }" 
                    id="name" placeholder="jperez@ejemplo.com"
                    outer-class="mb-6" label-class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                    input-class="field"
                    :on-input="event"
                    message-class="validation-message"/>

                <FormKit 
                    type="textarea" 
                    name="message" 
                    rows="5" label="Deja tu mensaje" 
                    validation="required"
                    :validation-messages="{ required: 'Este campo es requerido' }" 
                    id="message"
                    placeholder="Hola mucho gusto..." outer-class="mb-6"
                    label-class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                    input-class="field"
                    :on-input="event"
                    message-class="validation-message"/>

                <FormKit 
                    type="submit" 
                    :on-input="event"
                    input-class="text-light bg-dark btn"
                    v-if="valid"
                >
                    <Spiner v-if="submited"/> Enviar mensaje
                </FormKit>

            </FormKit>
            <Message v-if="showMessage" :="statusSubmited"/>
        </Container>
    </section>
</template>

