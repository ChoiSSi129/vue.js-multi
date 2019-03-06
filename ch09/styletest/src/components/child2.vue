<template>
    <div class="main">{{message}}</div>
</template>

<script>
export default {
    name: "Child2",
    data: function(){
        return{
            message: "child2"
        }
    }
}
</script>

<style>
.main {border:1px solid #000;background:aqua;}
</style>
