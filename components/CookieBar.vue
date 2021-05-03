<template>
    <section
        v-if="!hasConsented"
        ref="cookieBar"
        id="cookie-notice"
        class="w-screen sm:w-1000 fixed z-50 bottom-0 flex bg-blue-100 text-sm
        sm:left-1/2 transform sm:-translate-x-1/2"
    >
        <div class="cookie-message py-4 px-6">
            <p class="sm:hidden" v-html="$i18n('templates.cookie-notification-mobile', { url })"></p>
            <p class="hidden sm:block" v-html="$i18n('templates.cookie-notification-desktop', { url })"></p>
        </div>
        <div class="flex border-l px-6 items-center border-gray-500">
            <button class="cookie-close flex items-center" @click="giveConsent">
                <span id="cookieCloseLabel" class="hidden sm:inline text-blue-700 underline">{{ $i18n('templates.close') }}</span>
                <img src="~/static/icons/close.svg" alt="Close" aria-hidden="true" aria-labelledby="cookieCloseLabel" width="26" height="26" class="max-w-none sm:ml-2">
            </button>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            hasConsented: true,
        }
    },

    mounted() {
        this.checkConsent();
    },

    methods: {
        checkConsent() {
            this.hasConsented = document.cookie.indexOf('parkos_consent') !== -1 || 
                (
                    document.querySelectorAll('input[name="inFrame"]').length > 0 && 
                    document.querySelectorAll('input[name="inFrame"]')[0].value === 'true'
                );
        },

        giveConsent() {
            this.hasConsented = true;
            document.cookie = this.cookieString;
        }
    },

    computed: {
        url() {
            return '#'
        },
        
        cookieString() {
            const expiryDate = new Date()
            expiryDate.setFullYear(expiryDate.getFullYear() + 1)
            let security = 'SameSite=lax'
            if (window.location.protocol === 'https') {
                security = 'SameSite=none; Secure'
            }
            return `parkos_consent= ${encodeURIComponent(new Date().toUTCString())}; expires=${expiryDate.toUTCString()}; path=/; ${security}`
        }
    }
}
</script>

<style scoped>
</style>