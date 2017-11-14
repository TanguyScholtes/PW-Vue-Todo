<template>
    <div id="app">
        <h1>Todo List</h1>

        <todo-list></todo-list>

        <todo-list-interface v-show="tasks.length"></todo-list-interface>

        <footer>
            <p>Exercice based on <a href="http://todomvc.com/examples/vue/">Todo MVC Vue.js example</a>.<p>
            <p>Made by Tanguy Scholtés, 2017.</p>
        </footer>
    </div>
</template>

<script>
    import TodoList from './TodoList.vue';
    import TodoListInterface from './TodoListInterface.vue';
    import { mapGetters } from 'vuex';

    export default {
        name: 'App',

        components: {
          TodoListInterface,
          TodoList
        },

        computed: {
            ...mapGetters ( [
                'tasks'
            ] ),
        },

        created(){
            //Initialize tasks list with value from local storage if it exists, or with an empty array otherwise
            this.$store.commit( 'getTasks' );
        },

        updated: function () {
            //Stock tasks list in local storage everytime the list is modified
            this.$store.commit( 'saveTasks' );
        }
    }
</script>

<style lang="scss">
    footer{
        text-align: center;
    }
</style>
