<script>

import { mapActions, mapState } from 'pinia';
import { useSneakerStore } from '@/stores/sneaker';

    export default {
        data() {
            return {
            message : 'Hello world',
            sneakers : []
            }
        },
        mounted () {
            this.fetchSneaker;
        },
        computed :{
            ...mapActions(useSneakerStore, ["fetchSneaker"]),
            ...mapState(useSneakerStore, ["getSneakers", "getStatus"])
        },

        methods :{
        }
    }
</script>

<template>
    <section>
        <h1>This is home page</h1>
        <section v-if="getStatus === 'done'">
            <article v-for="sneaker in getSneakers.data.data" :key="sneaker.id">
                <h2>{{ sneaker.id }}, {{ sneaker.attributes.name }}</h2>
                
                <img :src="sneaker.attributes.image.small" alt="Sneaker Image">
            </article>
        </section>

        <section v-else>Loading...</section>
    </section>
</template>

<style>

</style>