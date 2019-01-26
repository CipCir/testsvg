<template>
  <div id="app">    
    <meselayout/>
  </div>
</template>

<script>
import meselayout from "./components/meselayout.vue";

export default {
  name: "app",
  components: {
    meselayout
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
