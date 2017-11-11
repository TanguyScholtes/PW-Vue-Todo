<template>
    <div id="app">
        <h1>todos</h1>

        <form
            method=""
            action=""
            @submit.prevent
        >
            <input
                type="checkbox"
                v-show="tasks.length"
                v-model="allChecker"
                @click="updateAllCompletions( $event )"
            >
            <input
                type="text"
                name="label"
                id="label"
                placeholder="What needs to be done ?"
                @keyup.enter="addTask( $event )"
            >

            <ul>
                <app-list-item
                    v-for="task in filtered"
                    :key="task.timestamp"
                    :task="task"
                    @eraseTask="eraseTask( task )"
                >
                </app-list-item>
            </ul>
        </form>

        <app-list-interface
            v-show="this.tasks.length"
            :items-left="itemsLeft"
            :is-completed="isCompleted"
            :display="display"
            @clearCompleted="clearCompleted"
            @updateDisplay="updateDisplay( $event )"
        >
        </app-list-interface>

        <footer>
            <p>Exercice based on <a href="http://todomvc.com/examples/vue/">Todo MVC Vue.js example</a>.<p>
            <p>Made by Tanguy Scholtés, 2017.</p>
        </footer>
    </div>
</template>

<script>
    import AppListItem from './AppListItem.vue';
    import AppListInterface from './AppListInterface.vue';

    export default {
        name: 'App',

        components: {
          AppListInterface,
          AppListItem
        },

        data () {
            return {
                tasks: [],
                display: 'all',
                allChecker: false
            }
        },

        computed: {
            filtered() {
                //Returns a filtered tasks list according to what the user wishes to display
                //Used in template to render the tasks list
                switch ( this.display ) {
                    case 'active':
                        //Display only incompleted/unchecked tasks
                        return this.tasks.filter( function ( task ) {
                            return task.completed == false;
                        } );
                        break;
                    case 'completed':
                        //Display only completed/checked tasks
                        return this.tasks.filter( function ( task ) {
                            return task.completed == true;
                        } );
                        break;
                    case 'all':
                    default:
                        //Display all tasks
                        return this.tasks;
                        break;
                }
            },

            itemsLeft () {
                //Returns the number of tasks incompleted/unchecked in the tasks list
                var left = [];
                this.tasks.forEach( function ( task ) {
                    if( task.completed == false ){
                        left.push( task );
                    }
                } );
                return left.length;
            },

            completedTasks () {
                //Returns a list of completed tasks
                return this.tasks.filter( function ( task ) {
                    return task.completed == true;
                } );
            },

            isCompleted () {
                //Returns true if there are any completed tasks, returns false otherwise
                if( this.completedTasks.length > 0 ) {
                    return true;
                } else {
                    return false;
                }
            }
        },

        created(){
            //Initialize tasks list with value from local storage if it exists, or with an empty array otherwise
            this.tasks = JSON.parse( localStorage.getItem( 'tasks' ) ) || [];
        },

        updated: function () {
            //Stock tasks list in local storage everytime the list is modified
            localStorage.setItem( 'tasks', JSON.stringify( this.tasks ) );
        },

        methods: {
            updateDisplay( view ) {
                //Updates "display" according to the view received as argument.
                //Used by the computed variable "filtered" to filter the tasks to display.
                this.display = view;
            },

            eraseTask ( task ) {
                //Removes the received task from the tasks list
                this.tasks.splice( this.tasks.indexOf( task ), 1 );
            },

            addTask( event ) {
                //Creates a new task with text given by the user and empties the text input
                let label = event.target.value;
                event.target.value = '';
                this.tasks.push( {
                    label: label,
                    completed: false,
                    displayLabel: false,
                    timestamp: Date.now().toString()
                } );
            },

            updateAllCompletions( event ) {
                //Check or uncheck all tasks according to the checkbox provided for that
                this.tasks.forEach( function ( task ) {
                    task.completed = event.target.checked;
                } );
            },

            clearCompleted() {
                //Removes all completed/checked tasks from the list
                //Then updates the allChecker variable to uncheck the box
                this.tasks = this.tasks.filter( function ( task ) {
                    return task.completed == false;
                } );
                this.allChecker = false;
            }
        }
    }
</script>

<style lang="scss">
    footer{
        text-align: center;
    }
</style>
