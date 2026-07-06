export default defineNuxtConfig({
  app: {
    head: {
      title: "PrintFlow 3D - Instant 3D Print Quote",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Get instant quotes for precision industrial-grade 3D printing. Upload STL, OBJ, or STEP files for real-time pricing.",
        },
        {
          name: "keywords",
          content:
            "3D printing, instant quote, STL, manufacturing, prototyping",
        },
        { property: "og:type", content: "website" },
        {
          property: "og:title",
          content: "PrintFlow 3D - Instant 3D Print Quote",
        },
        {
          property: "og:description",
          content: "Precision industrial-grade 3D printing services",
        },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "PrintFlow 3D - Instant 3D Print Quote",
        },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css",
          integrity:
            "sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN",
          crossorigin: "anonymous",
        },
      ],
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js",
          integrity:
            "sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL",
          crossorigin: "anonymous",
          defer: true,
        },
      ],
    },
  },

  css: ["~/assets/css/main.css"],

  nitro: {
    compressPublicAssets: true,
  },

  routeRules: {
    '/': { prerender: true, swr: 3600 },
    '/login': { ssr: true },
    '/profile': { ssr: false },
    '/checkout/**': { ssr: false },
    '/verify-email': { ssr: false },
    '/prints': { ssr: false },
    '/coming-soon': { prerender: true },
    '/marketplace': { prerender: true },
    '/materials': { prerender: true },
    '/services': { prerender: true },
    '/item-list/**': { prerender: true },
  },

  experimental: {
    typedPages: true,
    payloadExtraction: true,
  },

  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL || "http://localhost:4000/api",
      STRIPE_PUBLIC_KEY:
        process.env.NUXT_PUBLIC_STRIPE_KEY ||
        "pk_test_51T9YJzPJgrcpCqXnwmv5cYnvV4iLWF1gp2638L0Ooj3st6EpMPZAQSR6keEdXqd6Zmu9xz8ftv9GsWtgkbEWd6pu003On3d4wk",
    },
  },
  modules: ["@pinia/nuxt"],
});
