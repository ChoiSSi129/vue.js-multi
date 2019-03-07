<template>
    <div id="todolistapp">
        <div id="header" class="header">
            <h2>Todo List App</h2>
            <InputTodo />
        </div>
        <List />
    </div>  
</template>

<script>
import InputTodo from "./InputTodo";
import List from "./List";

export default {
    name:"todo-list",
    components: {
        InputTodo,
        List
    }
}
</script>

<style>
* {  box-sizing: border-box;  }
    .header {
        background-color: purple; padding: 30px 30px;
        color: yellow; text-align: center;
    }
    .header:after {
        content: ""; display: table; clear: both;
    }
</style>
