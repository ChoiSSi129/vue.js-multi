<template>
  <div id="app">
    <h2> nowTS : {{nowTS}}</h2>
    <Hello :callback="callback" />
  </div>
</template>

<script>
import Hello from "./components/Hello";

export default {
  name: "App",
  data : function() {
    return { nowTS : 0 }
  },
  components: {
    Hello
  },
  methods : {
    callback() {
      this.nowTS = new Date().getTime();
    }
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
