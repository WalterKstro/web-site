import { ContentfulClientApi, CreateClientParams, createClient } from "contentful"
import contentful from "contentful"

export default defineNuxtPlugin((nuxtApp) => {
    const runtimeConfig = useRuntimeConfig();

    const creatingClient = process.env.NODE_ENV === 'development' ? createClient : contentful.createClient
    
    const config:CreateClientParams = {
        space: runtimeConfig.public.spaceId,
        accessToken: runtimeConfig.public.token,
        environment:'master'
    }

    const contentful:ContentfulClientApi<any> = creatingClient(config)
    
    return {
        provide: {
            contentful
        }
    }
})
