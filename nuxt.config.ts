// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', '@formkit/nuxt'],
  alias:{
    '@components':'/components'
  },
  runtimeConfig: {
    public:{
      tokenTypes:process.env.NUXT_TOKEN,
      token:process.env.NUXT_TOKEN,
      spaceId:process.env.NUXT_SPACE_ID,
      contentIdHomePage:process.env.NUXT_CONTENT_TYPE_ID_HOME_PAGE
    }
  }
})
