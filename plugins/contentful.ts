import { ContentfulClientApi, CreateClientParams, createClient } from "contentful"
export default defineNuxtPlugin((nuxtApp) => {
    const runtimeConfig = useRuntimeConfig();

    const config:CreateClientParams = {
        space: runtimeConfig.public.spaceId,
        accessToken: runtimeConfig.public.token
    }

    const contentful:ContentfulClientApi<undefined> = createClient(config)

    return {
        provide: {
            contentful
        }
    }
})
