<template>
    <div>
        <h2 class="text-3xl mb-10 font-heading">Customers rate our car parking providers with an average of {{ meta.reviews.score | score }}</h2>
        <p class="text-base">Customers who have booked a parking space through us, rate these with an average of {{ meta.reviews.score | score }}/{{ meta.reviews.best }} based on {{ meta.reviews.count }} reviews.</p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        meta: {
            type: Object,
            required: true,
        }
    },

    filters: {
        score: (value: number): string => value.toFixed(1),
    }
})
</script>