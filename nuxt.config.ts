// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', '@formkit/nuxt', '@nuxt/image'],
  alias: {
    '@c': '/components',
    '@a': '/assets'
  },
  runtimeConfig: {
    public: {
      token: process.env.NUXT_TOKEN,
      spaceId: process.env.NUXT_SPACE_ID,
      contentIdHomePage: process.env.NUXT_CT_ID_HOME_PAGE
    }
  },
  css: ['@/assets/css/input.css'],
  image: {
    contentful:{
      baseURL:'https://images.ctfassets.net'
    },
    screen: {
      'xs': 320,
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
      'xxl': 1536,
      '2xl': 1536
    },
  }
})
