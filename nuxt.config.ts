export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss"],
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  tailwindcss: {
    config: {
      theme: {
        extend: {
          fontFamily: {
            poppins: ["Poppins", "sans-serif"],
          },
        },
      },
    },
  },
});
