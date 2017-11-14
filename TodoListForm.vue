<template>
    <form
        method=""
        action=""
        @submit.prevent
    >
        <input
            type="checkbox"
            v-show="tasks.length"
            :checked="!itemsLeft"
            @click="updateAllCompletions( $event )"
        >
        <input
            type="text"
            name="label"
            id="label"
            placeholder="What needs to be done ?"
            @keyup.enter="addTask( $event )"
        >
    </form>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { mapMutations } from 'vuex';

    export default {
        name: 'TodoListForm',

        computed: {
            ...mapGetters ( [
                'tasks',
                'itemsLeft'
            ] )
        },

        methods: {
            ...mapMutations ( [
                'updateAllCompletions',
            ] ),
            addTask ( event ) {
                //Creates a new task with text given by the user and empties the text input
                let label = event.target.value;
                event.target.value = '';
                this.$store.getters.tasks.push( {
                    label: label,
                    completed: false,
                    displayLabel: false,
                    timestamp: Date.now().toString()
                } );
            }
        }
    }
</script>

<style lang="scss">
</style>
