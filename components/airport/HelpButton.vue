<template>
    <div
        :class="`help-btn${(['de', 'de-at'].includes($currentLanguage.lang) ? ' offset-right-desktop' : '')}`"
        style="opacity: 0;"
    >
        <div class="help-icon">
            <div class="svg-icon svg-xl svg-help"></div>
        </div>
        <div class="help-text font-roboto">
            {{ $i18n('general.help') }}
        </div>
    </div>
</template>
