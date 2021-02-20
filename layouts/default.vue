<template>
  <v-app>
    <div class="app">
      <!-- Contents -->
      <v-content>
        <router-view />
      </v-content>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
a {
  text-decoration: none !important;
}
</style>
