<template>
    <div id="app">
        <h1>todos</h1>

        <form method="" action="" v-on:submit.prevent>
            <input @click="updateAllCompletions( $event )" type="checkbox" v-show="items">
            <input name="label" id="label" type="text" placeholder="What needs to be done ?" v-on:keyup.enter="addTask( $event )">

            <ul>
                <task-item v-for="task in filter"
                    :task="task"
                    :key="task.timestamp"
                    @eraseTask="eraseTask( task )">
                </task-item>
            </ul>
        </form>

        <list-interface v-show="items"
            :itemsLeft="itemsLeft"
            :isCompleted="isCompleted"
            :display="display"
            @clearCompleted="clearCompleted"
            @updateDisplay="updateDisplay( $event )">
        </list-interface>

        <footer>
            <p>Exercice based on <a href="http://todomvc.com/examples/vue/">Todo MVC Vue.js example</a>.<p>
            <p>Made by Tanguy Scholtés, 2017.</p>
        </footer>
    </div>
</template>

<script>
    import TaskItem from './TaskItem.vue';
    import ListInterface from './ListInterface.vue';

    export default {
        name: 'App',
        data () {
            return {
                tasks: [],
                display: 'all'
            }
        },
        components: {
          ListInterface,
          TaskItem
        },
        methods: {
            updateDisplay( view ) {
                //Updates "display" according to the string received as argument.
                //Used by the computed variable "filter" to filter the tasks to display.
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
                this.tasks = this.tasks.filter( function ( task ) {
                    return task.completed == false;
                } );
            }
        },
        computed: {
            filter() {
                //Returns a filtered list according to what the user wishes to display
                switch ( this.display ) {
                    case 'active':
                        //Display only incompleted/unchecked tasks
                        return this.tasks.filter( function ( task ) {
                            return task.completed == false;
                        } );
                        [break;]
                    case 'completed':
                        //Display only completed/checked tasks
                        return this.tasks.filter( function ( task ) {
                            return task.completed == true;
                        } );
                        [break;]
                    case 'all':
                    default:
                        //Display all tasks
                        return this.tasks;
                        [break;]
                }
            },
            itemsLeft () {
                var left = [];
                this.tasks.forEach( function ( task ) {
                    if( task.completed == false ){
                        left.push( task );
                    }
                } );
                return left.length;
            },
            items () {
                if( this.tasks.length > 0 ){
                    return true;
                } else {
                    return false;
                }
            },
            isCompleted () {
                var t = this.tasks.filter( function ( task ) {
                    return task.completed == true;
                } );

                if( t.length > 0 ) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        created(){
            this.tasks = JSON.parse( localStorage.getItem( 'tasks' ) ) || [];
            console.log( this.tasks );
        },
        updated: function () {
            localStorage.setItem( 'tasks', JSON.stringify( this.tasks ) );
            console.log( this.tasks );
        }
    }
</script>

<style lang="scss" scoped>
    footer{
        text-align: center;
    }
</style>
