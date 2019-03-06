<template>
    <div class="main test">
        {{message}}
        <Child11 />
        {{message}}
    </div>
</template>

<script>
import Child11 from "./child11";

export default {
    name: "Child1",
    data: function(){
        return{
            message: "child1"
        }
    },
    components: {Child11}
}
</script>

<style scoped>
.main {border:1px solid #000;background:yellow;}
.test {padding:10px;text-decoration:underline;border:1px solid #000;}
</style>
