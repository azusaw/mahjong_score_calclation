<template>
  <v-app>
    <div>
      <v-content>
        <transition name="page"><router-view /></transition>
      </v-content>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "App",
  transition: "page",
};
</script>

<style>
a {
  text-decoration: none !important;
}
</style>
