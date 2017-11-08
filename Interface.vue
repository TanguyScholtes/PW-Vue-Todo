<template>
    <div>
        <p>{{ itemsLeft }} items left</p>
        <div>
            <button v-bind:class="{ active: display === 'all' }" @click="changeView( 'all' )">All</button> |
            <button v-bind:class="{ active: display === 'active' }" @click="changeView( 'active' )">Active</button> |
            <button v-bind:class="{ active: display === 'completed' }" @click="changeView( 'completed' )">Completed</button> |
            <button v-show="isCompleted" @click="clearCompleted">Clear Completed</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'interface',
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
                window.location.hash = view;
                this.$emit( 'updateDisplay', view );
            },
            clearCompleted(){
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
