import Vue from 'vue';
import Vuex from 'vuex';
Vue.use( Vuex );

export const store = new Vuex.Store ( {
    state: {
            tasks: [],
            display: 'all',
    },

    getters: {
        tasks ( state ) {
            return state.tasks;
        },

        display ( state ) {
            return state.display;
        },

        filteredTasks ( state ) {
            //Returns a filtered tasks list according to what the user wishes to display
            //Used in template to render the tasks list
            switch ( state.display ) {
                case 'active':
                    //Display only incompleted/unchecked tasks
                    return state.tasks.filter( function ( task ) {
                        return task.completed == false;
                    } );
                    break;
                case 'completed':
                    //Display only completed/checked tasks
                    return state.tasks.filter( function ( task ) {
                        return task.completed == true;
                    } );
                    break;
                case 'all':
                default:
                    //Display all tasks
                    return state.tasks;
                    break;
            }
        },

        areTasksCompleted ( state ) {
            //Returns true if there are any completed tasks, returns false otherwise
            let completedTasks = state.tasks.filter( function ( task ) {
                return task.completed == true;
            } );
            if( completedTasks.length > 0 ) {
                return true;
            } else {
                return false;
            }
        },

        itemsLeft ( state ) {
            //Returns the number of tasks incompleted/unchecked in the tasks list
            var left = [];
            state.tasks.forEach( function ( task ) {
                if( task.completed == false ){
                    left.push( task );
                }
            } );
            return left.length;
        },
    },

    mutations: {
        getTasks ( state ) {
            //Give tasks list value from local storage if it exists, or assign an empty array otherwise
             state.tasks = JSON.parse( localStorage.getItem( 'tasks' ) ) || [];
        },

        saveTasks ( state ) {
            //Stock tasks list in local storage
            localStorage.setItem( 'tasks', JSON.stringify( state.tasks ) );
        },

        clearCompletedTasks( state ) {
            //Removes all completed/checked tasks from the list
            state.tasks = state.tasks.filter( function ( task ) {
                return task.completed == false;
            } );
        },

        updateDisplay ( state, payload ) {
            //Change hash in URL to display the given view
            window.location.hash = payload;
            //Updates "display" according to the view received as argument.
            state.display = payload;
        },

        updateAllCompletions( state, event ) {
            //Check or uncheck all tasks according to the checkbox provided for that
            state.allChecker = event.target.checked;
            state.tasks.forEach( function ( task ) {
                task.completed = event.target.checked;
            } );
        },
    },
} )
