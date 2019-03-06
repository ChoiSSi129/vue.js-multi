<template>
  <div>
    <button @click="childClick">콜백호출</button>
  </div>
</template>

<script>
export default {
  name : "Hello",
  props : ["callback"],
  methods : {
    childClick : function() {
      console.log("## Child Click!!");
      this.callback();
    }
  }
}
</script>

<style>

</style>
