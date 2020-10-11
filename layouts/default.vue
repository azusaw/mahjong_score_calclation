<template>
<v-app>
  <div class="app">
    <!-- コンテンツ -->
    <v-content>
      <router-view/>
    </v-content>
  </div>
</v-app>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
  /* リンクの下線を消す用 */
  a {
    text-decoration: none !important;
  }
</style>
