<template>
    <li>
        <input
            type="checkbox"
            v-model="task.completed"
        >
        <label
            v-show="!task.displayLabel"
            v-model="task.label"
            :class="{ crossed: task.completed }"
            @dblclick="task.displayLabel = true"
        >
            {{ task.label }}
        </label>
        <input
            type="text"
            v-show="task.displayLabel"
            v-model="task.label"
            :value="task.label"
            @blur="task.displayLabel = false"
            @keyup.enter="task.displayLabel = false"
        >
        <span
            class="deleter"
            @click="eraseTask( task )"
        >
            x
        </span>
    </li>
</template>

<script>
    export default {
        name: 'AppListItem',

        props: {
            task: {
                required: true,
                type: Object
            }
        },
        
        methods: {
            eraseTask ( task ) {
                //Emits the given task to be erased
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
