<template>
  <v-app>
    <div>
      <v-content class="bg">
        <transition name="page">
          <router-view class="mx-auto text-center" style="max-width: 25rem" />
        </transition>
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
.bg {
  background-color: #ffdcb9;
  min-height: 100vh;
}
</style>
