<template>
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
    </form>
</template>

<script>
</script>

<style lang="scss">
</style>
