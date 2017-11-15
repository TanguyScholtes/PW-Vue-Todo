export const getters = {
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
}
