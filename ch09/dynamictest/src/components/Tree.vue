<template>
    <ul>
        <li v-for="item in subs" :class="item.type" :key="item.name">
            {{item.name}}
            <tree :subs="item.subs" />
        </li>
    </ul>
</template>

<script>
export default {
    name: "tree",
    props: ["subs"]
}
</script>

<style>

</style>
