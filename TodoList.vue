<template>
    <div>
        <todo-list-form></todo-list-form>

        <ul>
            <li v-for="task in filteredTasks">
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
                    @click="deleteTask( task )"
                >
                    x
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
    import TodoListForm from './TodoListForm.vue';
    import { mapGetters } from 'vuex';
    import { mapMutations } from 'vuex';

    export default {
        name: 'TodoList',

        components: {
          TodoListForm
        },

        computed: {
            ...mapGetters ( [
                'filteredTasks'
            ] ),
        },

        methods: {
            deleteTask ( task ) {
                //Removes the received task from the tasks list
                this.$store.getters.tasks.splice( this.$store.getters.tasks.indexOf( task ), 1 );
            },
        }
    }
</script>

<style lang="scss">
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
