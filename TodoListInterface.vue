<template>
    <div>
        <p>{{ itemsLeft }} items left</p>
        <div>
            <button
                :class="{ active: display === 'all' }"
                @click="changeView( 'all' )"
            >
                All
            </button> |
            <button
                :class="{ active: display === 'active' }"
                @click="changeView( 'active' )"
            >
                Active
            </button> |
            <button
                :class="{ active: display === 'completed' }"
                @click="changeView( 'completed' )"
            >
                Completed
            </button> |
            <button
                v-show="isCompleted"
                @click="clearCompleted"
            >
                Clear Completed
            </button>
        </div>
        <p>Double click on tasks to edit</p>
    </div>
</template>

<script>
    export default {
        name: 'AppListInterface',

        props: {
            itemsLeft: {
                required: true,
                type: Number
            },

            isCompleted: {
                required: true,
                type: Boolean
            },

            display: {
                required: true,
                type: String
            }
        },
        
        methods:{
            changeView( view ) {
                //Change hash in URL to display the given view
                //Then emits that view to update the display variable and the displayed list
                window.location.hash = view;
                this.$emit( 'updateDisplay', view );
            },

            clearCompleted(){
                //Emits the trigger to clear all completed/checked tasks in the list
                this.$emit( 'clearCompleted' );
            }
        }
    }
</script>

<style lang="scss" scoped>
    .active{
        font-weight: bold;
    }
</style>
