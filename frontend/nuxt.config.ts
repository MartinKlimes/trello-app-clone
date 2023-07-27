// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
  '@pinia/nuxt',
  '@nuxtjs/strapi',
  'nuxt-icon',
],
  // ssr: false,
  css: [
    '@/assets/css/main.css',
  ], 
  strapi: {
    url: 'https://trello-demo-7322d2287ed7.herokuapp.com'
  },
})