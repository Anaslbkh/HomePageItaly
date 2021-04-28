<template>
    <section id="cookie-notice">
        <div class="cookie-message">
            <p class="sm:hidden">{{ $i18n('templates.cookie-notification-mobile', { url }) }}</p>
            <p class="hidden sm:block">{{ $i18n('templates.cookie-notification-desktop', { url }) }}</p>
        </div>
        <button @click="accept" class="cookie-close">
            <span class="hidden sm:inline">Close</span>
        </button>
    </section>
</template>

<script>
export default {
    mounted() {

    },

    computed: {
        url() {
            return '#'
        }
    }
}
</script>