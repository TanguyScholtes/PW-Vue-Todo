<template>
    <div id="app">
        <h1>todos</h1>

        <form v-on:submit.prevent>
            <input @click="updateAllCompletions( $event )" type="checkbox" v-show="items">
            <input name="label" id="label" type="text" placeholder="What needs to be done ?" v-on:keyup.enter="addTask( $event )">

            <ul>
                <li v-for="( task, k ) in filter">
                    <input @click="updateCompletion( k, $event )" type="checkbox" :checked="task.completed">
                    <label v-show="!task.displayLabel" @dblclick="task.displayLabel = true" v-model="task.label" v-bind:class="{ crossed: task.completed }">{{ task.label }}</label>
                    <input v-show="task.displayLabel" @blur="task.displayLabel = false" @keyup.enter="task.displayLabel = false" v-model="task.label" type="text" :value="task.label">
                    <span class="deleter" @click="eraseTask( task )">x</span>
                </li>
            </ul>
        </form>

        <interface v-show="items" :itemsLeft="itemsLeft" :isCompleted="isCompleted" :display="display" @clearCompleted="clearCompleted" @updateDisplay="updateDisplay( $event )"></interface>

        <footer>
            <p>Exercice based on <a href="http://todomvc.com/examples/vue/">Todo MVC Vue.js example</a>.<p>
            <p>Made by Tanguy Scholtés, 2017.</p>
        </footer>
    </div>
</template>

<script>
    import Interface from './Interface.vue';

    export default {
        name: 'app',
        data () {
            return {
                tasks: [],
                display: 'all'
            }
        },
        components: {
          Interface
        },
        methods: {
            updateDisplay( view ) {
                this.display = view;
            },
            eraseTask ( task ) {
                var index = this.tasks.indexOf( task );
                this.tasks.splice( index, 1 );
            },
            addTask( event ) {
                var label = event.target.value;
                event.target.value = '';
                this.tasks.push( {
                    label: label,
                    completed: false,
                    displayLabel: false
                } );

            },
            updateCompletion( index, event ) {
                if( event.target.checked == true ){
                    this.tasks[ index ].completed = true;
                } else {
                    this.tasks[ index ].completed = false;
                }
            },
            updateAllCompletions( event ) {
                if( event.target.checked == true ){
                    this.tasks.forEach( function ( task ) {
                        task.completed = true;
                    } );
                } else {
                    this.tasks.forEach( function ( task ) {
                        task.completed = false;
                    } );
                }
            },
            clearCompleted() {
                this.tasks = this.tasks.filter( function ( task ) {
                    return task.completed == false;
                } );
            }
        },
        computed: {
            filter() {
                console.log( this.display )
                if( this.display === 'all' ) {
                    return this.tasks;
                }
                if( this.display === 'active' ) {
                    return this.tasks.filter( function ( task ) {
                        return task.completed == false;
                    } );
                }
                if( this.display === 'completed' ) {
                    return this.tasks.filter( function ( task ) {
                        return task.completed == true;
                    } );
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
    .crossed{
        text-decoration: line-through;
        color: lightgray;
    }
    .deleter{
        font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
        color: #DD4A68;
        margin-left: 0.5em;
        font-weight: bold;
    }
</style>
