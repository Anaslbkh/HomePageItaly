<template>
    <div>
        <h2 class="text-3xl mb-10 font-heading">Customers rate our car parking providers with an average of 9.1</h2>
        <p class="text-base">Customers who have booked a parking space through us, rate these with an average of 9.1/10 based on 70 reviews.</p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    inject: [
        'reviews'
    ],
})
</script>