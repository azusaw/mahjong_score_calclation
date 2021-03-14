import colors from "vuetify/es5/util/colors";
import {
  mdiCheckboxMarked,
  mdiCheckboxBlankOutline,
  mdiHelpCircleOutline,
} from "@mdi/js";

export default {
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: "ja",
    },
    titleTemplate: (title) =>
      title ? `${title} | 麻雀点数計算ツール` : "麻雀点数計算ツール",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#193E85" },
      {
        hid: "og:site_name",
        property: "og:site_name",
        content: "麻雀点数計算ツール",
      },
      { hid: "og:type", property: "og:type", content: "website" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      // {
      //   rel: "stylesheet",
      //   href: "https://fonts.googleapis.com/css?family=Noto+Sans+JP",
      // },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["~/assets/global.css"],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/vuetify"],
  /*
   ** Nuxt.js modules
   */
  modules: [],
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    defaultAssets: false,
    customVariables: ["~/assets/variables.scss"],
    treeShake: true,
    theme: {
      themes: {
        light: {
          primary: colors.amber.darken2,
        },
      },
    },
    icons: {
      values: {
        mdiHelpCircleOutline,
        mdiCheckboxMarked,
        mdiCheckboxBlankOutline,
      },
    },
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        path: "*",
        redirect: "/",
      });
    },
  },
  pageTransition: {
    name: "page",
    mode: "out-in",
  },
};
