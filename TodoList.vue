<template>
    <div>
        <todo-list-form></todo-list-form>

        <transition-group name="list" tag="ul" mode="out-in">
            <li v-for="task in filteredTasks"
                :key="task.timestamp"
                class="list-item">
                <input type="checkbox"
                    v-model="task.completed">

                <label v-show="!task.displayLabel"
                    v-model="task.label"
                    :class="{ crossed: task.completed }"
                    @dblclick="task.displayLabel = true">
                    {{ task.label }}
                </label>

                <input type="text"
                    v-focus
                    v-show="task.displayLabel"
                    v-model="task.label"
                    :value="task.label"
                    @blur="task.displayLabel = false"
                    @keyup.enter="task.displayLabel = false">

                <span class="deleter"
                    @click="deleteTask( task )">
                    x
                </span>
            </li>
        </transition-group>
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

        directives: {
            focus: {
                // définition de la directive
                inserted: function ( el ) {
                    el.focus();
                }
            }
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
            }
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

    .list-item{
        transition: all .7s;
    }
    .list-move{
        transition: all 1s;
    }
    .list-enter-active, .list-leave-active{
        transition: opacity .7s;
    }
    .list-enter, .list-leave-to{
        opacity: 0;
        transform: translateY(30px);
    }
    .list-leave-active {
        position: absolute;
    }
</style>
