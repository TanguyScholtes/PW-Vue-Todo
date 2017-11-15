export const mutations = {
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
}
