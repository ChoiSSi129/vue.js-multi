<template>
    <div>
        <button :class="$style.hand">CSS Module을 적용한 버튼</button>
    </div>
</template>

<script>
export default {

}
</script>

<style module>
    .hand {cursor:pointer;background:purple;color:yellow;}
</style>
