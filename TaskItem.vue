<template>
    <li>
        <input type="checkbox" v-model="task.completed">
        <label v-show="!task.displayLabel" @dblclick="task.displayLabel = true" v-model="task.label" v-bind:class="{ crossed: task.completed }">{{ task.label }}</label>
        <input v-show="task.displayLabel" @blur="task.displayLabel = false" @keyup.enter="task.displayLabel = false" v-model="task.label" type="text" :value="task.label">
        <span class="deleter" @click="eraseTask( task )">x</span>
    </li>
</template>

<script>
    export default {
        name: "TaskItem",
        props: {
            task: {
                required: true,
                type: Object
            }
        },
        methods: {
            eraseTask ( task ) {
                this.$emit( 'eraseTask', task );
            }
        }
    }
</script>

<style lang="scss" scoped>
    .deleter{
        font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
        color: #DD4A68;
        margin-left: 0.5em;
        font-weight: bold;
    }
    .crossed{
        text-decoration: line-through;
        color: lightgray;
    }
</style>
