// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', '@formkit/nuxt'],
  alias:{
    '@c':'/components',
    '@a':'/assets'
  },
  runtimeConfig: {
    public:{
      token:process.env.NUXT_TOKEN,
      spaceId:process.env.NUXT_SPACE_ID,
      contentIdHomePage:process.env.NUXT_CT_ID_HOME_PAGE
    }
  },
  css: ['@/assets/css/input.css']
})
