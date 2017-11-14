<template>
    <div>
        <p>{{ itemsLeft }} items left to complete</p>
        <div>
            <button
                :class="{ active: display === 'all' }"
                @click="updateDisplay( 'all' )"
            >
                All
            </button> |
            <button
                :class="{ active: display === 'active' }"
                @click="updateDisplay( 'active' )"
            >
                Active
            </button> |
            <button
                :class="{ active: display === 'completed' }"
                @click="updateDisplay( 'completed' )"
            >
                Completed
            </button> |
            <button
                v-show="areTasksCompleted"
                @click="clearCompletedTasks"
            >
                Clear Completed
            </button>
        </div>
        <p>Double click on tasks to edit</p>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { mapMutations } from 'vuex';

    export default {
        name: 'TodoListInterface',

        computed: {
            ...mapGetters ( [
                'areTasksCompleted',
                'display',
                'itemsLeft'
            ] ),
        },

        methods:{
            ...mapMutations ( [
                'updateDisplay',
                'clearCompletedTasks'
            ] ),
        }
    }
</script>

<style lang="scss" scoped>
    .active{
        font-weight: bold;
    }
</style>
