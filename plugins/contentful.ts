import { ContentfulClientApi, createClient } from "contentful"

export default defineNuxtPlugin((nuxtApp) => {

    const config = {
        space: '4y6o4nd3t09u',
        accessToken: 'YyTQsmyIZLcfxRLAcYqT6fc22VZnbWFxbCFBBHhBK8Q',
    }

    const contentful:ContentfulClientApi<undefined> = createClient(config)

    return {
        provide: {
            contentful
        }
    }
})
