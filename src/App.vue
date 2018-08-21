<template>
  <v-app>
    <div id="app">
      <router-view></router-view>
    </div>
  </v-app>
</template>

<script>
import Project from './components/Projects.vue';

export default {
  components: {
    projects: Project
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
h1 {
  color: blue;
}
</style>
