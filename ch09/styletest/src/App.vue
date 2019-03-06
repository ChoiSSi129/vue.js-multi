<template>
  <div id="app">
    <h1>{{msg}}</h1>
    <Child1/>
    <Child2/>
    <Module1/>
  </div>
</template>

<script>
import Child1 from "./components/child1";
import Child2 from "./components/child2";
import Module1 from "./components/module1";

export default {
  name:"welcome",
  data: function(){
    return{
      msg: "welcome"
    }
  },
  components: {Child1, Child2, Module1}
}
</script>

<style>

</style>
